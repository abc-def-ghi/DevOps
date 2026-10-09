# Developing a Simple Containerized Application Using Docker

## Build the Docker Image

### Step 5: Open a terminal

Navigate to the project directory:

```bash
cd student-docker-app
```

Build the Docker image:

```bash
docker build -t student-docker-app .
```

Verify that the image was created:

```bash
docker images
```

## Run the Container

### Step 6: Start the application

```bash
docker run -d --name student-api -p 3000:3000 student-docker-app
```

Check whether the container is running:

```bash
docker ps
```

## Test the Application

### Step 7: Open the API

Open the following URLs in a browser:

**Home endpoint:**

```text
http://localhost:3000/
```

Expected output:

```text
Student Management API is running!
```

**Student endpoint:**

```text
http://localhost:3000/students
```

Expected output:

```json
[
  {
    "id": 1,
    "name": "Rahul",
    "course": "CSE"
  },
  {
    "id": 2,
    "name": "Priya",
    "course": "ECE"
  }
]
```

You can also test the endpoints using these commands:

```bash
curl http://localhost:3000/
curl http://localhost:3000/students
```

## 8. Manage the Container

### View application logs

```bash
docker logs student-api
```

### Stop the container

```bash
docker stop student-api
```

### Start the stopped container

```bash
docker start student-api
```

### Remove the container

```bash
docker stop student-api
docker rm student-api
```

The Docker image remains available even after the container is removed.

## 9. Update the Application

If you modify `server.js`, rebuild the image:

```bash
docker build -t student-docker-app .
```

Remove the existing container and create a new one:

```bash
docker rm -f student-api
docker run -d --name student-api -p 3000:3000 student-docker-app
```

The new container will use the updated image.
