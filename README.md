 NoteFlow API 📝

A RESTful CRUD API for managing notes, built with **Node.js**, **Express.js**, and **MongoDB**.

---
## ⚙️ Setup & Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/noteflow.git
cd noteflow

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Edit .env with your MongoDB URI

# 4. Start the server
npm run dev       # Development (nodemon)
npm start         # Production
```

---

## 🌐 API Endpoints

Base URL: `http://localhost:5000/api`

| Method | Endpoint         | Description          |
|--------|------------------|----------------------|
| GET    | /notes           | Get all notes        |
| GET    | /notes/:id       | Get a single note    |
| POST   | /notes           | Create a new note    |
| PUT    | /notes/:id       | Update a note        |
| DELETE | /notes/:id       | Delete a note        |

---

## 🔍 Query Parameters (GET /api/notes)

| Param     | Type    | Example                        |
|-----------|---------|--------------------------------|
| category  | string  | ?category=work                 |
| isPinned  | boolean | ?isPinned=true                 |
| search    | string  | ?search=meeting                |

---

## 📦 Request Body (POST / PUT)

```json
{
  "title": "Meeting Notes",
  "content": "Discuss Q3 roadmap with the team.",
  "category": "work",
  "isPinned": true,
  "tags": ["meeting", "Q3"]
}
```

### Field Validation

| Field    | Type    | Required | Rules                                        |
|----------|---------|----------|----------------------------------------------|
| title    | String  | ✅ Yes   | min 3 chars, max 100 chars                   |
| content  | String  | ✅ Yes   | min 5 chars                                  |
| category | String  | ❌ No    | one of: personal, work, study, other         |
| isPinned | Boolean | ❌ No    | default: false                               |
| tags     | Array   | ❌ No    | array of strings                             |

---

## ✅ HTTP Status Codes

| Code | Meaning                  |
|------|--------------------------|
| 200  | OK                       |
| 201  | Created                  |
| 400  | Bad Request              |
| 404  | Not Found                |
| 500  | Internal Server Error    |

---

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Sanitization**: express-mongo-sanitize
