# Use a lightweight Node.js image as base
FROM node:18-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml to the container
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN npm i -g pnpm serve
RUN pnpm install

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN pnpm build

EXPOSE 5000

CMD ["serve", "-s", "-l", "5000", "dist"]