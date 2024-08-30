# Sho-P API

This project is a Rest API for an e-commerce, this API is used by the [Sho-P Web](https://github.com/PaconcioDev/Sho-P), a front end project that i made with ReactJs.

The **Sho-P API** counts with multiple endpoints to manage information about **products**, **categories**, **users**, **orders** and even **images**. This API was made with technologies that each fulfill a different function that helps the project to work.
### Tech Stack

#### Development dependencies

- [Nodemon](https://nodemon.io) 

#### Production dependencies
- [Node](https://nodejs.org/en)
- [Express](https://expressjs.com)
- [Zod](https://zod.dev)
- [Bcrypt](https://www.npmjs.com/package/bcrypt) 
- [JSONwebToken](https://www.npmjs.com/package/jsonwebtoken)
- [Cors](https://www.npmjs.com/package/cors) 
- [Nodemailer](https://nodemailer.com)
- [Cron](https://www.npmjs.com/package/cron)
- [Cloudinary](https://cloudinary.com/documentation/node_image_and_video_upload)
- [Multer](https://www.npmjs.com/package/multer)
- [Mysql2](https://www.npmjs.com/package/mysql2)

# API Documentation

## Content
  1. [Products](#products)
  2. [Categories](#categories)
  3. [Users](#users)
  4. [Authentication](#authentication)
  5. [Orders](#orders)
  6. [Images](#images)

### Products
#### Product Schema

| Key           | Value    | Description                       |
| :--------     | :------- | :-------------------------------- |
| `id`          | `string` | The unique identifier of the product. |
| `name`        | `string` | The name of the product.|
| `description` | `string` | A brief description of the product. |
| `price`       | `number` | The price of the product. |
| `image`       | `string` | The URL of the product image. |
| `category`    | `object` | An object containing the category details with attributes id and name. |

#### Get all products

```
  GET /api/products
```

**Response:**

```json
[
    {
        "id": "038c99e3-283f-11ef-a822-0242ac110002",
        "name": "Handcrafted Steel Mouse",
        "description": "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
        "price": 972,
        "image": "http://res.cloudinary.com/dmid4x7f7/image/upload/v1721085543/1.png",
        "category": {
            "id": 4,
            "name": "Toys"
        }
    },
    {
        "id": "0969ffc4-2840-11ef-a822-0242ac110002",
        "name": "Handmade Metal Bike",
        "description": "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
        "price": 725,
        "image": "http://res.cloudinary.com/dmid4x7f7/image/upload/v1720037212/2.jpg",
        "category": {
            "id": 2,
            "name": "Electronics"
        }
    },
    // ...
]
```

#### Get one product

```
  GET /api/products/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of product to fetch |

**Response:**
```json
{
    "id": "038c99e3-283f-11ef-a822-0242ac110002",
    "name": "Handcrafted Steel Mouse",
    "description": "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
    "price": 972,
    "image": "http://res.cloudinary.com/dmid4x7f7/image/upload/v1721085543/zr4mob2shxcridsdk1fw.png",
    "category": {
        "id": 4,
        "name": "Toys"
    }
}
```

#### Post a product

```
  POST /api/products
```

**Headers**
| Type       | Value    | 
| :--------       | :------- | 
| `Content-Type`  | `application/json` | 
| `Authorization` | `Bearer Token (with admin privileges)` | 

**Body**
| Key           | Value    | Description                       |
| :--------     | :------- | :-------------------------------- |
| `name`        | `string` | **Required.** The name of the product.|
| `description` | `string` | **Required.** A brief description of the product. |
| `price`       | `number` | **Required.** The price of the product. |
| `image`       | `string` | **Required.** The URL of the product image. |
| `category_id` | `number` | **Required.** Id of the desired category |

**Request Body:**

```json
{
    "name": "Example 466",
    "description": "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800JThe Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    "price": 742,
    "image": "https://picsum.photos/seed/i1Kn9rzXh/640/480",
    "category_id": 4
}
```

**Response:**

```json
{
    "id": "8c745e70-64ca-11ef-bb07-0242ac110002",
    "name": "Example 466",
    "description": "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800JThe Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    "price": 742,
    "image": "https://picsum.photos/seed/i1Kn9rzXh/640/480",
    "category": {
        "id": 4,
        "name": "Toys"
    }
}
```

#### Patch a product

```
  PATCH /api/products/:id
```

**Parameters**
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to update |

**Headers**
| Type       | Value    | 
| :--------       | :------- | 
| `Content-Type`  | `application/json` | 
| `Authorization` | `Bearer Token (with admin privileges)` | 

**Body**
| Key           | Value    | Description                       |
| :--------     | :------- | :-------------------------------- |
| `name`        | `string` | **Optional.** The name of the product.|
| `description` | `string` | **Optional.** A brief description of the product. |
| `price`       | `number` | **Optional.** The price of the product. |
| `image`       | `string` | **Optional.** The URL of the product image. |
| `category_id` | `number` | **Optional.** Id of the desired category |

**Request Body:**

```json
{
  "name": "Product to delete 4532222",
  "category_id": 2,
  "price": 6676,
  "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras arcu magna, interdum fermentum tincidunt quis, tempus eget ex. Maecenas finibus, nunc vel ultrices auctor, lectus metus convallis elit, vitae egestas nunc mi vitae turpis. Nulla nec velit in quam mollis ullamcorper non vitae orci. Maecenas facilisis mauris et posuere auctor."
}
```

**Response:**

```json
{
  "id": "8c745e70-64ca-11ef-bb07-0242ac110002",
  "name": "Product to delete 4532222",
  "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras arcu magna, interdum fermentum tincidunt quis, tempus eget ex. Maecenas finibus, nunc vel ultrices auctor, lectus metus convallis elit, vitae egestas nunc mi vitae turpis. Nulla nec velit in quam mollis ullamcorper non vitae orci. Maecenas facilisis mauris et posuere auctor.",
  "price": 6676,
  "image": "https://picsum.photos/seed/i1Kn9rzXh/640/480",
  "category": {
    "id": 2,
    "name": "Electronics"
  }
}
```

#### Delete a product

This endpoint does not actually delete the product, it changes the deleted_at property of the product from null to the date and time the product was deleted.

```
  PATCH /api/products/delete/:id
```

**Parameters**

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to delete |

**Headers**

| Type       | Value    | 
| :--------       | :------- | 
| `Authorization` | `Bearer Token (with admin privileges)` | 

**Response:**

```json
{
  "message": "Product with ID:8c745e70-64ca-11ef-bb07-0242ac110002 deleted successfully"
}
```

### Categories

#### Get all categories

```
  GET /api/categories
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Electronics"
  },
  {
    "id": 2,
    "name": "Toys"
  },
  // ... (other categories)
]
```

#### Get one category

```
  GET /api/categories/:id
```

**Parameters**
| Parameter | Type | Description |
|---|---|---|
| `id` | `string` | **Required.** The unique identifier of the category to retrieve. |

**Response:**
```json
{
  "id": 1,
  "name": "Electronics"
}
```

#### Get products from a category

```
  GET /api/categories/:id/products
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `id` | `string` | **Required.** The unique identifier of the category to retrieve products from. |

**Response:**

```json
[
  {
    "id": "038c99e3-283f-11ef-a822-0242ac110002",
    "name": "Handcrafted Steel Mouse",
    "description": "...",
    "price": 972,
    "image": "...",
    "category": {
      "id": 1,
      "name": "Electronics"
    }
  },
  // ... (other products in the category)
]
```

#### Post a category
```
  POST /api/categories
```

**Headers**
| Header | Description |
|---|---|
| `Content-Type` | `application/json` |
| `Authorization` | `Bearer Token (with admin privileges)` |

**Body:**
| Key | Value | Description |
|---|---|---|
| `name `| `string` | **Required.** The name of the new category. |

**Response:**

```json
{
  "id": 10,  // The newly created category's ID
  "name": "Example Category"
}
```

#### Patch a category

```
  PATCH /api/categories/:id
```
**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `id` | `string` | **Required.** The unique identifier of the category to update. |

**Headers**

| Header | Description |
|---|---|
| `Content-Type` | `application/json` |
| `Authorization` | `Bearer Token (with admin privileges)` |

**Body:**

| Key | Value | Description |
|---|---|---|
| name | string | **Required.** The updated name of the category. |

**Response:**

```json
{
  "id": 10,
  "name": "Updated Category Name"
}
```

#### Delete a category

```
  PATCH /api/categories/:id
```
This endpoint does not actually delete the product, it changes the deleted_at property of the product from null to the date and time the product was deleted. If the category has associated products it will not be deleted.

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `id` | `string` | **Required.** The unique identifier of the category to delete. |

**Headers**

| Header | Description |
|---|---|
| `Authorization` | `Bearer Token (with admin privileges)` |

**Response:**
```json
  {
    "message": "Category deleted successfully"
  }
```

### Users
#### User Schema

| Key           | Value    | Description                       |
| :--------     | :------- | :-------------------------------- |
| `id`          | `string` | The unique identifier of the user. |
| `name`        | `string` | The first name of the user.|
| `lastName` | `string` | Last name of the user. |
| `role`       | `string` | Role the user has on its account. |
| `email`       | `string` | The Email that the user has registered. |
| `phone`    | `number` | **Optional.** Phone number of the user. |

#### Get all user

```
  GET /api/users
```

**Response:**
```json
[
  {
    "id": "99c939f8-22e0-11ef-adae-0242ac110002",
    "role": "admin",  
    "name": "Francisco",
    "lastName": "Gomez",  
    "email": "s@gmail.com",
    "phone": ""  // Optional
  },
  {
    "id": "...",
    "role": "...",
    "name": "...",
    "lastName": "...",
    "email": "...",
    "phone": "..."
  },
  // ... (other users)
]
```

#### Get an user

```
  GET /api/users/:id
```
**Parameters**
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user to fetch |

**Response:**
```json
{
  "id": "99c939f8-22e0-11ef-adae-0242ac110002",
  "role": "admin",
  "name": "Francisco",
  "lastName": "Gomez",
  "email": "s@gmail.com",
  "phone": ""
}
```

#### Post an user

```
  POST /api/users
```
**Headers**

| Header | Description |
|---|---|
| `Content-Type` | `application/json` |

**Body**
| Key           | Value    | Description                       |
| :--------     | :------- | :-------------------------------- |
| `role`        | `string` | **Required.** Role of the user.|
| `name` | `string` | **Required.** Users first name |
| `lastName`       | `string` | **Required.** Users last name |
| `email`       | `string` | **Required.** Email to register. |
| `password` | `string` | **Required.** User Password |
| `phone` | `number` | **Optional.** Phone number of the user. |

**Request Body:**

```json
{
  "role": "customer",
  "name": "Jhon",
  "lastName": "Doe",
  "email": "jhondoe@gmail.com",
  "password": "Examplepassword1"
}
```

**Response:**

```json
{
  "id": "350ea57d-666a-11ef-97cd-0242ac110002",
  "role": "customer",
  "name": "Jhon",
  "lastName": "Doe",
  "email": "jhondoe@gmail.com",
  "phone": ""
}
```

#### Patch an user

```
  PATCH /api/users/:id
```

**Parameters**
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user to patch. |

**Headers**

| Header | Description |
|---|---|
| `Content-Type` | `application/json` |
| `Authorization` | `Bearer Token ` |

**Body**
| Key           | Value    | Description                       |
| :--------     | :------- | :-------------------------------- |
| `name` | `string` | **Optional.** Users first name |
| `lastName`       | `string` | **Optional.** Users last name |
| `email`       | `string` | **Optional.** Email to register. |
| `phone` | `number` | **Optional.** Phone number of the user. |

**Request Body:**
```json
{
  "name": "Janne"
}
```

**Response:**
```json
{
  "id": "350ea57d-666a-11ef-97cd-0242ac110002",
  "role": "customer",
  "name": "Janne",
  "lastName": "Doe",
  "email": "jhondoe@gmail.com",
  "phone": ""
}
```

#### Delete an user

```
  DELETE /api/users/:id
```

**Parameters**
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user to delete. |

**Headers**

| Header | Description |
|---|---|
| `Content-Type` | `application/json` |
| `Authorization` | `Bearer Token ` |

**Body**
| Key           | Value    | Description                       |
| :--------     | :------- | :-------------------------------- |
| `password` | `string` | **Required.** User current password. |

**Body Request:**
```json
{
  "password": "Examplepassword1"
}
```

**Response:**
```json
{
  "message": "User successfully deleted"
}
```

### Authentication

#### Login

```
  POST /api/auth/login
```

**Headers**
| Header | Description |
|---|---|
| `Content-Type` | `application/json` |

**Body**
| Key           | Value    | Description                       |
| :--------     | :------- | :-------------------------------- |
| `email` | `string` | **Required.** User current email. |
| `password` | `string` | **Required.** User current password. |

**Request Body:**
```json
{
  "email": "jhondoe@gmail.com",
  "password": "Examplepassword1"
}
```

**Response:**
```json
{
  "id": "ea3bb663-6672-11ef-97cd-0242ac110002",
  "name": "Jhon",
  "email": "jhondoe@gmail.com",
  "role": "customer",
  "token": "eyJhbGciOiJIUzI1NiIsIn..."
}
```


#### Change password

```
  POST /api/auth/change-password/:id
```

**Parameters**
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user that is going to change his password. |

**Headers**

| Header | Description |
|---|---|
| `Content-Type` | `application/json` |
| `Authorization` | `Bearer Token ` |

**Body**
| Key           | Value    | Description                       |
| :--------     | :------- | :-------------------------------- |
| `currentPassword` | `string` | **Required.** User current password. |
| `password` | `string` | **Required.** User new password. |

**Request Body:**
```json
{
  "currentPassword": "Examplepassword1",
  "password": "Differentpassword2"
}
```

**Response:**
```json
{
  "message": "Password updated successfully"
}
```

#### Send Recover password Email

```
  POST /api/auth/recovery
```

**Headers**
| Header | Description |
|---|---|
| `Content-Type` | `application/json` |

**Body**
| Key           | Value    | Description                       |
| :--------     | :------- | :-------------------------------- |
| `email` | `string` | **Required.** Email that will recieve the recovery mail. |

**Request Body:**
```json
{
  "email": "jhondoe@gmail.com"
}
```

**Response:**
```json
{
  "message": "Email sent"
}
```

#### Check JWT

```
  POST /api/auth/check-token
```

**Headers**
| Header | Description |
|---|---|
| `Authorization` | `Bearer Token ` |

**Response:**
```json
{
  "message": "Token not expired",
  "value": false  //Because the methods name is TokenIsExpired
}
```

### Orders

#### Get all orders

```
  GET /api/orders
```

**Response**
```json
[
  {
    "id": "7f9794d8-4a2f-11ef-84fa-0242ac110002", // Order ID
    "userId": "99c939f8-22e0-11ef-adae-0242ac110002", // User ID
    "orderItems": [
      {
        "name": "Handcrafted Steel Mouse",
        "image": "...",
        "price": 972,
        "category": {
          "id": 4,
          "name": "Toys"
        },
        "quantity": 3,
        "productId": "038c99e3-283f-11ef-a822-0242ac110002",
        "description": "Andy shoes are designe..."
      },
      {
        "name": "Tasty Cotton Mouse",
        "image": "...",
        "price": 932,
        "category": {
          "id": 5,
          "name": "Others"
        },
        "quantity": 3,
        "productId": "255cb1c4-283f-11ef-a822-0242ac110002",
        "description": "Boston's most advanc..."
      }
    ],
    "date": "7/24/2024",
    "total": 5712
  },  
  // ... (other orders)
```

#### Get one user orders

```
  GET /api/orders/:userId
```

**Parameters**
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user. |

**Headers**
| Header | Description |
|---|---|
| `Authorization` | `Bearer Token ` |

**Response:**
```json
[
  {
    "id": "8a682660-4a31-11ef-84fa-0242ac110002",
    "userId": "99c939f8-22e0-11ef-adae-0242ac110002",
    "orderItems": [
      {
        "name": "Handcrafted Steel Mouse",
        "image": "http://res.cloudinary.com/dmid4x7f7/image/upload/v1721085543/zr4mob2shxcridsdk1fw.png",
        "price": 972,
        "category": {
          "id": 4,
          "name": "Toys"
        },
        "quantity": 1,
        "productId": "038c99e3-283f-11ef-a822-0242ac110002",
        "description": "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals"
      },
      {
        "name": "Handcrafted Cotton Chair",
        "image": "http://res.cloudinary.com/dmid4x7f7/image/upload/v1720037335/k8gweub7uzcyjecszhv4.jpg",
        "price": 648,
        "category": {
          "id": 2,
          "name": "Electronics"
        },
        "quantity": 2,
        "productId": "33fe37a2-283f-11ef-a822-0242ac110002",
        "description": "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016"
      }
    ],
    "date": "7/24/2024",
    "total": 2268
  },
  // ... (other ordes of that customer)
]
```

#### Get one order

```
  GET /api/orders/order/:id
```

**Parameters**
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of the order. |

**Response:**
```json
{
  "id": "8a682660-4a31-11ef-84fa-0242ac110002",
  "userId": "99c939f8-22e0-11ef-adae-0242ac110002",
  "orderItems": [
    {
      "name": "Handcrafted Steel Mouse",
      "image": "..",
      "price": 972,
      "category": {
        "id": 4,
        "name": "Toys"
      },
      "quantity": 1,
      "productId": "038c99e3-283f-11ef-a822-0242ac110002",
      "description": "Andy shoes are designed to..."
    },
    {
      "name": "Handcrafted Cotton Chair",
      "image": "...",
      "price": 648,
      "category": {
        "id": 2,
        "name": "Electronics"
      },
      "quantity": 2,
      "productId": "33fe37a2-283f-11ef-a822-0242ac110002",
      "description": "New ABC 13 9370, 13.3, 5..."
    }
  ],
  "date": "7/24/2024",
  "total": 2268
}
```

#### Post order

```
  POST /api/orders/:userId
```
**Parameters**
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user.         |

**Headers**
| Header | Description |
|---|---|
| `Content-Type` | `application/json` |
| `Authorization` | `Bearer Token ` |

**Body**
| Key           | Value    | Description                       |
| :--------     | :------- | :-------------------------------- |
| `orderItems` | `array` | **Required.** Array of products. |
| `total` | `string` | **Required.** Total price of the order. |


**Request Body:**
```json
{
  "orderItems": [
    {
      "id": "6ed70361-346a-416a-80c9-a84e6f154c60",
      "name": "Product to delete 4532222",
      "description": "I want to delete this product",
      "category": {"id": 2, "name": "Electronics"},
      "price": 6676,
      "image": "...",
      "quantity": 2
    },
    // ... (other products)
  ],
  "total": 1111111
}
```

**Response:**
```json
{
  "id": "e467ff14-6677-11ef-97cd-0242ac110002",
  "userId": "99c939f8-22e0-11ef-adae-0242ac110002",
  "orderItems": [
    {
      "name": "Product to delete 4532222",
      "image": "...",
      "price": 6676,
      "category": {
        "id": 2,
        "name": "Electronics"
      },
      "quantity": 2,
      "productId": "6ed70361-346a-416a-80c9-a84e6f154c60",
      "description": "I want to delete this product"
    },
    // ... (other products)
  ],
  "date": "8/29/2024",
  "total": 1111111
}
```
