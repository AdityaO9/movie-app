# ---------- STAGE 1: build ----------
FROM node:18-alpine AS build

WORKDIR /app

# Copy only package files first for layer caching
COPY package*.json ./

# Install production dependencies and clean cache
RUN npm ci --only=production && npm cache clean --force

# Copy the rest of the project
COPY . .

# Build Expo/React app
RUN npm run build
# ---------- STAGE 2: runtime ----------
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
