# Stage 1: Install Node.js dependencies
FROM node:20-alpine3.20 AS deps
WORKDIR /app
COPY server/package.json server/package-lock.json* ./
RUN npm ci --omit=dev 2>/dev/null || npm install --omit=dev

# Stage 2: Final image - pinned to same Alpine version as node stage
FROM nginx:1.27-alpine3.20

# Copy Node.js binary and libs from the same Alpine version used in build stage
COPY --from=deps /usr/local/bin/node /usr/local/bin/node
COPY --from=deps /usr/local/lib/libstdc++* /usr/local/lib/
COPY --from=deps /usr/lib/libstdc++* /usr/lib/
COPY --from=deps /usr/lib/libgcc_s* /usr/lib/

# Copy nginx config (full config, replaces default)
COPY nginx.conf /etc/nginx/nginx.conf

# Copy static files
COPY index.html style.css app.js /usr/share/nginx/html/

# Copy server code + dependencies
COPY server/ /app/
COPY --from=deps /app/node_modules /app/node_modules

# Copy entrypoint
COPY server/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

VOLUME /data
EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]
