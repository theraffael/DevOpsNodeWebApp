# docker build -t mosazhaw/node-web-app .

FROM node:22.15.0

# Create app directory
WORKDIR /usr/src/app

# Copy package files first to utilize Docker cache effectively
COPY package*.json ./

# Install all dependencies from package.json
RUN npm install

# Copy the rest of the app files
COPY . .

# Expose the port your app runs on
EXPOSE 3001:3000

# Run your application
CMD ["node", "server.js"]