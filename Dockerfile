FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install -g expo-cli && npm install

COPY . .

# Build the app for web (new CLI syntax)
RUN npx expo export --platform web

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
