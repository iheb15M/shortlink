# ShortLink Backend

The backend of the ShortLink application is built with Node.js, TypeScript, and MongoDB

## Technology Stack

- <img src="https://cdn.simpleicons.org/nodedotjs" alt="Node.js" width="16" height="16"> **Node.js**
- <img src="https://cdn.simpleicons.org/typescript" alt="TypeScript" width="16" height="16"> **TypeScript**
- <img src="https://cdn.simpleicons.org/mongodb" alt="MongoDB" width="16" height="16"> **MongoDB**

## MongoDB Setup

You can run MongoDB using Docker Compose with the following steps:

1. Make sure Docker is installed on your machine.

2. Use the `docker-compose.yml` file included in main folder of the project to start the MongoDB container.

```bash
   docker compose up shortlink.db
```

This will start the MongoDB instance with the required credentials:

- **Username**: `root`
- **Password**: `azerty`
- **Database Name**: `shortlink`

Make sure MongoDB is set up and running before starting the backend

## Running the Project

To run the backend in development mode, follow these steps:

1. Install the dependencies by running:

```bash
npm install #or npm i
```

2. Start the backend server in development mode with:

```bash
npm run start:dev
```

The backend will be available and running on port 5000

## API Documentation

You can check the full API documentation for this project by visiting the following URL in your browser:

[http://localhost:5000/api-docs/](http://localhost:5000/api-docs/)

## Testing

To run unit tests, use:

```bash
npm run test:unit
```

To run e2e tests, use:

```bash
npm run test:e2e
```

To run both unit and e2e tests:

```bash
npm run test
```

## <br>

<div align="center">

### Connect with Me

[![LinkedIn](https://img.shields.io/badge/LinkedIn-iheb%20mejri-blue?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/iheb-mejri)
[![Website](https://img.shields.io/badge/Website-ihebmejri.com-blue?logo=google-chrome&logoColor=white)](https://www.ihebmejri.com/)
[![Behance](https://img.shields.io/badge/Behance-Mejri--iheb-blue?logo=behance&logoColor=white)](https://www.behance.net/Mejri-iheb)
[![Medium](https://img.shields.io/badge/Medium-@iheb--mejri-black?logo=medium&logoColor=white)](https://medium.com/@iheb-mejri)

</div>
