# Stage 1: Build client
FROM node:18-alpine as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build && cp /app/index.html /app/client/public/index.html

# Stage 2: Run server
FROM node:18-alpine
WORKDIR /app
COPY server ./server
COPY package*.json ./
RUN npm install
COPY --from=build /app/client/public ./client/build
WORKDIR /app/server
EXPOSE 3000
CMD ["node", "index.js"]
