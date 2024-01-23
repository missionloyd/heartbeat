FROM node:latest

# Set working directory.
RUN mkdir /usr/src/app
WORKDIR /usr/src

# Install and cache dependencies.
ADD package.json /usr/src/package.json
ADD package-lock.json /usr/src/package-lock.json
RUN npm install --no-progress

CMD ["npm", "start"]