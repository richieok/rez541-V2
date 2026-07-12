#!/usr/bin/env bash
# Run the production builds locally (no AWS SSM, no Let's Encrypt).
# Frontend: http://localhost/  API: http://localhost/api/  Dashboard: http://localhost:8080
set -e

docker compose -f compose.local.yml up --build
