# CampusMatch Backend

Complete CommonJS backend for the CampusMatch React application.

## Setup

1. Put this `server` folder inside your CampusMatch project.
2. Open terminal in `server`.
3. Run `npm install`.
4. Copy `.env.example` to `.env`.
5. Set your MongoDB URI and JWT secret.
6. Run `npm run dev`.

Expected:
- MongoDB connected successfully
- Server running on http://localhost:5000

## Endpoints

POST /api/auth/register
POST /api/auth/login
GET /api/auth/me

POST /api/profile
GET /api/profile
DELETE /api/profile

GET /api/colleges
GET /api/colleges/:id

GET /api/recommendations

Protected endpoints require:
Authorization: Bearer <token>

## Note

`data/colleges.js` contains sample college data. Replace it with your verified production dataset before publishing the app.
