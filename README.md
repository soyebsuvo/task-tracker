# Task Tracker Web Application

## Live Link - [Task Tracker](https://task-tracker-mu-two.vercel.app)

### Overview
This project is a task tracker web application developed using React.js for the frontend and Express.js with MongoDB for the backend. The application allows users to manage tasks across five categories with CRUD operations including adding, editing, and deleting tasks. Additionally, it features a filtering system to search tasks by assignee name, priority, start date, and end date.

### Features
- **CRUD Operations:** Users can create, read, update, and delete tasks.
- **Category Management:** Tasks are organized into five categories for efficient tracking.
- **Filtering System:** Users can filter tasks based on assignee name, priority, start date, and end date.
- **Responsive Design:** Implemented using Tailwind CSS, ensuring a seamless experience across devices.

### Technologies Used
- **Frontend:** React.js, Tailwind CSS
- **Backend:** Express.js, MongoDB

### Installation
1. Clone the repository:
   ```bash
   frontend
   git clone https://github.com/soyebsuvo/task-tracker
   cd task-tracker

   backend
   git clone https://github.com/soyebsuvo/task-tracker-server

2. Install All the dependencies for both frontend and backend:
   ```bash
   npm install

3. Set up backend :
   - Ensure MongoDB is installed and running.
   - Navigate to the backend directory and create a .env file with the following variables:
   - create a mongodb bowser collection and insert the data from public folder from the frontend. (tasks.json)
   ```bash
   DB_USER=your_username
   DB_PASS=your_password

3. start the project :   
   ```bash
   give command
   forntend - npm run dev 
   backend - npm start

## Usage
- Access the application by visiting http://localhost:{PORT} in your web browser.
- Use the navigation to browse tasks across categories.
- Utilize the filtering system to search for specific tasks.
- Perform CRUD operations as needed to manage tasks.

## Contributors
Md Soyeb Been Hasan
soyebbeen@gmail.com