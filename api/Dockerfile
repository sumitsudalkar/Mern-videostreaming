# Use official Node.js image
FROM node:18

# Create and set the working directory
WORKDIR /app

# Install ffmpeg
RUN apt-get update && apt-get install -y ffmpeg


# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port and start the application
EXPOSE 5000
CMD ["node", "app.js"]
