# e-Shopping-Mall-api [![Build Status](https://travis-ci.org/katunold/turing-api.svg?branch=ft-sign-up-168479110)](https://travis-ci.org/katunold/turing-api) [![Maintainability](https://api.codeclimate.com/v1/badges/736adb5529a297046571/maintainability)](https://codeclimate.com/github/katunold/turing-api/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/736adb5529a297046571/test_coverage)](https://codeclimate.com/github/katunold/turing-api/test_coverage)  
## Description
- e-Shopping-Mall-api is an e-commerce platform for online shopping

## Getting started
[Link](https://turing-api-challenge.herokuapp.com/docs/) to working demo hosted on heroku

### Prerequisites

In order to install and run this project locally, you would need to have the following installed on you local machine.

* [**Node JS**](https://nodejs.org/en/)
* [**Express**](https://expressjs.com/)
* [**MySQL**](https://www.mysql.com/downloads/)

### Installation

* Clone this repository

* Navigate to the project directory

* Run `npm install` or `yarn` to instal the projects dependencies
* create a `.env` file and copy the contents of the `.env.sample` file into it and supply the values for each variable

```sh
cp .env.sample .env
```
* Create a MySQL database and run the `sql` file in the database directory to migrate the database

```sh
mysql -u <dbuser> -D <databasename> -p < ./src/database/database.sql
```

* Run `npm run dev` to start the app in development

## Docker

* Build image

`docker build -t node_challenge .`

* Run container
`docker run --rm -p 8000:80 node_challenge`
