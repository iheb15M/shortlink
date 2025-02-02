# Use the official Node.js image as the base image
FROM node:22

# Set the working directory inside the container
WORKDIR .

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies (both regular and dev dependencies)
RUN npm install

# Copy the entire application source code to the working directory
COPY . .

# Build the TypeScript files
RUN npm run build

# Expose the port the app will run on
EXPOSE 5000

# Command to run the app in production mode
CMD ["npm", "start"]
