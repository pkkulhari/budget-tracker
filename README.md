# Budget Tracker

A simple budget-tracking application built with Django(DRF) and React.js

## Live Demo

https://budget-tracker-i62i.onrender.com (username: praveen, password: pass)

**Note:** This demo is hosted on free server, thus some actions may take logger time.

## Features

- Add, edit and delete transactions
- Add and remove friends
- Auto amount splitting among accociated friends
- You owe and Owes you features
- JWT Authentication

## Tech Stack

**Server:** Django, Django Rest Framework

**Client:** React, React Bootstrap, React Query, TypeScript

## Run Locally

Clone the project

```bash
git clone https://github.com/pkkulhari/budget-tracker.git
```

Go to the project directory

```bash
cd budget-tracker
```

Install dependencies for Backend

```bash
cd backend && pip install -r requirements.txt
```

Make DB migrations

```bash
python manage.py makemigrations && python manage.py migrate
```

Start the backend server

```bash
python manage.py runserver
```

Open a new terminal and install dependencies for frontend

```bash
cd frontend && yarn
```

Start the development server

```bash
yarn dev
```

Go to http://localhost:5173/

## Usage

After installing, you can go to app and add transactions.

**Note:** It's important to note that only users who are in your friend list will appear in the dropdown options for the "payer" and "friends to split" fields.

Therefore, before you can add a transaction, you will need to create multiple accounts through the signup process and then add those users to your friend list.
