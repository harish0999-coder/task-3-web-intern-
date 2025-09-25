// server.js
const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON request body
app.use(express.json());

// In-memory books array
let books = [
  { id: 1, title: "JavaScript Basics", author: "Brendan Eich" },
  { id: 2, title: "Node.js in Action", author: "Mike Cantelon" },
];

// -------------------- ROUTES -------------------- //

// GET all books
app.get("/books", (req, res) => {
  res.status(200).json(books);
});

// POST new book
app.post("/books", (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: "Title and author are required" });
  }
  const newBook = { id: books.length + 1, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT update book by ID
app.put("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;
  const book = books.find((b) => b.id === bookId);

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  if (title) book.title = title;
  if (author) book.author = author;

  res.status(200).json(book);
});

// DELETE book by ID
app.delete("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex((b) => b.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({ error: "Book not found" });
  }

  const deletedBook = books.splice(bookIndex, 1);
  res.status(200).json({ message: "Book deleted", deletedBook });
});

// -------------------- START SERVER -------------------- //
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
