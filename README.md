# Snitch — Auth & Product CRUD API

A small e-commerce backend with JWT authentication (access + refresh tokens), Product CRUD APIs secured with `express-validator`, and a React frontend to consume them.

**Live app:** https://crud-app-cohort-assignment.vercel.app
**Live API:** https://crud-app-cohort-assignment.onrender.com/api

> Backend runs on Render's free tier and sleeps after 15 minutes of inactivity. The first request after a while may take 30–50 seconds to respond while the server wakes up.

---

## Tech Stack

**Backend:** Node.js, Express, MongoDB (Mongoose), JWT, bcryptjs, express-validator, cookie-parser
**Frontend:** React (Vite), React Router, Tailwind CSS, Axios

---

## Project Structure

```
CRUD-APP/
├── client/     → React frontend (module-based: auth, product, shared)
└── server/     → Express backend (MVC: models, controllers, routes, validators, middlewares)
```

---

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd CRUD-APP
```

### 2. Backend setup
```bash
cd server
npm install
```

Create a `.env` file inside `server/`:
```env
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
NODE_ENV=development
```

Run the server:
```bash
npm start
```
Server runs on `http://localhost:3000`.

### 3. Frontend setup
```bash
cd client
npm install
npm run dev
```
Client runs on `http://localhost:5173`. API calls are proxied to `http://localhost:3000` in development (see `vite.config.js`).

---

## API Endpoints

### Authentication — `/api/auth`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Create a new user account |
| POST | `/api/auth/login` | Public | Authenticate user, issue access + refresh tokens |
| POST | `/api/auth/refresh-token` | Public (requires valid refresh token cookie) | Issue a new access token |
| POST | `/api/auth/logout` | Authenticated | Invalidate the refresh token |
| GET | `/api/auth/me` | Authenticated | Return the logged-in user's profile |

**Register — body**
```json
{ "name": "Jane Doe", "email": "jane@example.com", "password": "Secret@123", "confirmPassword": "Secret@123" }
```

**Login — body**
```json
{ "email": "jane@example.com", "password": "Secret@123" }
```

### Products — `/api/products`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/products` | Authenticated | Create a new product |
| GET | `/api/products` | Public | List all products |
| GET | `/api/products/:id` | Public | Get a single product by ID |
| PUT | `/api/products/:id` | Authenticated | Update a product |
| DELETE | `/api/products/:id` | Authenticated | Delete a product |

**Create / Update — body**
```json
{
  "productName": "Classic Jeans",
  "productImage": ["https://example.com/img1.jpg", "https://example.com/img2.jpg"],
  "productPrice": 1000,
  "productStock": 50
}
```
> `PUT` accepts partial bodies — only send the fields you want to change.

**Authenticated routes** require a Bearer access token:
```
Authorization: Bearer <accessToken>
```

---

## Auth Flow Summary

1. **Register** → creates user, returns user data only (no tokens).
2. **Login** → verifies credentials, returns an access token (body) and sets a refresh token as an `httpOnly` cookie.
3. **Protected requests** attach the access token via the `Authorization` header.
4. **On 401** (expired access token) → client calls `/api/auth/refresh-token`; a new access token is issued and the refresh token is rotated.
5. **Logout** → refresh token is revoked in the database and its cookie is cleared.

---

## Security Notes

- Passwords are hashed with bcrypt (12 salt rounds) — never stored or returned in plain text.
- Refresh tokens are stored server-side against the user, so they can be revoked on logout.
- Refresh token cookie is `httpOnly`, `secure` in production, and `sameSite: lax`.
- All request bodies/params are validated with `express-validator`; invalid input returns field-level 400 errors.
