
# NoteApp

## Overview
**NoteApp** is a simple and responsive note-taking application built using the MERN stack (MongoDB, Express, React, and Node.js). The app allows users to create an account, manage their notes, and perform CRUD (Create, Read, Update, Delete) operations on their notes. User authentication ensures that notes are private and can only be accessed and managed by the owner.

## Features
- User authentication (login and signup).
- Create, update, read, and delete notes.
- User can only view and manage notes they created.
- Users can update or delete their account.
- Responsive design ensures usability across devices.
  
## Technologies

### Frontend:
- **React**: The core library for building the frontend UI.
- **React Hook Form**: For form validation and state management.
- **TanStack React Query**: To fetch, cache, and sync data between the frontend and backend.
- **Axios**: For HTTP requests to the backend API.
- **React Router DOM**: For client-side routing and navigation.
- **Tailwind CSS**: For styling and responsive design.
  
### Backend:
- **Node.js**: For handling server-side logic.
- **Express**: As the backend framework.
- **MongoDB**: For database management.
- **Mongoose**: To interact with MongoDB.
- **JWT (JSON Web Tokens)**: For user authentication and authorization.
- **Bcrypt.js**: To securely hash and store user passwords.
- **Cookie-parser**: To handle cookie-based authentication.
- **CORS**: To enable Cross-Origin Resource Sharing.
  

### Styling:
- **Tailwind CSS**: Used for the design and styling of the frontend. It's a utility-first CSS framework that allows for quick and responsive design implementations.

The app should now be running on:
- Frontend: \`http://localhost:5173\`
- Backend: \`http://localhost:3000\`

## Usage

1. **Sign up**: Create an account using the registration page.
2. **Login**: Use your credentials to log in.
3. **Create Notes**: After logging in, you can create, update, and delete your personal notes.
4. **Account Management**: Users can update or delete their account at any time.
5. **Private Notes**: Only the logged-in user can view and manage their notes.
