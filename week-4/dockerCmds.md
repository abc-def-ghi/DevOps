# Docker Commands for Container Management

Docker runs applications inside containers. A Docker image is a
template, while a container is an instance created from an image.

## 1. Check Docker installation

### `docker --version`

Displays the installed Docker version.

``` bash
docker --version
```

### `docker info`

Displays details about the Docker installation and engine.

``` bash
docker info
```

### `docker help`

Lists Docker commands and help.

``` bash
docker help
docker container --help
```

## 2. Download and manage images

### `docker pull IMAGE`

Downloads an image from a registry such as Docker Hub.

``` bash
docker pull nginx
docker pull node:22
```

### `docker images`

Lists images stored locally.

``` bash
docker images
```

### `docker image inspect IMAGE`

Displays detailed information about an image.

``` bash
docker image inspect nginx
```

### `docker rmi IMAGE`

Removes a local image that is not being used by a container.

``` bash
docker rmi nginx
```

## 3. Create and run containers

### `docker run IMAGE`

Creates and starts a container from an image.

``` bash
docker run nginx
```

This runs Nginx in the foreground, so logs appear in the terminal. Press
`Ctrl+C` to stop it.

### `docker run -d IMAGE`

Runs a container in detached mode, meaning it runs in the background.

``` bash
docker run -d nginx
```

Docker prints the container ID.

### `docker run --name NAME IMAGE`

Assigns a readable name to a container.

``` bash
docker run -d --name web-server nginx
```

### `docker run -p HOST_PORT:CONTAINER_PORT IMAGE`

Maps a port on your computer to a port inside the container.

``` bash
docker run -d --name web-server -p 8080:80 nginx
```

Open `http://localhost:8080` in a browser to access Nginx. Port `8080`
on your computer forwards to port `80` inside the container.

### `docker run --rm IMAGE`

Automatically removes the container when it exits.

``` bash
docker run --rm nginx
```

### `docker run -it IMAGE COMMAND`

Runs a container interactively with a terminal.

``` bash
docker run -it ubuntu bash
```

Inside the Ubuntu shell, try:

``` bash
cat /etc/os-release
exit
```

The `-i` flag keeps input open, and `-t` allocates a terminal.

## 4. List and inspect containers

### `docker ps`

Lists currently running containers.

``` bash
docker ps
```

### `docker ps -a`

Lists all containers, including stopped ones.

``` bash
docker ps -a
```

### `docker container ls`

Another way to list running containers.

``` bash
docker container ls
```

### `docker inspect CONTAINER`

Displays detailed configuration and runtime information about a
container.

``` bash
docker inspect web-server
```

### `docker port CONTAINER`

Displays the port mappings for a container.

``` bash
docker port web-server
```

### `docker stats`

Shows live CPU, memory, network, and disk I/O usage for running
containers.

``` bash
docker stats
```

Press `Ctrl+C` to stop the live display.

### `docker top CONTAINER`

Lists processes running inside a container.

``` bash
docker top web-server
```

## 5. Stop, start, and restart containers

### `docker stop CONTAINER`

Gracefully stops a running container.

``` bash
docker stop web-server
```

### `docker start CONTAINER`

Starts an existing stopped container.

``` bash
docker start web-server
```

### `docker restart CONTAINER`

Restarts a container.

``` bash
docker restart web-server
```

### `docker kill CONTAINER`

Immediately sends a kill signal to a container's main process.

``` bash
docker kill web-server
```

Prefer `docker stop` for normal shutdowns; use `docker kill` when a
faster stop is needed.

### `docker pause CONTAINER`

Suspends processes in a running container.

``` bash
docker pause web-server
```

### `docker unpause CONTAINER`

Resumes a paused container.

``` bash
docker unpause web-server
```

## 6. View container logs

### `docker logs CONTAINER`

Displays logs produced by a container.

``` bash
docker logs web-server
```

## 7. Execute commands inside a running container

### `docker exec CONTAINER COMMAND`

Runs a command inside an already running container.

``` bash
docker exec web-server nginx -v
```

### `docker exec -it CONTAINER sh`

Opens an interactive shell inside a running container.

``` bash
docker exec -it web-server sh
```

Type `exit` to leave the shell.

Some images have `bash`; minimal images may provide only `sh`.

### `docker attach CONTAINER`

Attaches your terminal to the container's main process.

``` bash
docker attach web-server
```

Use `docker exec` when you want a separate shell without attaching to
the main process. Be careful with `docker attach`, because keyboard
input or signals may affect the main process.

## 8. Remove containers

### `docker rm CONTAINER`

