# Use the official Node.js 14 image as base
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install mysql2 --save \
  && npm install dotenv --save \
  && npm install sequelize --save \
  && npm install express --save \
  && npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000 to the outside world
EXPOSE $PORT

# Command to run the application
CMD ["npm", "run", "start"]
