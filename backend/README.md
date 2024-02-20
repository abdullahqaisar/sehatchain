# SehatChain Backend

This document provides detailed instructions for setting up and running the backend part of the SehatChain project, a MERN stack application focused on providing healthcare data models powered by AI. You can read the complete project readme [here](../README.md).

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)

## Introduction

The backend of SehatChain is built with Node.js and Express, offering RESTful APIs for user authentication, data model browsing and purchasing, AI-powered data analysis, and secure blockchain transactions. It's designed to work seamlessly with the SehatChain frontend to deliver a comprehensive user experience.

## Prerequisites

Before setting up the backend, ensure you have the following installed:
- [Node.js](https://nodejs.org/en/download/) - JavaScript runtime built on Chrome's V8 JavaScript engine.
- [MongoDB](https://www.mongodb.com/try/download/community) - Document-based database used for storing application data.

## Installation

1. Clone the SehatChain repository (if you haven't already):
   ```bash
   git clone https://github.com/abdullahqaisar/sehatchain.git
   ```

2. Navigate to the backend directory:
   ```bash
   cd sehatchain/backend
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```

## Configuration

Create a `.env` file in the backend directory with the following content:
```env
PORT=3001
JWT_SECRET="your_jwt_secret"
MONGODB_URI="your_mongodb_uri"
EMAIL_USER="your_email_user"
EMAIL_PASSWORD="your_email_password"
```
- `PORT` - The port on which the backend server will run.
- `JWT_SECRET` - Secret key for JWT token generation and verification.
- `MONGODB_URI` - Your MongoDB connection URI.
- `EMAIL_USER` and `EMAIL_PASSWORD` - Credentials for emailing functionalities.

## Usage

To start the backend server, run:
```bash
npm start
```
This command will start the Node.js server on the port specified in your `.env` file. The backend is now ready to accept requests from the frontend or any other client.

## Contributing

We welcome contributions to the SehatChain project. Please refer to the project's [Contribution Guidelines](../CONTRIBUTING.md) for more information on how you can contribute.

---

For any questions or assistance, feel free to reach out to the project maintainers.
```

This `README.md` is crafted to guide users through the process of setting up, configuring, and using the backend services of your SehatChain project. It covers the essentials from prerequisites and installation steps to starting the server and contributing to the project.