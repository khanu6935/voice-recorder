# Use an official Node.js runtime as a parent image
FROM node:16.14.0


# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the frontend files to the container
COPY . .

RUN npm run build

EXPOSE 4000

CMD ["npm", "run", "start"]
