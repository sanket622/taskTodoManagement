# taskTodoManagement

# Project Setup and API Testing Guide

## Prerequisites
- Install Node.js and npm
- Install MongoDB and Redis
- Configure environment variables in a `.env` file:

```
MONGO_URL=your_mongodb_connection_string
PORT=your_port
JWT_SECRET=your_secret_key
```

## Installation
1. Clone the repository:
   ```sh
   git clone your-repo-url
   cd your-project-folder
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   npm start
   ```

## Security and Rate Limiting

- **The project uses security best practices by implementing the following packages:**

1. dotenv: To manage environment variables.

2. helmet: To secure HTTP headers.

3. express-rate-limit: To prevent excessive API requests.

- **These dependencies are imported as follows:**

```sh
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
```

## API Endpoints and Testing in Postman

### Authentication

#### Register a User
- **Endpoint:** `POST /api/auth/register`
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "User"  // write Admin instead of User to register as Admin
  }
  ```
- **Response:**
  ```json
  {
    "_id": "userId",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "token": "jwt_token"
  }
  ```

#### Login User
- **Endpoint:** `POST /api/auth/login`
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:** Similar to register.


### Tasks

#### Create Task
- **Endpoint:** `POST /api/tasks`
- **Headers:**
  ```
  Authorization: Bearer <jwt_token>
  ```
- **Request Body:**
 ```json
{
    "title": "Implement Authentication",
    "description": "Set up my JWT authentication for user login and registration.",
    "status": "Pending",
    "dueDate": "2024-03-15",
    "assignedTo": "67cad0369739b329369bbcf7", 
    "createdBy": "67cad0259739b329369bbcf4"
  }
  ```
- **Response:** Task details.

#### Get Tasks
- **Endpoint:** `GET /api/tasks`
- **Headers:** Same as above.

#### Update Task
- **Endpoint:** `PUT /api/tasks/:id`
- **Headers:** Same as above.
- **Request Body:**
```json
 {
    "title": "Implement Authentication",
    "description": "Set up my JWT authentication for user login and registration.",
    "status": "Pending",
    "dueDate": "2024-03-15",
    "assignedTo": "67cad0369739b329369bbcf7", 
    "createdBy": "67cad0369739b329369bbcf7"
  }
  ```
- **Response:** Task details.

#### Delete Task
- **Endpoint:** `DELETE /api/tasks/:id`
- **Headers:** Same as above.

- **Response:** Task deleted.


#### Assign Task (After assigning a task by Admin , Users will get a notificatio)
- **Endpoint:** `POST /api/tasks/assign/:taskId`
- **Headers:** Same as above.
- **Request Body:**
  ```json
  {
    "userId": "user_id"
  }
  ```

### Notifications

#### Get Notifications
- **Endpoint:** `GET /api/notifications`
- **Headers:**
  ```
  Authorization: Bearer <jwt_token>
  ```
- **Response:** List of notifications.

#### Mark Notification as Read
- **Endpoint:** `PUT /api/notifications/:id/read`  
- **Headers:** Same as above.

- **Response** message

 ```json
  {
  "message": "Notification marked as read"
}
  ```

### Logs (logs for Complete Information about ongoing tasks)

#### Get Logs
- **Endpoint:** `GET /api/logs`
- **Headers:** Same as above.
- **Response:** List of logs.

## Authorization Middleware
- **Protect Routes:** Attach `Authorization: Bearer <jwt_token>` to requests.
- **Role-Based Access:** Some routes are restricted to certain roles.

## Redis Caching
- Notifications are cached for 5 minutes using Redis.
- Redis must be running for caching to work.

---

Test each API endpoint using Postman by setting the appropriate request method, headers, and body data as outlined above.


You can run this project using either Docker or Node.js.

- **Using Docker**: Run `docker-compose up -d --build` to start the application on `localhost:8080`. This method eliminates the need to manually start the server.
- **Using Node.js**: Alternatively, you can start the server manually by running `node server.js`.

The API can be accessed and tested using Postman.

## Running the Project

Once the dependencies are installed, you can start the project using either of the following methods:

- **Docker**: Run `docker-compose up -d --build` to start the application on `localhost:8080`.
- **Node.js**: Run `node server.js` to start the server manually.

You can then use Postman to test the API.


- I initialized the project using Docker by running the command docker-compose up -d --build, which started the application on localhost:8080. Instead of manually starting the server with node server.js, I used Docker to manage the containerized environment. The API was then accessed and tested via Postman.We can run the project using either local commands with Docker or by starting the server manually with Node.js.


# Implemented CI/CD pipeline using Github Action to Deploy Project to AWS EC2 i.e automatic Test Build and Deploy to AWS EC2 after every changes commit and merged

- **AWS EC2 Deployed Link** = http://3.110.163.172/api/home/ 

-**API Base Route** = http://localhost:8080/