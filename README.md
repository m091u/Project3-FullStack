# ReadCycle - MERN Stack Book Exchange Project

This is a project developed using the MERN Stack (MongoDB, Express.js, React.js, Node.js).
readCycle is a web application for book enthusiasts to exchange and share their favorite books with others.

## Features

### User Registration and Login:

- **Signup:** Create an account to access the platform.
- **Login:** Securely login to account.
- **Profile:** Registered users can log in to the platform.
- **Logout:** Safely log out of account.

### Book Library

- **Browse Books:** Explore a diverse library of books.
- **Book Details:** View detailed information about each book.
- **Filter:** Find books by genre.
- **Request Books:** Request a book from other users.
- **Owner Reviews:** Read reviews from book owners.

### User Interactions

- **Request Management:** Keep track of book requests and their status.
- **Notifications:** Receive notifications for requests, approvals, and rejections.

### Security

- **JWT Authentication:** Secure user authentication with JSON Web Tokens.
- **Password Hashing:** Safeguard user passwords with bcrypt hashing.
- **Middleware Protection:** Protect routes with authentication middleware.
- **Error Handling:** Handle errors to ensure a smooth user experience.

## Technologies Used

- **Frontend:** React.js, React Router, Axios
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **Database:** MongoDB Atlas
- **Cloud Storage:** Cloudinary for image storage
- **Email sending:** Nodemailer
- **Deployment:** Netlify

## Getting Started

. **Clone the repository:**

```bash
git clone https://github.com/m091u/Project3-FullStack/tree/main
cd readcycle

# Install server dependencies
cd server
npm install

# Install client dependencies
cd client
npm install
Configure environment variables:
Create .env files in both the server and client directories. Add the necessary environment variables for your project, such as MongoDB connection strings, Cloudinary API keys, and JWT secrets.

Run the application:
bash
# Start the server
cd ../server
npm start

# Start the client
cd ../client
npm start
Access the application in your browser at http://localhost:3000.

Contributing
We welcome contributions to improve ReadCycle. Feel free to open issues or submit pull requests.








```
