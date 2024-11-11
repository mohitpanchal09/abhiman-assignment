Here's your updated README with the new endpoints and information about `Socket.io` events for real-time updates.

---

# Polling Backend System

This project is a Node.js application that uses Prisma, PostgreSQL, Kafka, and Zookeeper for managing data and event streaming. The application is containerized using Docker for easy setup and deployment.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Accessing Adminer](#accessing-adminer)
- [Accessing Kafka](#accessing-kafka)
- [API Endpoints](#api-endpoints)
- [Socket.io Events](#socketio-events)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Make sure you have the following installed on your machine:

- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) (v14 or above)
- [NPM](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

## Installation

### 1. Clone the Repository

```bash
git clone git@github.com:mohitpanchal09/abhiman-assignment.git
cd abhiman-assignment
```

### 2. Install Dependencies

After cloning the repository, install the necessary dependencies:

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root of the project directory, and add the following variables:

```bash
DATABASE_URL="postgresql://abhiman:abhiman@localhost:5432/abhiman"
PORT=3000
```

### 4. Docker Setup

Ensure you have Docker running on your system, as we will use Docker for setting up PostgreSQL, Kafka, and Zookeeper.

### 5. Start Docker Services

Use Docker Compose to start all services (PostgreSQL, Adminer, Kafka, and Zookeeper):

```bash
docker-compose up -d
```

This will start the following services:

- **PostgreSQL**: The relational database.
- **Adminer**: A web-based database management tool.
- **Zookeeper**: Manages Kafka brokers.
- **Kafka**: For event streaming.

### 6. Prisma Setup

Run Prisma to set up the database schema.

1. **Deploy migrations**:

```bash
npx prisma migrate deploy
```

2. **Generate Prisma client**:

```bash
npx prisma generate
```

### 7. Start the Application

After setting up the database and Kafka, you can run the Node.js application:

```bash
npm start
```

## Database Setup

### Accessing Adminer (Database Management)

Adminer is a lightweight tool to manage your PostgreSQL database. After running the Docker containers, Adminer will be available at:

```bash
http://localhost:8080
```

- **Server**: `db`
- **Username**: `abhiman`
- **Password**: `abhiman`
- **Database**: `abhiman`

## Kafka Setup

Ensure that Kafka is running correctly. The Kafka service is available at:

```bash
PLAINTEXT://localhost:9092
```

You can use tools like [Kafka UI](https://github.com/provectus/kafka-ui) or the `kafka-console-producer.sh` and `kafka-console-consumer.sh` scripts to interact with Kafka topics.

## Running the Application

After starting the services, you can use the following command to run the application in development mode:


```bash
npm start
```

## Accessing Prisma Studio

You can access Prisma Studio, a database GUI for Prisma, using the following command:

```bash
npx prisma studio
```

## API Endpoints

You can test the following API endpoints using Postman:

1. **Create User**
   - **Endpoint**: `POST /api/create-user`
   - **Request Body**:
     ```json
     {
       "username": "rahul"
     }
     ```
   - **Description**: Create a new user.

2. **Create Poll**
   - **Endpoint**: `POST /api/polls`
   - **Request Body**:
     ```json
     {
       "title": "What is capital of India?",
       "options": ["delhi", "kolkata", "mumbai", "goa"],
       "userId": 2
     }
     ```
   - **Description**: Create a new poll with a title, options, and a user ID.

3. **Get Poll**
   - **Endpoint**: `GET /api/polls/:id`
   - **Description**: Retrieve details of a poll by ID.

4. **Vote**
   - **Endpoint**: `POST /api/polls/:pollId/vote`
   - **Request Body**:
     ```json
     {
       "userId": 2,
       "optionId": 6
     }
     ```
   - **Description**: Submit a vote for a poll option.

5. **Leaderboard**
   - **Endpoint**: `GET /api/leaderboard`
   - **Description**: Retrieve the leaderboard showing the vote count for each option in a poll.

   You can test the above endpoints using Postman and see how the data is managed in real time.

## Socket.io Events

This backend uses **Socket.io** for real-time updates. The following events are emitted when specific actions occur:

1. **poll-created**
   - Emitted when a new poll is created. This event will broadcast the newly created poll to connected clients.

2. **leaderboard-update**
   - Emitted when the leaderboard for a poll is updated. This helps clients see the latest results in real time.

3. **new-vote**
   - Emitted when a new vote is cast for a poll option. This event will notify connected clients of the updated vote count.

These events allow for real-time data updates, providing an interactive experience for the users. You can listen to these events in your frontend application using **Socket.io** to get live updates.

---

Let me know if you need any further adjustments!
