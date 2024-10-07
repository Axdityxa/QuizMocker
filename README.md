# **Quiz App - Next.js with Clerk, Prisma, MongoDB & Sanity Integration**

This project is a **Quiz Application** built using **Next.js** as the front-end framework. It integrates with **Clerk** for authentication, **Prisma** as the ORM for database management, **MongoDB** as the database, and **Sanity** for content management.

## **Table of Contents**

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## **Project Overview**

The **Quiz App** allows users to log in, take quizzes, and view their scores. User authentication is handled by Clerk, content (questions, answers) is managed via Sanity, and the app stores quiz results in a MongoDB database using Prisma for database interaction.

## **Tech Stack**

- **Frontend**: [Next.js](https://nextjs.org/)
- **Authentication**: [Clerk](https://clerk.dev/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Content Management**: [Sanity](https://www.sanity.io/)
- **Styling**: CSS modules, Tailwind CSS (or whatever you are using)
- **Deployment**: Netlify/Vercel

## **Features**

- User authentication via Clerk (Sign-up, Sign-in)
- Quiz management via Sanity CMS
- Database interaction using Prisma and MongoDB
- User-specific quiz scores stored and retrieved
- Admin features to create/edit quiz questions (if applicable)

## **Getting Started**

### **Prerequisites**

Before you begin, ensure you have the following tools installed on your machine:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB Atlas Account** (for cloud database)
- **Clerk Account** (for authentication)
- **Sanity Account** (for content management)

### **Installation**

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/quiz-app.git
   cd quiz-app

2. **Install dependencies:**

   ```bash
   npm install

   or

   yarn install

### **Running the Project**

1. Set up environment variables: Create a .env file in the root directory and add the required environment variables (see below for details).

2. Generate Prisma client:
  
  ```bash
  npx prisma generate

3. Run the development server:

  ```bash
  npm run dev

The app will be running at http://localhost:3000.

### **Environment Variables**
You'll need to create a .env file and a .env.local file in the root directory. Below are the required environment variables:

**.env**

  ```bash
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
  CLERK_SECRET_KEY=your_clerk_secret_key

  NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
  NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
  NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
  NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

  DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority"
