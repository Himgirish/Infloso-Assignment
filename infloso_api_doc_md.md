Here is the API documentation for the provided Postman collection in Markdown format:

```markdown\
# Infloso API Documentation

This documentation provides an overview of the APIs available in the Infloso project, along with details about each endpoint, including the HTTP method, required parameters, and descriptions of what each API does.

---

## Get All Registered Users

**Endpoint:** `GET /users`

**Description:**\
This API retrieves a list of all registered users.

**Headers:**\
- `Authorization`: Bearer token (required)

**Parameters:**\
- None

**Response:**\
- A JSON array containing the details of all registered users.

**Example Request:**\
```http\
GET http://localhost:4000/users\
Authorization: Bearer <your_token_here>\
```

---

## Signup

**Endpoint:** `POST /signup`

**Description:**\
This API allows a new user to register by providing a username, email, and password.

**Headers:**\
- None

**Body Parameters:**\
- `username` (string, required): The username for the new user.\
- `email` (string, required): The email address for the new user.\
- `password` (string, required): The password for the new user.

**Response:**\
- A JSON object containing the details of the newly registered user.

**Example Request:**\
```http\
POST http://localhost:4000/signup\
Content-Type: application/json

{\
    "username": "himgirish_5",\
    "email": "pyranies+2@gmail.com",\
    "password": "test123"\
}\
```

---

## Login

**Endpoint:** `POST /login`

**Description:**\
This API authenticates a user by verifying their email and password and returns a JWT token.

**Headers:**\
- None

**Body Parameters:**\
- `email` (string, required): The email address of the user.\
- `password` (string, required): The password of the user.

**Response:**\
- A JSON object containing the JWT token and user information.

**Example Request:**\
```http\
POST http://localhost:4000/login\
Content-Type: application/json

{\
    "email": "pyranies@gmail.com",\
    "password": "test123"\
}\
```

---

## Logout

**Endpoint:** `POST /logout`

**Description:**\
This API invalidates the current refresh token, effectively logging the user out.

**Headers:**\
- None

**Body Parameters:**\
- `refresh_token` (string, required): The refresh token that needs to be invalidated.

**Response:**\
- A JSON object confirming the logout action.

**Example Request:**\
```http\
POST http://localhost:4000/logout\
Content-Type: application/json

{\
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmM4YWNkMTcwNDljZDMyNjBlNTYyNzciLCJpYXQiOjE3MjQ0Mzk5MTN9.3Y9sCl7qbnnKLnZOPYVbFov5WCEMw3dKrVfz_FAGITI"\
}\
```

---

## Renew Access Token

**Endpoint:** `POST /renew_access_token`

**Description:**\
This API generates a new access token using a valid refresh token.

**Headers:**\
- None

**Body Parameters:**\
- `refresh_token` (string, required): The refresh token used to generate a new access token.

**Response:**\
- A JSON object containing the new access token.

**Example Request:**\
```http\
POST http://localhost:4000/renew_access_token\
Content-Type: application/json

{\
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmM4YWNkMTcwNDljZDMyNjBlNTYyNzciLCJpYXQiOjE3MjQ0Mzk5MTN9.3Y9sCl7qbnnKLnZOPYVbFov5WCEMw3dKrVfz_FAGITI"\
}\
```

---

**Note:** Replace `http://localhost:4000` with the appropriate base URL if your API is hosted on a different server or port.
