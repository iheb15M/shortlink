# Use a Node.js base image
FROM node:22 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vite application
RUN npm run build

# Use a lightweight Nginx image to serve the static files
FROM nginx:alpine AS production

# Copy the built files from the builder stage to the Nginx directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the default Nginx port
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]