# 📦 Subscription Management Tracker

A full-stack web app that helps users track, manage, and analyze their subscriptions — from streaming services to software tools — all in one place.

---

## 🚀 Features

* 🧾 Add, edit, and delete subscriptions
* 🗕️ Set renewal dates and get notified
* 📊 Visualize spending by category using bar or pie charts
* 🔍 Smart OCR upload to auto-fill subscription info
* 🧠 LLM-based parsing for scanned receipts
* 🌐 Built with React, Express, MongoDB, Upstash Redis

---

## 🛠️ Tech Stack

| Frontend | Backend           | Database | AI/ML APIs             | Deployment     |
| -------- | ----------------- | -------- | ---------------------- | -------------- |
| React    | Node.js + Express | MongoDB  | OCR Space, Together.ai | Vercel, Render |

---

## 🪙 Deployment

The project can be deployed on platforms like Vercel (frontend) and Render (backend). Environment variables must be set accordingly in each deployment dashboard.

---

## 🔧 Local Development (Optional)

```bash
# Clone the repository
git clone https://github.com/Nada-08/Subscription-Tracker.git
cd subscription-tracker

# Install dependencies for both frontend and backend
cd backend && npm install
cd ../frontend && npm install
```

### 🔐 Environment Setup

Create a `.env` file in the `/backend` directory based on the provided `.env.example`.

#### Development `.env` variables:

```env
# Server Config
PORT=5500
SERVER_URL=http://localhost:5500
NODE_ENV=development

# Database
DB_URI=

# Authentication
JWT_SECRET=
JWT_EXPIRES_IN=

# Email Sending
EMAIL_PASSWORD=

# OCR + AI APIs
OCR_SPACE_API_KEY=
TOGETHER_API_KEY=

# Upstash QStash (for scheduling/webhooks)
QSTASH_URL=http://127.0.0.1:5000
QSTASH_TOKEN=

# Optional - Arcjet bot protection (remove if unused)
ARCJET_KEY=
ARCJET_ENV=development
```

#### Production environment (example):

```env
NODE_ENV=production

# Upstash
QSTASH_URL=
QSTASH_TOKEN=
QSTASH_CURRENT_SIGNING_KEY=
QSTASH_NEXT_SIGNING_KEY=
```

---

## 🧠 Smart OCR + LLM Parsing

This project uses:

* **OCR Space API** for extracting text from uploaded images
* **Together.ai FLUX** model to parse and structure subscription data

> This means you can just upload a screenshot of a subscription receipt — and it auto-fills the form!

