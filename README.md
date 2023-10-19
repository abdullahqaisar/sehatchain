# SehatChain

**SehatChain** is a MERN (MongoDB, Express, React, Node.js) project that provides researchers and healthcare professionals with a platform to access and purchase healthcare data models powered by AI and Blockchain technology.

- **Frontend**: React
- **Backend**: Node.js with Express
- **Database**: MongoDB

You can access the project on GitHub: [SehatChain Repository](https://github.com/abdullahqaisar/sehatchain)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

SehatChain is a comprehensive platform designed to facilitate the acquisition of healthcare data models for research and clinical use. It leverages the power of AI for data analysis and Blockchain for secure transactions. Researchers and healthcare professionals can purchase, access, and collaborate on healthcare data models for a wide range of applications.

## Features

- **User Authentication**: Secure registration and login system for users.
- **Browse Data Models**: Easily browse available healthcare data models.
- **Purchase Models**: Users can purchase the healthcare data models they need.
- **AI-Powered Analysis**: Advanced AI algorithms for data analysis.
- **Collaboration**: Share and collaborate on data models with other users.
- **Dashboard**: Personalized dashboard for user activities and model management.

## Getting Started

Follow the steps below to set up and run SehatChain on your local machine.

### Prerequisites

Before you begin, make sure you have the following software installed on your system:

- [Node.js](https://nodejs.org/) - JavaScript runtime environment.
- [MongoDB](https://www.mongodb.com/) - A NoSQL database for storing data.
- [MetaMask](https://metamask.io/) - A digital wallet for Ethereum.

### Installation

1. Clone the SehatChain repository to your local machine:

   ```bash
   git clone https://github.com/abdullahqaisar/sehatchain.git
   ```

2. Install dependencies for both the frontend and backend:

   ```bash
   # Navigate to the frontend folder and install frontend dependencies
   cd frontend
   npm install

   # Navigate to the backend folder and install backend dependencies
   cd ../backend
   npm install
   ```

3. Configure the project as per the Configuration section below. Set the evironment variables like here 

4. Start the frontend and backend servers:

   ```bash
   # Start the frontend server
   cd frontend
   npm start

   # Start the backend server
   cd ../backend
   nodemon start
   ```

5. Access the application at [http://localhost:3000](http://localhost:3000).

## Configuration

### Environment Variables

You'll need to set up environment variables for the project. Create a `.env` file in the `backend` directory and add the following variables:

```env
PORT=3001
JWT_SECRET="secretkey"
MONGODB_URI=your-mongodb-uri
EMAIL_USER = ""
EMAIL_PASSWORD = ""
```

- `PORT`: Port on which the Node.js server will run.
- `MONGODB_URI`: Your MongoDB connection URI.
- `SECRET_KEY`: Secret key for JWT token generation.
- `EMAIL_USER`: Used for Emailing
- `EMAIL_PASSWORD`: Used for Emailing
## Usage

- Visit [http://localhost:3000/sehatchain](http://localhost:3000/sehatchain) to access the SehatChain frontend.
- Register or log in to start exploring healthcare data models and making purchases.

## Contributing

If you'd like to contribute to the project, please follow our [Contribution Guidelines](CONTRIBUTING.md).

---

Thank you for using SehatChain! If you have any questions or need assistance, please feel free to contact us.
