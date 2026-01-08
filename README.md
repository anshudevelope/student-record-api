# Student API

## Overview

Student API is a RESTful backend service built using Node.js, Express.js, MongoDB, Mongoose, and Joi Validator. It provides industry-standard CRUD operations for managing student records with strong request validation, clean architecture, and scalable design.

This API can be used in educational platforms, admin dashboards, learning management systems (LMS), and enterprise-level student management solutions.

---

## Tech Stack

* Node.js – JavaScript runtime
* Express.js – Backend web framework
* MongoDB – NoSQL database
* Mongoose – Object Data Modeling (ODM)
* Joi – Schema-based request validation
* Postman – API testing

---

## Project Structure

```
├── config
│   └── connectDB.js
├── controllers
│   └── studentController.js
├── models
│   └── studentModel.js
├── routes
│   └── studentRoutes.js
├── validators
│   └── studentValidator.js
├── middleware
│   └── validate.js
├── index.js
├── package.json
└── README.md
```

---

## Base URL

```
http://localhost:3000/api
```

---

## Student Data Model

| Field      | Type   | Required | Description                         |
| ---------- | ------ | -------- | ----------------------------------- |
| firstName  | String | Yes      | Student's first name                |
| lastName   | String | Yes      | Student's last name                 |
| email      | String | Yes      | Unique student email address        |
| phone      | String | Yes      | 10-digit Indian phone number        |
| DOB        | Date   | No       | Date of birth (must be in the past) |
| gender     | String | Yes      | Male, Female, or Other              |
| profilePic | String | No       | Profile image URL                   |

---

## Validation Rules (Joi)

* First name and last name must have a minimum of 2 characters
* Email must be in a valid format
* Phone number must be a valid Indian number (starts with 6–9)
* DOB must be a past date
* Gender must be Male, Female, or Other
* profilePic must be a valid URI if provided

---

## API Endpoints

### Create Student

**Endpoint**

```
POST /students/add
```

**Headers**

```
Content-Type: application/json
```

**Request Body**

```json
{
  "firstName": "Ansh",
  "lastName": "Sharma",
  "email": "ansh@gmail.com",
  "phone": "9876543210",
  "DOB": "2000-05-15",
  "gender": "Male",
  "profilePic": "https://example.com/profile.jpg"
}
```

**Success Response (201)**

```json
{
  "success": true,
  "data": {
    "_id": "<student_id>"
  },
  "message": "Student created successfully"
}
```

**Validation Error (400)**

```json
{
  "success": false,
  "errors": ["Invalid email address"]
}
```

---

### Get All Students

**Endpoint**

```
GET /students
```

**Success Response (200)**

```json
{
  "success": true,
  "size": 10,
  "data": []
}
```

---

### Get Student By ID

**Endpoint**

```
GET /students/:id
```

**Success Response (200)**

```json
{
  "success": true,
  "data": {}
}
```

**Not Found (404)**

```json
{
  "success": false,
  "message": "Student not found"
}
```

---

### Update Student

**Endpoint**

```
PUT /students/:id
```

**Request Body (Partial Update Allowed)**

```json
{
  "firstName": "Updated Name",
  "gender": "Other"
}
```

**Success Response (200)**

```json
{
  "success": true,
  "message": "Student updated successfully"
}
```

---

### Delete Student

**Endpoint**

```
DELETE /students/:id
```

**Success Response (200)**

```json
{
  "success": true,
  "message": "Student deleted successfully"
}
```

---

## Error Handling

* Joi handles request-level validation errors
* Proper HTTP status codes are returned
* Consistent JSON response format is used

---

## Best Practices Followed

* MVC-based folder structure
* Schema-level validation using Joi
* Clean and minimal controller logic
* Scalable and maintainable architecture

---

## Testing

* API tested using Postman
* Both success and failure scenarios validated
* Recommended to maintain Postman collections

---

## Future Enhancements

* Authentication and authorization using JWT
* Pagination, sorting, and filtering
* File upload support for profile pictures
* Swagger / OpenAPI documentation
* Centralized error handling middleware

---

## Author

Student API is developed following professional backend development and REST API design standards.
