# api-server

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Project Description

this project utilizes sequalize and express to create endpoint that you can use to implemet http requasts to food and cloths it connects to postgress database and manupilates data there.
## Installation Instructions
you need a .env file with port  and database url
you can use local host or the deployed link for testing and installing the project  
you will need pg express and sequalize dotenv supertest jest. 


## Usage Guide
you can add stuff using the body cause i used body parser regarding the food you shoud write it like that 
### Food
```json
{
  "name": "rice"
}
```
### Clothes 
```json
{
  "brand": "Nike",
  "size": "L",
  "color": "Black"
}

```


## API Documentation


### Food Resource

- **GET /food**: Retrieve a list of food records. [Visit API](https://apiserver-5ulg.onrender.com/food)
you can use the rest of it by adding a / and writing the id  while changing the method

### Clothes Resource

- **GET /clothes**: Retrieve a list of clothes records. [Visit API](https://apiserver-5ulg.onrender.com/clothes)
you can use the rest of it by adding a / and writing the id 
