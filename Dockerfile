# --- Stage 1: Build the Expo web app ---
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install -g expo-cli && npm install

# Copy the rest of the project
COPY . .

# Build Expo web app (generates files in web-build/)
RUN npx expo export:web

# --- Stage 2: Serve the app using Nginx ---
FROM nginx:alpine

# Copy the built files from Stage 1
COPY --from=builder /app/web-build /usr/share/nginx/html

# Expose port 80 for web traffic
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
