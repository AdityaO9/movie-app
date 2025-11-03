# Use Node.js base image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files first (for layer caching)
COPY package*.json ./

# Install dependencies
RUN npm install -g expo-cli && npm install

# Copy rest of the app
COPY . .

# Expose Expo’s web port (useful for web or API testing)
EXPOSE 8081

# Start the Expo development server (for web or API)
CMD ["npm", "start"]
