# Rule Combiner

This project is a React-based rule engine frontend that allows users to create, evaluate, and combine rules. It is Dockerized to ensure ease of setup and deployment.

## Table of Contents

Project Description
Features
Architecture and Design Choices
Dependencies
Setup Instructions
Clone the Repository
Build the Docker Image
Run the Docker Container
Development
Contribution
License

## Project Description

The Rule Combiner application is designed to provide an intuitive interface for creating, evaluating, and managing rules. It is built using React and packaged into a Docker container for ease of deployment.

## Features

Create Rules: Users can create new rules.
Evaluate Rules: Users can evaluate existing rules.
Combine Rules: Users can combine multiple rules.

## Architecture and Design Choices

### Frontend
- **React:** Utilized for building the user interface due to its component-based architecture, which promotes reusability and maintainability.
- **Serve:** A static file serving and directory listing package used to serve the built React application in production.

### Dockerization
- **Multi-Stage Build:** Implemented to optimize the Docker image size by separating the build and runtime environments. The first stage uses Node.js to build the application, and the second stage uses a lightweight image to serve the static files.
- **Node.js:** Used for both the build stage and the runtime stage. In the build stage, Node.js compiles the React application, and in the runtime stage, it serves the static files using the `serve` package.

### Additional Design Choices
- **Component-Based Architecture:** Ensures that each part of the user interface is modular and can be developed and tested independently.
- **State Management:** Utilizes React's `useState` and `useEffect` hooks for managing component states and side effects, providing a smooth and dynamic user experience.
- **Error Handling:** Implemented error boundaries and appropriate error handling mechanisms to ensure the application remains robust and provides useful feedback to the user.
- **Responsive Design:** Ensures that the user interface is accessible and usable on a variety of devices, from desktops to mobile phones.

## Dependencies

To run this application, you will need to have the following dependencies installed:

Docker: Used to containerize the application.
Docker Compose (optional): For orchestrating multi-container Docker applications.

## Setup Instructions

### Clone the Repository

git clone https://github.com/harsharora1710/AST.git
cd rule-combiner

### Build the Docker Image

docker build -t rule-combiner .

### Run the Docker Container

docker run -p 3000:3000 rule-combiner

Alternatively, if you are using Docker Compose, you can start the application with:

docker-compose up

### Access the Application

Open your browser and navigate to:

http://localhost:3000

## Development

For development purposes, you can run the application locally without Docker.

### Install Dependencies

Make sure you have Node.js installed. Then, run:

npm install

### Run the Application

npm start

This will start the development server and you can access the application at:

http://localhost:3000
