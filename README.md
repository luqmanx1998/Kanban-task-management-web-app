# Kanban task management web app

![Design preview for the Kanban task management web app coding challenge](./preview.jpg)

# Kanban Task Management Web App
A sleek, modern Kanban-style task management app.

- Built with React, Vite, Redux Toolkit, TailwindCSS, D&D kit and local storage persistence.



# 🎥 Demo

[(./src/assets/kanbandemo.mp4)](https://youtu.be/-LibJo0d8SU)

# 🚀 Features

- Create, edit, and delete boards and tasks

- Drag-and-drop task reordering between and within columns

- Subtasks with completion tracking

- Responsive design for mobile, tablet, and desktop

- Dark mode support

- State persistence via localStorage

- Built with Redux Toolkit for scalable state management

# 🛠️ Tech Stack

- React

- Redux Toolkit

- Tailwind CSS

- localStorage

- dnd-kit (for drag and drop)

# 📈 Challenges I Faced:

## Responsive Fixed Navbar:

- Adjusting the fixed navbar to account for the sidebar dynamically without causing layout shifts or scroll gaps.

## Drag and Drop Logic:

- Implementing seamless drag-and-drop with dnd-kit was tricky, especially handling reordering inside columns and moving tasks between different columns. 

## State Persistence:

- Setting up localStorage manually to persist Redux state was a new experience and required careful attention.

## Balancing Refactoring vs Shipping:

- I had to consciously limit over-refactoring and "perfecting" the app to actually finish and ship it, which was a valuable lesson in prioritizing delivery over endless polishing.

## ✨ What I'd Improve with More Time:

- More modular reusable components (e.g., Modal component, Button component)

- More robust localStorage syncing (e.g., debounce writes to localStorage)

- Possibly introduce a backend for user accounts and cloud persistence

## 🧠 Final Thoughts:

This project pushed me in terms of advanced React patterns, Redux, drag-and-drop UX, and production-level polish.
It is one of my portfolio pieces showing my ability to build real-world, scalable applications.
