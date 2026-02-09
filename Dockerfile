# Stage 1: Install Node.js dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY server/package.json server/package-lock.json* ./
RUN npm ci --omit=dev 2>/dev/null || npm install --omit=dev

# Stage 2: Final image
FROM nginx:alpine
RUN apk add --no-cache nodejs

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

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
