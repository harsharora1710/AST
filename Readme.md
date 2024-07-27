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

React: A JavaScript library for building user interfaces.
Serve: A static file serving and directory listing package.

### Dockerization

Multi-Stage Build: Optimizes the image size by separating the build and runtime environments.
Node.js: Used for both the build stage and the runtime stage.

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
