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


# Expose the port that the app will run on
EXPOSE 4300

# Specify the command to run on container start
CMD ["npm", "run","production"]