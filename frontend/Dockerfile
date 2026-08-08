FROM oven/bun:1-alpine AS build
# Set the working directory
WORKDIR /app
# Copy package.json and bun.lock
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

FROM oven/bun:1-alpine AS production
# Copy the built files from the build stage
WORKDIR /app
COPY --from=build /app/build ./build
COPY --from=build /app/package.json /app/bun.lock ./
RUN bun install --production --frozen-lockfile
COPY ./static ./static
# COPY ./other-static-assets ./other-static-assets
# EXPOSE 3000
CMD ["bun", "build/index.js"]
