
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

**Example Response:**

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
  GET /api/products/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

**Example:**
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

### Categories
### Users
### Authentication
### Orders
### Images
