# api-server
## [PR](https://github.com/Laith-Vlad/api-server/pull/5)
## [deployed link](https://apiserver-5ulg.onrender.com/food)
## [Actions](https://github.com/Laith-Vlad/api-server/actions)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Project Description

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
    Saleh
    What was your key takeaway?
    testing should be done with thoughtfulness and colabiration makes things easier 
    Share the link to your PR request.
    https://github.com/saleh2001k/api-server/pull/5
    Share the link to their PR request.
    https://github.com/Laith-Vlad/api-server/pull/6/
