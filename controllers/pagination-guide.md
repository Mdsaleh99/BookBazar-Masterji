
# 📚 Pagination in REST APIs – A Complete Guide

When dealing with large sets of data like books, orders, or users in a backend API, **pagination** is essential to ensure performance, scalability, and user experience.

---

## 📘 What is Pagination?

**Pagination** refers to dividing a large dataset into smaller, manageable chunks (pages) that are fetched individually.

Instead of returning **all books at once**, you fetch a **subset of books** per page.

---

## 🎯 Why Use Pagination?

- ✅ Improves performance (only fetch what is needed)
- ✅ Reduces load on the backend/database
- ✅ Makes the frontend UI cleaner and faster
- ✅ Enables infinite scroll, page numbers, or "Load More" buttons

---

## 🔢 Common Pagination Parameters

| Query Param | Description                  | Example       |
|-------------|------------------------------|---------------|
| `page`      | The page number to fetch     | `page=2`      |
| `limit`     | Number of items per page     | `limit=10`    |

---

## 📦 Example Scenario

You have **1000 books** in the database and want to fetch **10 per page**.

| Page | Skip | Limit | Items Returned      |
|------|------|-------|----------------------|
| 1    | 0    | 10    | Books 0 - 9          |
| 2    | 10   | 10    | Books 10 - 19        |
| 3    | 20   | 10    | Books 20 - 29        |

> Formula: `skip = (page - 1) * limit`

---

## 🧠 Backend Logic (Concept)

1. Read `page` and `limit` from query params
2. Compute how many documents to `skip`
3. Fetch data using `.skip().limit()` (MongoDB) or `OFFSET LIMIT` (SQL)
4. Count total items for pagination metadata
5. Return response with both `data` and `pagination` info

---

## 🧾 Example API Call

```http
GET /books?page=3&limit=5
```

### Backend Logic:
- Page: 3
- Limit: 5
- Skip: (3 - 1) * 5 = 10

### MongoDB Query (Mongoose-style)
```js
const books = await Book.find().skip(10).limit(5);
const totalBooks = await Book.countDocuments();
```

### Example Response:
```json
{
  "data": [
    { "title": "Book 11" },
    { "title": "Book 12" },
    { "title": "Book 13" },
    { "title": "Book 14" },
    { "title": "Book 15" }
  ],
  "pagination": {
    "page": 3,
    "limit": 5,
    "total": 100,
    "totalPages": 20,
    "hasNextPage": true,
    "hasPrevPage": true
  }
}
```

---

## 🧭 Why Include Pagination Metadata?

- Helps the frontend know if there are more pages
- Supports "Next" / "Previous" / "Jump to Page"
- Improves UX in page navigation and infinite scroll

---

## 🚀 Tips for Building Pagination

- Provide default values if `page` or `limit` is missing
- Always validate query params (e.g. non-negative, numeric)
- Avoid hardcoding limits; allow flexible limits via query params
- Add filters (e.g. `?page=2&limit=5&category=fiction`) to combine with pagination

---

## 🔁 Alternatives to Page-Based Pagination

For huge datasets or real-time apps, consider:

### Cursor-based Pagination:
- Uses a unique field like `_id` or `createdAt` to fetch records **after** a certain point.
- Example: `?after=book_1234`

Useful for infinite scroll or real-time data feeds.

---

## 🧩 Summary

| Feature | Description |
|--------|-------------|
| `page` | Current page number |
| `limit` | Items per page |
| `skip` | Calculated offset in database |
| `total` | Total number of items |
| `totalPages` | Total pages calculated from total/limit |
| `hasNextPage` | Boolean for frontend |
| `hasPrevPage` | Boolean for frontend |

---

Pagination is one of the **core building blocks** of scalable REST APIs. Use it thoughtfully to ensure your API performs well and scales with your app.
