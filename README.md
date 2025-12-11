# Users API (with Admin auth)

This service provides a simple admin-authenticated `/users` API intended for QA exercises. Data is in-memory and resets on restart. Some intentional defects remain in the users handlers for candidates to discover.

## Setup
```bash
npm install
npm start   # defaults to port 5000 or PORT env
```

## Auth flow
1) Create an admin (name/username/password).
2) Authenticate to receive a Bearer token.
3) Call `/users` with the token.

## Endpoints
### Admin management
- `POST /admin` — body: `{ "name": "...", "username": "...", "password": "..." }` → creates admin.
- `GET /admin` — list admins (passwords omitted).
- `GET /admin/:id`, `PATCH /admin/:id`, `DELETE /admin/:id`.

### Authentication (exposed separately from admin)
- `GET /authenticate?user=<username>&password=<password>` → `{ "token": "Bearer <jwt>" }`

### Users (requires Bearer token)
- `GET /users` — lists users created by the authenticated admin.
- `POST /users` — body: `{ "name": "...", "dob": "DD/MM/YYYY", "role": "MANAGER|WORKER|SECURITY", "active": true|false }`
- `GET /users/:id`
- `PATCH /users/:id` — update `role`/`active`
- `DELETE /users/:id`

## Quick curl examples
Create admin:
```bash
curl -X POST http://localhost:5000/admin \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice Admin","username":"alice","password":"secret"}'
```

Authenticate:
```bash
curl "http://localhost:5000/authenticate?user=alice&password=secret"
```
Use the returned `Bearer <token>` in `Authorization` for `/users`.

Create user (replace TOKEN):
```bash
curl -X POST http://localhost:5000/users \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"name":"Bob","dob":"01/01/1990","role":"WORKER","active":true}'
```

## Notes for QA candidates
- Users are scoped per admin (`createdBy`); admins can only see/change their own users.
- Data is not persisted.
- Intentional defects exist in user validation/updates (mixed status codes, error leakage, possible null deref, DOB corruption on role updates). Identify and harden them.
