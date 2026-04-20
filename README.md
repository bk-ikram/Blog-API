# Blog API

A full-stack blog application built as a monorepo with a shared REST API backend and two separate React frontends — one for authors to manage content, and one for readers to view and comment on posts.

Built with Node/Express, Prisma, PostgreSQL, and React.

---

## Project Structure

```
/
├── backend/              # Express REST API
├── author-frontend/      # React app for writing and managing posts
└── reader-frontend/      # React app for reading and commenting
```

---

## Features

**Author frontend**
- Sign in with username and password (JWT-based)
- Create, edit, and delete posts
- Publish or unpublish posts
- Delete comments left by readers
- Session persists across page refreshes

**Reader frontend**
- View all published posts
- Leave comments on posts (no account required)

**Backend**
- JWT authentication via Passport.js
- Role-based access control (AUTHOR vs READER)
- Separate published/unpublished post visibility depending on caller
- Cascading deletes on posts and comments

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js, Express |
| Database | PostgreSQL via Prisma ORM |
| Authentication | Passport.js (Local + JWT strategies), bcryptjs |
| Frontend | React, React Router v6 |
| Date formatting | Luxon |
| Build tool | Vite |

---

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL database
- A `.env` file in the project root (see below)

### Environment Variables

Create a `.env` file at the root of the repo:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/yourdb
JWT_SECRET=your_jwt_secret_here
PORT=3000
```

### Install dependencies

Run this in each of the three directories:

```bash
cd backend && npm install
cd ../author-frontend && npm install
cd ../reader-frontend && npm install
```

### Set up the database

From the `backend` directory:

```bash
npx prisma migrate dev
npx prisma db seed
```

The seed script creates one author account:

| Field | Value |
|---|---|
| Username | `kiki` |
| Password | `myPassword` |

### Run the app

Start each of the three servers in separate terminals:

```bash
# Backend (port 3000)
cd backend && npm run dev

# Author frontend (port 5173)
cd author-frontend && npm run dev

# Reader frontend (port 5174)
cd reader-frontend && npm run dev
```

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/posts` | Optional | Returns all posts (published only for unauthenticated requests) |
| POST | `/api/signin` | None | Authenticate and receive a JWT |
| POST | `/api/post` | Author | Create or update a post |
| DELETE | `/api/post/:id` | Author | Delete a post |
| POST | `/api/post/:id/comment` | None | Add a comment to a post |
| DELETE | `/api/comment/:id` | Author | Delete a comment |

---

## Data Model

```
User
  id, userName, firstName, lastName, hash, role (AUTHOR | READER), createdAt

Post
  id, userId, title, content, published, createdAt, publishedAt

Comment
  id, postId, guestName, content, createdAt
```

Deleting a post cascades to its comments. Deleting a user cascades to their posts.
