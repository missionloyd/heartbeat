# Use node image as the base
FROM node:latest

# Set working directory
WORKDIR /usr/src/app

# Argument to determine mode (development or production)
ARG DEV_MODE

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --no-progress

# Copy application code
COPY . .

# Install nodemon globally if DEV_MODE is true
RUN if [ "$DEV_MODE" = "true" ]; then npm install -g nodemon; fi

# Start the application with nodemon if DEV_MODE is true, otherwise use npm start
CMD if [ "$DEV_MODE" = "true" ]; then nodemon index.js; else npm start; fi
