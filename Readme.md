 📇 Snapp Pay Contact List

A React project built from scratch using Webpack and Babel. It features infinite scrolling, search functionality, and a clean component structure.

---

## 🚀 Tech Stack

- **React** (with hooks)
- **Webpack + Babel** (custom setup)
- **SASS** (for modular styling)
- **React Query** (data fetching + caching)
- **Axios** (API requests)
- **React Router DOM** (routing)
- **Lodash** (utilities like debounce & throttle)

---

## 📂 Project Structure

. ├── backend/ # Backend API (should run on localhost:1337) ├── frontend/ # Frontend React application │ ├── components/ # UI components like ContactCard, SearchField │ ├── hooks/ # Custom hooks (useInfiniteScroll, useDebounce) │ ├── styles/ # SASS styling │ ├── utils/ # Axios helpers, query functions │ ├── App.tsx # Main App component │ ├── index.tsx # Entry point │ └── ... # Config files for Webpack and Babel


---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Babak-Taghizadeh/snapp-contacts-assignment.git
cd snapp-pay-assignment
```

2. Start the backend server

Make sure the backend is running at http://localhost:1337:

```bash
cd backend
npm install
npm start
```

3. Start the frontend development server

In a new terminal:

```bash

cd snapp-contacts-assignment
npm install
npm start
```

Open your browser and go to http://localhost:3000
# 🔍 Features

    🔁 Infinite scrolling with React Query

    🔎 Search functionality (detects input: phone or last name)

    🧠 Debounced search input

    ⚡ Custom Webpack + Babel configuration

    🎨 SASS for clean styling

    🔧 Modular and maintainable component structure

# 📌 Notes

    Backend and frontend need to be started separately.
