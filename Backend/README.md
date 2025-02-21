# Backend

## Description
This is the backend service for the application. It handles user registration, authentication, and other related functionalities.

## Setup

### Prerequisites
- Node.js
- MongoDB

### Installation
1. Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2. Navigate to the backend directory:
    ```bash
    cd /d:/DriveX/Backend
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

### Environment Variables
Create a `.env` file in the backend directory and add the following environment variables:
```
JWT_SECRET=<your_jwt_secret>
MONGO_URI=<your_mongodb_uri>
```

### Running the Application
Start the development server:
```bash
npm start
```

The server will be running on `http://localhost:3000`.

## API Endpoints

### User Registration
- **URL:** `/user/register`
- **Method:** `POST`
- **Body Parameters:**
  - `email` (string, required)
  - `fullname.firstname` (string, required)
  - `fullname.lastname` (string, optional)
  - `password` (string, required)

### Example Request
```bash
curl -X POST http://localhost:3000/user/register \
-H "Content-Type: application/json" \
-d '{
  "email": "example@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "password": "password123"
}'
```

### Example Response
```json
{
  "user": {
    "_id": "60c72b2f9b1d4c3a4c8e4b8b",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "example@example.com"
  },
  "token": "<jwt_token>"
}
```
