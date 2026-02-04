# 🎨 Frontend – Dynamic Event Ticketing System

This is the frontend application for the Dynamic Event Ticketing System.  
It allows users to view available seats, select multiple seats, see dynamic pricing, and book tickets.

The frontend communicates with a Spring Boot backend via REST APIs.

---

## 🧰 Tech Stack

- React.js
- Vite
- JavaScript (ES6+)
- CSS
- Fetch API

---

## 📁 Folder Structure

frontend/
├── src/
│ ├── App.jsx # Main UI and booking logic
│ ├── App.css # Seat grid styling
│ ├── main.jsx # React entry point
│ └── index.css
├── .env # Backend API configuration
└── package.json


---

## ✅ Prerequisites

Make sure the following are installed on your system:

- Node.js (v18 or higher recommended)
- npm

---

## 🚀 Step-by-Step: How to Run the Frontend

### Step 1: Navigate to the frontend folder

```bash
cd frontend

Step 2: Install dependencies
npm install


This will install all required React and Vite dependencies.

Step 3: Configure backend API URL

Create a .env file inside the frontend directory:

VITE_API_BASE_URL=http://localhost:8080/api


⚠️ Make sure the backend is running on port 8080.

Step 4: Start the frontend application
npm run dev
The frontend will start on:

http://localhost:5173
Open this URL in your browser.

#Backend Dependency

Before using the frontend:

Start the backend application

Call the backend API:

POST /api/initialize

This initializes the 100 seats.

Without this step, seats will not appear in the UI.

#How to Test the Application (Functional Flow)

Open the frontend in the browser

You will see a 10x10 grid (100 seats)

Grey seats → Available

Select multiple seats → they turn green

Total price updates dynamically based on booking order

Enter a username

Click Buy

On success:

Booking confirmation message appears

Seats turn red

Seats become disabled

Reload the page:

Previously booked seats remain red and disabled

Open another browser or incognito window:

Same booked seats cannot be selected again