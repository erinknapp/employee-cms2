# Employee Tracker - Content Management System (CMS)

## Description
This is a command-line MySQL CMS that can be used to track employees and managers.

## Technology Used
* Javascript
* Node.js
* Inquirer
* Console.table
* MySQL/MySQL2

## Demo

View demo [here](https://drive.google.com/file/d/1G7-D72GvAu9i4wRp91OyBYSONP5Z9pGC/view). Demo was recorded using the Screencastify extenstion in Google Chrome. Video is stored on author's google drive.

## Installation/Use
1. Clone project to your local machine.
2. Install necessary node packages and dependencies by typing ```npm install``` at the command line in the root of the project folder.
3. At the command line, enter ```mysql -u root -p``` to open MySQL shell. Source the database, schema, and seed the data in the MySQL shell by entering the following commands:
* ```source db/db.sql```
* ```source db/schema.sql```
*```source db/seeds.sql```
4. Exit MySQL shell and return to the terminal. Enter ```npm start``` to start Employee Tracker CMS.

## Made with 💖 by Erin Knapp 2022