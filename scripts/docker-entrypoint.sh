#!/bin/sh
set -e

echo "running prisma migrations..."
npx prisma migrate deploy

echo "starting zenith server..."
exec node dist/main.js