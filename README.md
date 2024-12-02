# Hotel Booking API

## Overview

The Hotel Booking API is a full-stack application designed to manage hotel reservations. Built with Node.js for the backend and React for the frontend, this project allows users to search for available hotels, make reservations, and manage bookings.

## Features

- User authentication (registration and login)
- Search hotels by location and date
- View hotel details and available rooms
- Make and manage reservations
- Admin dashboard for hotel management

## Technologies Used

- **Backend**:
    - Node.js
    - Express.js
    - MongoDB
    - JWT for authentication

- **Frontend**:
    - React

### Prerequisites

- Node.js installed on your machine
- MongoDB or any other database of your choice

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/hotel-booking.git
```

2. Navigate to the backend directory and install dependencies:

  ```bash
cd hotel-booking/backend
npm install
```

3. Navigate to the frontend directory and install dependencies:

  ```bash
cd ../frontend
npm install
```

### Running the Application


1. Start the backend server:

```bash
cd backend/
tsc --watch
nodemon backend/dist/server
```

2. Start the frontend application:

```bash
cd frontend/
npm run dev
```

## Usage
Once both the backend and frontend servers are running, you can access the application in your browser at http://localhost:3000.

## Contributing
Feel free to submit a pull request or open an issue if you would like to contribute to this project.
