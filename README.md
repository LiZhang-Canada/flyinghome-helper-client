# Project Title
Flyinghome Helper

## Overview

For new immigrants, when flying home, it can help them take gifts (health supplements) for relatives in home country.
 
### Problem

For Costco health supplements, such cs Calcium, VC, etc, expect these basic ones, I don’t know the functions of them, which is good for heart, which is good for eye. Each time, if I need buy some for relatives in my home country, I researched the functions on the website for each of them. And later for a while, I forgot totally. Also, for seniors in my home country, they can’t read English when they get the health supplements and don’t know the dosage. 

### User Profile
- My relatives can check the functions and daily usage by themselves in Chinese
- if they want me take something when I back to home country, they can send me health supplements lists directly
- I can get a total sum for each of item and buy in Costco

### Features
**user here means my relatives**
- As a user, I can see a list of health supplements (advanced: can filter by function area: heart/bone/eye..., also filter by senior/kid/men/women)
- As a user, I can click each item image, check the functions and daily usage
- As a user, if I click "translate into Chinese", I can check the functions and daily usage in Chinese
- As a user, I can add item into order cart
- As a user, I can send the order cart to someone(must be registered user) who help to buy and take home
**logged in user here means me/my husband**
- As a logged in user, I can check my order list (for each item, total number) which was sent by relatives
- As a logged in user, if I finished one item shopping, I can update the status to done

## Implementation

### Tech Stack

- React
- JSX
- MySQL
- Express
- Client libraries: 
    - react
    - react-router
    - axios
- Server libraries:
    - knex
    - express

### APIs

- No external APIs will be used

### Sitemap

- Home page (Health Supplements List page)
- Health Supplements Detail page
- Shopping cart page
- Register
- Login
- My List page (upper part is item name/total quantity table, lower part is relative/item name/quantity table)

### Mockups
![handdraw_design](handdraw_design.jpeg)

### Data Structure
![Sql-data](Sql-data.png)

### Endpoints

**GET /api/healthsupplements**
**GET /api/healthsupplements/:id**

**POST /auth/register**
**POST /auth/login**

**POST /api/shoppinglist**
**GET /api/shoppinglist/:id**

**GET /api/relatives/:id**


## Roadmap

- Create client
    - react project with routes and boilerplate pages

- Create server
    - express project with routing, with placeholder 200 responses

- Create migrations

- Gather some sample health supplements (img, name, function, daily usage,function in Chinese, daily usage in Chinese )

- Create seeds with sample health supplements
- Feature Implementation
- Bug fixes

- DEMO DAY

## Nice-to-haves
- filter by different option for the healthsupplements home page
- logged in user can add new health supplements
- Forgot password functionality
- Manage Relatives (add new relative, edit existing relative, delete existing relative)
- Add additional table for item to translated text which can support different country languages
- When ralatives send the order list, can send a mail to them for the order detail

## Installation Instruction

### Backend part:

npm i

Following .env.sample to create .env file, within it:
JWT_KEY could be generated as below:
To generate a secret key you can run this line of code in the Terminal: 
node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"

CREATE DATABASE flyinghomehelper
    DEFAULT CHARACTER SET = 'utf8mb4';
USE flyinghomehelper;

npm run migrate
npm run seed

npm start


### Front-End:

npm i
npm start
