# ShortLink
<div align="center">

![ShortLink Logo](logo.webp)

</div>

## Overview

ShortLink is a web application that allows users to generate short URLs for their long links.

The app provides additional features such as password protection for private links and an info page to track the number of clicks and the link's visibility status (public or private)

## Features

1. **Short Link Generation**: Convert long URLs into short, easy-to-share links
2. **Private Links**: Protect your short links with a password for added security
3. **Link Analytics**: Use the info page to track the number of clicks

## Project Structure

The project is divided into two main folders:

- `short-link-backend`: Contains the backend code built with Node.js, TypeScript, and MongoDB.
- `short-link-frontend`: Contains the frontend code built with Vite, React, and TailwindCSS.

## Technology Stack

### Frontend
- <img src="https://cdn.simpleicons.org/vite" alt="Vite" width="16" height="16"> **Vite**
- <img src="https://cdn.simpleicons.org/react" alt="React" width="16" height="16"> **React**
- <img src="https://cdn.simpleicons.org/tailwindcss" alt="TailwindCSS" width="16" height="16"> **TailwindCSS**

### Backend
- <img src="https://cdn.simpleicons.org/nodedotjs" alt="Node.js" width="16" height="16"> **Node.js**
- <img src="https://cdn.simpleicons.org/typescript" alt="TypeScript" width="16" height="16"> **TypeScript**
- <img src="https://cdn.simpleicons.org/mongodb" alt="MongoDB" width="16" height="16"> **MongoDB**

## Running the Project

This project includes a `docker-compose.yml` file to easily run the entire project with Docker. Additionally, each folder has its own Dockerfile to run the backend and frontend separately.

### Docker Compose

To run the entire project (both frontend and backend) using Docker Compose, follow these steps:

1. Ensure Docker are installed on your machine.
2. Clone the repository:
   ```bash
   git clone https://github.com/iheb15M/shortlink
   cd shortlink
   ```
3. Run the following command:

   ```bash
   docker compose up --build
   ```
4. now the project is runing on http://localhost:8080/

## Running the Project in DevMode

### Requirements

- **Node.js**: Ensure that Node.js version >= 22 is installed on your machine. You can download it from [here](https://nodejs.org/)
- **Docker**: Make sure Docker is installed. You can download it from [here](https://www.docker.com/get-started)
- **MongoDB Compass** (optional): To inspect and interact with the MongoDB database, you can use MongoDB Compass. Download it from [here](https://www.mongodb.com/try/download/compass)

To run the project in devMode, follow these steps:
### 1. Run Database

First, start the MongoDB container using Docker Compose:
```bash
docker compose up shortlink.db
```
This will start the MongoDB container, which is required for the backend to function.

### 2. Run Backend
Navigate to the `short-link-backend` directory:

```bash
cd ./short-link-backend
```
Install the required dependencies:

```bash
npm install  # or npm i
```
Run the backend in development mode:

```bash
npm run start:dev
```

### 3. Run Frontend
Navigate to the `short-link-frontend` directory:

```bash
cd ./short-link-frontend
```

Install the required dependencies:

```bash
npm install  # or npm i
```

Run the frontend in development mode:

```bash
npm run dev
```
### Optional: Connect to MongoDB using MongoDB Compass

If you want to inspect the MongoDB database using MongoDB Compass, follow these steps:

1. Open MongoDB Compass.
2. In the connection string field, use the following URI to connect to your local MongoDB instance:
`mongodb://root:azerty@localhost:27017/shortlink?authSource=admin`
This connects to the MongoDB instance running in the Docker container.

3. Click **Connect** to access the database

<br>

---
<div align="center">

### Connect with Me

[![LinkedIn](https://img.shields.io/badge/LinkedIn-iheb%20mejri-blue?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/iheb-mejri)
[![Website](https://img.shields.io/badge/Website-ihebmejri.com-blue?logo=google-chrome&logoColor=white)](https://www.ihebmejri.com/)
[![Behance](https://img.shields.io/badge/Behance-Mejri--iheb-blue?logo=behance&logoColor=white)](https://www.behance.net/Mejri-iheb)
[![Medium](https://img.shields.io/badge/Medium-@iheb--mejri-black?logo=medium&logoColor=white)](https://medium.com/@iheb-mejri)

</div>