Removes a stopped container.

``` bash
docker stop web-server
docker rm web-server
```

## 9. Copy files between host and container

### `docker cp HOST_PATH CONTAINER:PATH`

Copies a file or directory from your computer into a container.

``` bash
docker cp ./config.json web-server:/tmp/config.json
```

### `docker cp CONTAINER:PATH HOST_PATH`

Copies a file from a container to your computer.

``` bash
docker cp web-server:/etc/nginx/nginx.conf ./nginx.conf
```

## 10. Manage volumes for persistent data

A **volume** stores data separately from a container's writable layer.
Volumes help preserve data when containers are removed or recreated.

### `docker volume ls`

Lists volumes.

``` bash
docker volume ls
```

### `docker volume create NAME`

Creates a named volume.

``` bash
docker volume create app-data
```

### `docker volume inspect NAME`

Displays information about a volume.

``` bash
docker volume inspect app-data
```

### `docker run -v VOLUME:PATH IMAGE`

Mounts a volume inside a container.

``` bash
docker run -d --name db-container -v app-data:/data busybox sleep 3600
```

This example mounts the named volume at `/data` inside the container.

### `docker volume rm NAME`

Removes a volume that is not in use.

``` bash
docker volume rm app-data
```

## 11. Manage networks

Docker networks allow containers to communicate with one another.

### `docker network ls`

Lists Docker networks.

``` bash
docker network ls
```

### `docker network create NAME`

Creates a user-defined network.

``` bash
docker network create app-network
```

### `docker network inspect NAME`

Displays information about a network and connected containers.

``` bash
docker network inspect app-network
```

### `docker network connect NETWORK CONTAINER`

Connects an existing container to a network.

``` bash
docker network connect app-network web-server
```

### `docker network disconnect NETWORK CONTAINER`

Disconnects a container from a network.

``` bash
docker network disconnect app-network web-server
```

### `docker network rm NAME`

Removes a network if no containers are connected to it.

``` bash
docker network rm app-network
```

## 12. Build your own image

A `Dockerfile` describes how to build an image.

Example `Dockerfile` for a simple Node.js app:

``` dockerfile
FROM node:22
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

Add a `.dockerignore` file so local dependencies and secrets are not
copied into the build context:

``` text
node_modules
.git
.env
```

### `docker build -t NAME .`

Builds an image using the `Dockerfile` in the current directory and tags
it with a name.

``` bash
docker build -t student-backend .
```

### `docker login`

Authenticates with a container registry.

``` bash
docker login
```

### `docker push IMAGE`

Uploads an image to a registry, assuming the image is correctly tagged
and you have permission.

``` bash
docker push USERNAME/student-backend:1.0
```

## 13. Run a Node.js backend in Docker

Suppose your Express app listens on port `3000` and starts with
`node server.js`.

1.  Put the `Dockerfile` shown above in the project root.
2.  Build the image:

``` bash
docker build -t student-backend .
```

3.  Run the container and map host port `3000` to container port `3000`:

``` bash
docker run -d --name student-api -p 3000:3000 student-backend
```

4.  Check the container:

``` bash
docker ps
docker logs student-api
```

5.  Test the backend at `http://localhost:3000` or call one of its API
    endpoints.

6.  Stop and remove the container when finished:

``` bash
docker stop student-api
docker rm student-api
```

The Express server must listen on `0.0.0.0` inside the container to
accept connections through the published port. For example:

``` javascript
app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});
```

If the app uses a database, the database must also be reachable from the
container, often through a Docker network or Docker Compose.

## 14. Docker Compose basics

Docker Compose manages applications made up of multiple services, such
as an API and a database, using a YAML file.

Common commands:

### `docker compose up`

Creates and starts services defined in `compose.yaml` or
`docker-compose.yml`.

``` bash
docker compose up
```

### `docker compose up -d`

Starts services in the background.

``` bash
docker compose up -d
```

### `docker compose ps`

Lists services and their container status.

``` bash
docker compose ps
```

### `docker compose logs`

Displays logs from the services.

``` bash
docker compose logs
docker compose logs -f
```

### `docker compose stop`

Stops services without removing their containers.

``` bash
docker compose stop
```

### `docker compose start`

Starts previously created stopped services.

``` bash
docker compose start
```

### `docker compose down`

Stops and removes the containers and networks created by Compose. Named
volumes are normally retained unless you specify `-v`.

``` bash
docker compose down
```

### `docker compose down -v`

Also removes Compose-managed named volumes. This can delete persistent
database data, so use it carefully.

``` bash
docker compose down -v
```
