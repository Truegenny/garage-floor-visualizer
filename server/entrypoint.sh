#!/bin/sh

# Start Node API server in background and capture PID
node /app/server.js &
NODE_PID=$!

# If either process exits, stop the other and exit the container
trap 'kill $NODE_PID 2>/dev/null; exit 1' TERM INT

# Start nginx in foreground
nginx -g 'daemon off;' &
NGINX_PID=$!

# Wait for either process to exit — if one dies, kill the other
wait -n $NODE_PID $NGINX_PID 2>/dev/null || true
EXIT_CODE=$?

kill $NODE_PID $NGINX_PID 2>/dev/null
exit $EXIT_CODE
