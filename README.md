# Hack(H)er413 Docker Workshop

This is a demo React application that can be used to demonstrate how to use Docker and Docker Compose.
The application was started from https://github.com/kriasoft/react-starter-kit.

## What you need
- This repository
- Docker 
- Docker: If you are using a MacOS: https://www.docker.com/products/docker-desktop
- Docker: If you are using Windows: https://github.com/docker/toolbox/releases/download/v19.03.1/DockerToolbox-19.03.1.exe


## Workshop
1. Clone the repository or download the code. We'll pretend we are working on
a task to dockerize the application to get it ready to deploy to a cloud environment.


2. This application uses MongoDB. To run it locally, we'll want to setup MongoDB.
An easy way to do this is by using Docker. It is fairly easy to find official Docker images
for well known software like MongoDB. Open up your command line or terminal and
enter the following:
```
docker pull mongo:latest
```
This will pull down the latest MongoDB docker image for you to use locally. You can see
more details about this image at https://hub.docker.com/_/mongo.


3. Once step 2 has completed, let's try running it!
```
docker run --name homeward-mongo –d mongo:latest
```
This command will run the docker image in detached mode in the background.
Next, let's execute some commands inside the container to observe how it is
an isolated container from the host OS:
```
docker exec -it homeward-mongo /bin/bash
```
Feel free to do an `ls` to see what's there! It's not your host.

Let's check out the mongo cli:
```
mongo
```
Once you get the prompt do:
```
show dbs
```
You should see the default mongo databases.

4. Let's go back to the app for a moment...Create a Dockerfile in the root directory of the project. The file will literally
be called "Dockerfile".


5. First, we will start by creating the build image:
```
FROM node:10 as build
WORKDIR /app-install

# Copy the repo to the image
COPY . .

# Install Node.js dependencies
RUN yarn install --no-progress

# Build the code - transpile with babel
RUN yarn run build --release

# Prune dev dependencies
RUN yarn install --production --ignore-scripts --prefer-offline
```
This is the first part of our image! Nice! Go ahead and build it:
```
docker build -t homeward-app .
```


6. Let's build the next part which will produce a production ready image.
This should go right under step 3 in "Dockerfile".
```
FROM node:10
WORKDIR /usr/src/app

# Copy artifacts from our build step image
COPY --from=build /app-install/build/ .
COPY --from=build /app-install/node_modules/ ./node_modules/

# Set permissions for "node" user
RUN chown -R node:node /usr/src/app
RUN chmod 755 /usr/src/app

# Run the container under "node" user by default
USER node

# Set NODE_ENV env variable to "production" for faster expressjs
ENV NODE_ENV production

# Start up the app
CMD [ "node", "server.js" ]
```
We've just written a mutli-stage build Dockerfile. (https://docs.docker.com/develop/develop-images/multistage-build/)


7. Now, let's finish the build! Run the same build command on the command line in the root directory of the project:
```
docker build -t homeward-app .
```
Docker has a built in cache, so as long as nothing has changed in the first few steps since the last time it was built
it should be much faster. It should only build the new steps we added. Each capital letter command counts as a caching 
layer.


8. Now that we have build our image, let's try to run it:
```
docker run -it homeward-app
```
You should see an error related to MongoDB connection.


9. Let's connect our two Docker containers together. Since we ran the mongo
image in detached mode, let's kill the image so we can reconfigure how it's running.
```
docker container rm --force homeward-mongo
```


10. We will now create a docker network:
```
docker network create homeward-network
```


11. Re-start the mongo image:
```
docker run --name homeward-mongo -d --net homeward-network mongo:latest
```


12. ...And let's also run the app image. We will expose port 3000 so that
we can access the application in our browsers. We will also pass in a value
for the app environment variable `DATABASE_URL` so the container knows how
to find MongoDB on the docker network. It is addressable by the value we set
for `--name`. In this case `homeward-mongo` will resolve to the IP of the 
MongoDB container.
```
docker run --name homeward-app -d --net homeward-network -p 3000:3000 -e "DATABASE_URL=mongodb://homeward-mongo:27017/homeward" homeward-app:latest
```


13. Let's check that the docker images are running successfully by opening
http://localhost:3000


14. There is a much easier way to orchestrate all of this with Docker Compose! Let's create the same two containers in a 
compose file. In the root directory of the project create the following file named "docker-compose.yaml":
```
version: "3.7"
services:
  mongo:
    image: mongo:latest
    ports:
      - 27017:27017
  homeward:
    image: homeward-app:latest
    ports:
      - 3000:3000
    depends_on:
      - mongo
    links:
      - mongo
    environment:
      DATABASE_URL: 'mongodb://mongo:27017/homeward'
```
Once saved, go to the command line and shutdown our other containers:
```
docker container rm --force homeward-mongo
docker container rm --force homeward-app
```
Now that the old containers are stopped, go to the root directory of the project (if you are not) and run:
```
docker-compose up -d
```
You should be able to access the site again at http://localhost:3000.
As you can see dock-compose does all the networking of these containers for us with this configuration file. Super nice. This
can be really helpful when developing apps locally, especially if it requires a lot of additional software like a database, cache system,
or queue service to run. It is also extremely helpful to debug or simulate how a docker image may run on a remote system.
