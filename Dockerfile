# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app will run on (default is 3000)
EXPOSE ${PORT:-3000}

# Define environment variable for default port
ENV PORT=${PORT:-3000}

# Command to run the app
CMD ["node", "index.js"]
