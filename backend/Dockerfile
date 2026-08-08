FROM oven/bun:1-alpine

# Set the working directory
WORKDIR /app
# Copy package.json and bun.lock
COPY package.json bun.lock ./
COPY . ./

RUN bun install --frozen-lockfile
