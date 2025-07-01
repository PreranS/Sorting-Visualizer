# Use official Node image as base
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the client using webpack
RUN npm run build

# Expose app port
EXPOSE 3000

# Start the backend server (which serves the built client)
CMD ["npm", "start"]
