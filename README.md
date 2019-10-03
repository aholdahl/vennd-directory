### ABOUT THIS PROJECT
Vennd is a business directory and crowd-sourced review forum specifically designed for people in minority demographics to find safe and affirming businesses in their area.

## Prerequisites
Before you get started, make sure you have the following software installed on your computer:

Node.js
PostrgeSQL
Nodemon

## Create Database and Table
In Postico (or equivalent program), create a database called prime_app
Copy+paste the SQL query in the database.sql file into Postico and run all lines

## Development Setup
Run npm install
Create a .env file at the root of the project and create a SERVER_SESSION_SECRET
    Example: SERVER_SESSION_SECRET=superDuperSecret
Start postgres using `brew services start postgresql`
Start the server using `npm run server`
Start the client using `npm run client `
    This should automatically open a new tab at localhost:3000

## Built with:
HTML
CSS
Material-UI
Sweet-Alerts
Javascript
React
Redux
Axios
Express
PostgreSQL

## Author

Allyson Holdahl

## Acknowledgements

My instructors, Dane Smith and Kris Szafranski
My cohort, particularly Andy DuBois, Dustin Fedie, David Heisel, Alex Smith, Brandon Wiedemeier, Chris O'Bannon, and Pache Vang
My cousin, Val Holdahl

# Further Development

Search by location
Search by multiple demographics
Restrict users from voting on demographics to which they do not belong by requiring self-identification on profile page
Create portal for admin to manage business categories
Perform UX surveys to determine additional features and whether more demographic categories are needed.