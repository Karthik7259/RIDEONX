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

### User Login
- **URL:** `/user/login`
- **Method:** `POST`
- **Body Parameters:**
  - `email` (string, required)
  - `password` (string, required)

### Example Request
```bash
curl -X POST http://localhost:3000/user/login \
-H "Content-Type: application/json" \
-d '{
  "email": "example@example.com",
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

### User Profile
- **URL:** `/user/profile`
- **Method:** `GET`
- **Headers:**
  - `Authorization: Bearer <jwt_token>`

### Example Request
```bash
curl -X GET http://localhost:3000/user/profile \
-H "Authorization: Bearer <jwt_token>"
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
  }
}
```

### User Logout
- **URL:** `/user/logout`
- **Method:** `GET`
- **Headers:**
  - `Authorization: Bearer <jwt_token>`

### Example Request
```bash
curl -X GET http://localhost:3000/user/logout \
-H "Authorization: Bearer <jwt_token>"
```

### Example Response
```json
{
  "message": "Logged out"
}
```

### RideBoss Registration
- **URL:** `/rideboss/register`
- **Method:** `POST`
- **Body Parameters:**
  - `email` (string, required)
  - `fullname.firstname` (string, required, min: 3) // First name must be at least 3 characters long
  - `fullname.lastname` (string, optional)
  - `password` (string, required, min: 6) // Password must be at least 6 characters long
  - `vechicle.color` (string, required, min: 3) // Color must be at least 3 characters long
  - `vechicle.plate` (string, required, min: 3) // Plate must be at least 3 characters long
  - `vechicle.capacity` (number, required, min: 1) // Capacity must be at least 1
  - `vechicle.vechicleType` (string, required, enum: ['car', 'motorcycle', 'auto']) // Please enter a valid vechicle type

### Example Request
```bash
curl -X POST http://localhost:3000/rideboss/register \
-H "Content-Type: application/json" \
-d '{
  "email": "jane.doe@example.com",
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "password": "securePassword123",
  "vechicle": {
    "color": "Red",
    "plate": "XYZ123",
    "capacity": 4,
    "vechicleType": "Sedan"
  }
}'
```

### Example Response
```json
{
  "rideboss": {
    "_id": "60c72b2f9b1d4c3a4c8e4b8b",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "vechicle": {
      "color": "Red",
      "plate": "XYZ123",
      "capacity": 4,
      "vechicleType": "Sedan"
    }
  },
  "token": "<jwt_token>"
}
```

### RideBoss Login
- **URL:** `/rideboss/login`
- **Method:** `POST`
- **Body Parameters:**
  - `email` (string, required)
  - `password` (string, required, min: 6) // Password must be at least 6 characters long

### Example Request
```bash
curl -X POST http://localhost:3000/rideboss/login \
-H "Content-Type: application/json" \
-d '{
  "email": "jane.doe@example.com",
  "password": "securePassword123"
}'
```

### Example Response
```json
{
  "rideboss": {
    "_id": "60c72b2f9b1d4c3a4c8e4b8b",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com"
  },
  "token": "<jwt_token>"
}
```

### RideBoss Profile
- **URL:** `/rideboss/profile`
- **Method:** `GET`
- **Headers:**
  - `Authorization: Bearer <jwt_token>`

### Example Request
```bash
curl -X GET http://localhost:3000/rideboss/profile \
-H "Authorization: Bearer <jwt_token>"
```

### Example Response
```json
{
  "rideboss": {
    "_id": "60c72b2f9b1d4c3a4c8e4b8b",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "vechicle": {
      "color": "Red",
      "plate": "XYZ123",
      "capacity": 4,
      "vechicleType": "Sedan"
    }
  }
}
```

### RideBoss Logout
- **URL:** `/rideboss/logout`
- **Method:** `GET`
- **Headers:**
  - `Authorization: Bearer <jwt_token>`

### Example Request
```bash
curl -X GET http://localhost:3000/rideboss/logout \
-H "Authorization: Bearer <jwt_token>"
```

### Example Response
```json
{
  "message": "Logged out successfully"
}
```