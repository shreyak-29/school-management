# 🎓 School Management API 🏫

## 📌 Overview
This project provides a simple **School Management API** using **Node.js, Express.js, and MySQL**. It allows users to:
- ➕ Add a new school to the database.
- 📍 Retrieve a list of schools sorted by proximity to a given location.
- 🌐 Serve static HTML pages.

## 🚀 Features
- ✅ RESTful API endpoints for adding and listing schools.
- 🖥️ Statically served HTML pages.
- 🔧 Environment configuration using `.env`.
- 📜 Middleware for logging requests.

## 🛠️ Technologies Used
- 🟢 **Node.js**
- ⚡ **Express.js**
- 🗄️ **MySQL**
- ☁️ **Render** (for hosting)

## 🔗 API Endpoints

### 🏫 Add a New School
**📍 Endpoint:** `/api/v1/school/addSchool`  
**📡 Method:** `POST`

**📩 Request:**
```sh
curl --location 'https://school-management-hm8a.onrender.com/api/v1/school/addSchool' \
--header 'Content-Type: application/json' \
--data '{"name": "ABC High School", "address": "123 Street", "latitude": 19.0760, "longitude": 72.8777}'
```

**📨 Response:**
```json
{
  "message": "School added successfully",
  "schoolId": 1
}
```

---

### 📍 List Schools by Proximity
**📍 Endpoint:** `/api/v1/school/listSchools`  
**📡 Method:** `GET`

**📩 Request:**
```sh
curl --location 'https://school-management-hm8a.onrender.com/api/v1/school/listSchools?latitude=38&longitude=-100'
```

**📨 Response:**
```json
[
  {
    "id": 1,
    "name": "ABC High School",
    "address": "123 Street",
    "latitude": 19.0760,
    "longitude": 72.8777,
    "distance": 1500.32
  }
]
```

---

## 🖥️ Static Pages
- 🏠 **Homepage:** `/` → Serves `index.html` from the `public` folder.
- 🔍 **Find Nearby Schools Page:** `/findNearby` → Serves `findNearby.html` from the `public` folder.

## 📂 Project Structure
```
.
├── public/
│   ├── index.html
│   ├── findNearby.html
├── routes/
│   ├── school.router.js
├── .env
├── index.js
├── package.json
```

## ⚙️ Installation & Setup
1. **Clone the repository:**
   ```sh
   git clone https://github.com/shreyak-29/school-management.git
   cd school-management
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables in `.env`:**
   ```env
   PORT=3000
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   ```
4. **Run the server:**
   ```sh
   node server.js
   ```
5. **Access the API:**
   - 🌍 `http://localhost:3000/api/v1/school/addSchool`
   - 📍 `http://localhost:3000/api/v1/school/listSchools?latitude=38&longitude=-100`
   - 🏠 `http://localhost:3000/` (Homepage)
   - 🔎 `http://localhost:3000/findNearby` (Find Nearby Schools Page)

## 🌍 Deployment
This project is deployed on **Render**. The live API can be accessed at:  
🔗 **[Live API](https://school-management-hm8a.onrender.com/)**

## 👩‍💻 Author
- **Shreya Kathe** ✉️ (shreyakathe2904@gmail.com) 🚀
