# api-server
## [PR](https://apiserver-5ulg.onrender.com/food)
## [deployed link](https://apiserver-5ulg.onrender.com/food)
## [Actions](https://apiserver-5ulg.onrender.com/food)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Project Description

this project utilizes sequalize and express to create endpoint that you can use to implemet http requasts to food and recipes it connects to postgress database and manupilates data there.
## Installation Instructions
you can just use npm i  to get all dependencies
you need a .env file with port  and database url
you can use local host or the deployed link for testing and installing the project  
you will need pg express and sequalize dotenv supertest jest. 
 the test cases are all working properly



## Usage Guide
you can add stuff using the body cause i used body parser regarding the food you shoud write it like that 
### Food
```json
{
  "name": "rice"
}
```
### recipes
```json

   {"title": "Chocolate Cake",
      "description": "A delicious chocolate cake recipe",
      "foodId": 30
    }

```


## API Documentation


### Food Resource

- **GET /food**: Retrieve a list of food records. [Visit API](https://apiserver-5ulg.onrender.com/food)
you can use the rest of it by adding a / and writing the id  while changing the method

### recipes Resource

- **GET /recipes**: Retrieve a list of clothes records. [Visit API](https://apiserver-5ulg.onrender.com/foods)
you can use the rest of it by adding a / and writing the id 



 ## doc
    Who was your partner?
    What was your key takeaway?
    Share the link to your PR request.
    Share the link to their PR request.
