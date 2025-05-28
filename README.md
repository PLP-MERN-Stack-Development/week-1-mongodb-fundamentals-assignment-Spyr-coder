# 📚 MongoDB Fundamentals – Week 1 Assignment

## 📦 Project Overview
This project demonstrates the fundamentals of MongoDB including setting up a database, inserting documents, and running CRUD & advanced queries using Node.js.

## 🛠 Prerequisites

Ensure the following are installed on your system:

- Node.js (v14 or later)
- MongoDB (Local or Atlas cluster)
- NPM (Node Package Manager)

## 📁 Files Included

- `insert_books.js` – Script to insert sample books into the `plp_bookstore` database.
- `queries.js` – Script containing MongoDB queries for CRUD and advanced operations.
- `README.md` – This file (how to run the project).
- `screenshot.png` – Screenshot of MongoDB Compass or Atlas showing the collection.

## 📂 Database Structure

- **Database:** `plp_bookstore`
- **Collection:** `books`
- **Document Fields:**
  - `title` (string)
  - `author` (string)
  - `genre` (string)
  - `published_year` (number)
  - `price` (number)
  - `in_stock` (boolean)
  - `pages` (number)
  - `publisher` (string)

---

## 🚀 How to Run

### 1. Clone the Repository
```bash
git clone <your-repo-link>
cd week-1-mongodb-fundamentals-assignment-Spyr-coder

git clone <your-repo-link>
cd week-1-mongodb-fundamentals-assignment-Spyr-coder```
````
2. Install Dependencies
bash
Copy
Edit
npm install mongodb
3. Run the Insert Script
To populate the database with book data:

bash
Copy
Edit
node insert_books.js
You should see a message confirming that books were inserted.

4. Run the Queries Script
bash
Copy
Edit
node queries.js
This will execute various MongoDB queries and print the output in the terminal.

If you see a warning about ES modules, make sure your package.json includes "type": "module" at the top level:

json
Copy
Edit
{
  "type": "module"
}
