#!/usr/bin/env bash
# Dev stack with a local throwaway MongoDB instead of Atlas.
# Seed fake spa bookings, the room catalogue, and site settings once it's up:
#   docker compose -f compose.yml -f compose.fakedb.yml exec backend npm run seed:spa
#   docker compose -f compose.yml -f compose.fakedb.yml exec backend npm run seed:rooms
#   docker compose -f compose.yml -f compose.fakedb.yml exec backend npm run seed:site-settings
set -e

docker compose -f compose.yml -f compose.fakedb.yml up --build --watch
