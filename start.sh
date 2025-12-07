#!/bin/sh
# Start script for Render.com deployment
# Ensures Next.js binds to 0.0.0.0 and uses Render's PORT

if [ -z "$PORT" ]; then
  PORT=10000
fi

echo "Starting Next.js on 0.0.0.0:$PORT"
exec next start -H 0.0.0.0 -p $PORT
