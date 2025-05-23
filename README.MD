# PostgreSQL TypeScript API

This repository contains a RESTful API built with Express.js and TypeScript, using PostgreSQL as the database. The project provides a simple yet robust backend service for managing posts.

## Repository Structure

The repository is organized as follows:

- **src/**: Source code directory
  - **config/**: Configuration files
    - **database.ts**: PostgreSQL database connection setup
  - **routes/**: API route definitions
    - **posts.ts**: Endpoints for post management
  - **utils/**: Utility functions
    - **handleError.ts**: Error handling utility
  - **server.ts**: Main application entry point

## Features

This PostgreSQL TypeScript API offers the following features:

- **RESTful API Endpoints**
  - Create, read, update, and delete posts
  - Error handling with appropriate HTTP status codes
  - JSON response format

- **Database Integration**
  - PostgreSQL connection using Vercel Postgres
  - Environment variable configuration for database connection

## API Endpoints

### Posts

- **GET /posts**: Retrieve all posts
- **GET /posts/:id**: Retrieve a specific post by ID
- **POST /posts**: Create a new post
- **PATCH /posts/:id**: Update a specific post
- **DELETE /posts/:id**: Delete a specific post

## Technical Implementation

The application is built using:
- **TypeScript** for type-safe code
- **Express.js** for the web server framework
- **@vercel/postgres** for database connectivity
- **dotenv** for environment variable management

## Requirements

- Node.js
- PostgreSQL database
- Environment variables:
  - `EXPRESS_HOST`: Host for the Express server
  - `EXPRESS_PORT`: Port for the Express server
  - `POSTGRES_URL_NO_SSL`: PostgreSQL connection string

## Getting Started

To use this API:

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in a `.env` file
4. Build the TypeScript code:
   ```bash
   npm run build
   ```
5. Start the server:
   ```bash
   npm start
   ```

## Development

For development purposes:

1. Install dev dependencies:
   ```bash
   npm install
   ```
2. Run in development mode with hot reloading:
   ```bash
   npm run dev
   ```

## API Usage Examples

### Creating a Post
```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"My First Post","description":"This is the content of my first post"}'
```

### Retrieving All Posts
```bash
curl -X GET http://localhost:3000/posts
```

### Updating a Post
```bash
curl -X PATCH http://localhost:3000/posts/1 \
  -H "Content-Type: application/json" \
  -d '{"type":"title","newValue":"Updated Post Title"}'
```

### Deleting a Post
```bash
curl -X DELETE http://localhost:3000/posts/1
```

---

*This project was created as part of the Progetto Code initiative.*

        