# Use an official Node runtime as a base image
FROM node:18.17.0

# Set the working directory in the container
WORKDIR /src

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the remaining application files to the working directory
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port that the app will run on
EXPOSE 3000

# Specify the command to run on container start
CMD ["npm", "run","start"]