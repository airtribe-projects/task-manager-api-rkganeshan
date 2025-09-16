# Task Manager API

A RESTful API for managing tasks with features like priority levels, filtering, and sorting. Built with Express.js and uses a JSON file for data persistence.

## Features

- CRUD operations for tasks
- Priority levels (low, medium, high)
- Filter tasks by completion status
- Sort tasks by creation date
- Filter tasks by priority level
- JSON file-based persistence

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm run dev
   ```
   The server will start on port 3000 by default.

## API Endpoints

### Get Tasks

- **GET `/api/tasks`**

  - Returns all tasks
  - Query Parameters:
    - `completed`: Filter by completion status (`true` or `false`)
    - `sortBy`: Sort by field (currently supports `date`)
    - `order`: Sort order (`asc` or `desc`)

  ```bash
  # Examples
  curl http://localhost:3000/api/tasks
  curl http://localhost:3000/api/tasks?completed=true
  curl http://localhost:3000/api/tasks?sortBy=date&order=desc
  curl http://localhost:3000/api/tasks?completed=false&sortBy=date&order=desc
  ```

- **GET `/api/tasks/:id`**

  - Returns a specific task by ID

  ```bash
  curl http://localhost:3000/api/tasks/1
  ```

- **GET `/api/tasks/priority/:level`**
  - Returns tasks by priority level (`low`, `medium`, `high`)
  ```bash
  curl http://localhost:3000/api/tasks/priority/high
  ```

### Create Task

- **POST `/api/tasks`**
  - Creates a new task
  - Required fields: `title`, `description`, `completed`
  - Optional field: `priority` (defaults to "low") (allowed "low", "medium", "high" )
  ```bash
  curl -X POST http://localhost:3000/api/tasks \
    -H "Content-Type: application/json" \
    -d '{
      "title": "New Task",
      "description": "Task description",
      "completed": false,
      "priority": "high"
    }'
  ```

### Update Task

- **PUT `/api/tasks/:id`**
  - Updates an existing task
  - All fields are optional
  ```bash
  curl -X PUT http://localhost:3000/api/tasks/1 \
    -H "Content-Type: application/json" \
    -d '{
      "completed": true
    }'
  ```

### Delete Task

- **DELETE `/api/tasks/:id`**
  - Deletes a task by ID
  ```bash
  curl -X DELETE http://localhost:3000/api/tasks/1
  ```

## Data Structure

Tasks have the following structure:

```json
{
  "id": 1,
  "title": "Task Title",
  "description": "Task Description",
  "completed": false,
  "priority": "low",
  "createdAt": "2025-01-01T10:00:00.000Z"
}
```

## Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `201` - Resource created
- `400` - Bad request (invalid input)
- `404` - Resource not found
- `500` - Server error

Error responses include a message explaining the error:

```json
{
  "message": "Error message here"
}
```

## Testing the API

You can test the API using:

1. cURL commands (examples provided above)
2. Postman or similar API testing tools
3. Any HTTP client library in your application

Make sure to set the `Content-Type: application/json` header when sending POST or PUT requests.
