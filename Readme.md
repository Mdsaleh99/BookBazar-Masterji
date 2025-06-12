# 📦 Book Bazar – REST APIs

---
### Postman Link:
[BookBazar collection](https://www.postman.com/mdsaleh24/workspace/mohammed-saleh-masterji-assignment/collection/31971271-a4f31640-90b3-4fe6-975b-dee6dc695ab8?action=share&creator=31971271)

## 🔐 Auth Folder
Authentication and authorization endpoints.

| Method | Endpoint      | Purpose |
|--------|---------------|---------|
| `POST` | `/register`   | Register a new user with email, password, etc. |
| `POST` | `/login`      | Login and receive a JWT token. |
| `POST` | `/logout`     | Logout the user (optional logic, like clearing token client-side). |
| `GET`  | `/me`         | Get the currently authenticated user’s profile. |
| `POST` | `/api-key`    | Generate an API key tied to the user for accessing secure routes. Store this key in `x-api-key` header in future requests. |

---

## 📚 Book Folder  
Manage the books in your system. Some routes are public, others require admin access.

| Method | Endpoint         | Purpose |
|--------|------------------|---------|
| `POST` | `/book/add`         | Add a new book (Admin only). |
| `GET`  | `/book/get-all-books`         | Fetch all books. Supports filters and pagination. |
| `GET`  | `/book/:id`     | Fetch a single book by ID. |
| `PUT`  | `/book/:id`     | Update an existing book (Admin only). |
| `DELETE` | `/book/:id`   | Delete a book (Admin only). |

---

## 📝 Review Folder  
Submit and manage book reviews.

| Method | Endpoint                    | Purpose |
|--------|-----------------------------|---------|
| `POST` | `/review`                  | Add a review to a book (Authenticated users). |
| `GET`  | `/review/book/:bookId`     | Get all reviews for a specific book. |
| `DELETE` | `/review/:id`            | Delete a review (Only by the review’s owner). |

---

## 📦 Order Folder  
Create and view user-specific orders.

| Method | Endpoint                | Purpose |
|--------|-------------------------|---------|
| `POST` | `/order/:bookId`               | Create a new order from the user's cart. |
| `GET`  | `/order/user-order`               | Get all orders of the current user. |
| `GET`  | `/order/:id`      | Get a specific order by ID (Owned by user). |

---

### ✅ Required Headers
1. **x-api-key**  
   Format: Your generated API key  
   - Required for routes like `/books`, `/orders`, etc. if API key verification is enabled.
