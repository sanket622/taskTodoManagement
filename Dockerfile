# Use a Node.js base image (matching your system's version)
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the application port (match your server.js config)
EXPOSE 8080

# Start the application
CMD ["node", "server.js"]
