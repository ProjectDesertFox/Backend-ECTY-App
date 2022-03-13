# API ECTY Documentation

## Login & Register
---

---
### LOGIN
---

* URL

    /login

* Method :

    POST

* Data Input :
    ```
    email       : req.body.email
    password    : req.body.password
    ```

* Success
    * Code : 200 OK
    * Content :
    ```
        {
            "success": true,
            "message": "login berhasil",
            "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJmaWZpdCIsImlhdCI6MTY0Njg4ODQzNH0.XTasuPqPpnAt1jfJCv0Vcl8_caxgbjsf0ujvjSqRK1A"
        }
    ```
* Error Response :
    * Code : 401 Unauthorize
    * Content :
    ```
        {
            "success": false,
            "message": "Invalid email/password!"
        }
    ```
     * Code : 500
     * Content :
    ```
        {
            "success": false,
            "error": "Internal Server Error"
        }
    ```
---
### SEND VERIFICATION 4 DIGIT TO EMAIL
---


* URL

    /verification/email

* Method :

    POST

* Data Input :
    ```
    UserEmail       : req.body.UserEmail
    ```
* Success
    * Code : 201 Created
    * Content :
    ```
        {
            "success": true,
            "message": "Success Sent Verification code to bayuindr2207@gmail.com, kindly check your email!!",
            "data": {
                "validEmail": "false",
                "validPhoneNumber": "false",
                "validKTP": "false",
                "statusValidEmail": "2",
                "statusValidPhoneNumber": "2",
                "id": 3,
                "UserEmail": "bayuindr2207@gmail.com",
                "UniqueNumberVerificationEmail": "3352",
                "updatedAt": "2022-03-10T12:19:20.539Z",
                "createdAt": "2022-03-10T12:19:20.539Z",
                "UserId": null
            }
        }
    ```
* Error Response :
    * Code : 400 Bad Request
    * Content :
    ```
        {
            "success": false,
            "message": [
                "UserEmail must be unique"
            ]
        }
    ```
     * Code : 500
     * Content :
    ```
        {
            "success": false,
            "error": "Internal Server Error"
        }
    ```
---
### CHECK 4 DIGIT NUMBER INPUT
---

* URL

    /verification/email-verification

* Method :

    PATCH

* Data Input :
    ```
    UserEmail       : req.body.UserEmail
    UniqueNumberVerificationEmail : req.body.UniqueNumberVerificationEmail
    ```
* Success
    * Code : 200 OK
    * Content :
    ```
        {
            "message": "Email verification succes"
        }
    ```
* Error Response :
    * Code : 400 Bad Request
    * Content :
    ```
        BELUM 
    ```
     * Code : 500
     * Content :
    ```
        {
            "success": false,
            "error": "Internal Server Error"
        }
    ```
---
### REGISTER
---


* URL

    /register

* Method :

    POST

* Data Input :
    ```
    username       : req.body.username
    email          : req.body.email
    password       : req.body.password
    ```
* Success
    * Code : 201 Created
    * Content :
    ```
        {
           "user": {
                "id": 1,
                "username": "bayu",
                "email": "bayuindr2207@gmail.com",
                "password": "$2a$10$h3A1U0r5YRo6VHDWxec8qeuH.7kW4dwlM.CnILvz18f2XEfS0acF2",
                "planStatus": "Basic",
                "EctyId": "72911665",
                "updatedAt": "2022-03-10T12:22:08.401Z",
                "createdAt": "2022-03-10T12:22:08.401Z",
                "phoneNumber": null,
                "ktp": null
            },
            "userVerify": [
                1
            ]
        }
    ```
* Error Response :
    * Code : 400 Bad Request
    * Content :
    ```
        {
            "success": false,
            "message": [
                "Username is Required"
            ]
        }
    ```
    * Code : 400 Bad Request
    * Content :
    ```
        {
            "success": false,
            "message": [
                "email must be unique"
            ]
        }
    ```
    * Code : 400 Bad Request
    * Content :
    ```
        {
            "success": false,
            "message": [
                "Username is Required",
                "Format Email is not Valid",
                "Email is Required",
                "Password is Required",
                "Password Characters minimun is 5"
            ]
        }
    ```
    * Code : 400 Bad Request
    * Content :
    ```
        {
            "success": false,
            "message": [
                "User.email cannot be null"
            ]
        }
    ```
    * Code : 400 Bad Request
    * Content :
    ```
        {
            "success": false,
            "message": [
                "Format Email is not Valid"
            ]
        }
    ```
    * Code : 400 Bad Request
    * Content :
    ```
        {
            "success": false,
            "message": [
                "User.password cannot be null"
            ]
        }
    ```
    * Code : 400 Bad Request
    * Content :
    ```
        {
            "success": false,
            "message": [
                "Password Characters minimun is 5"
            ]
        }
    ```
     * Code : 500
     * Content :
    ```
        {
            "success": false,
            "error": "Internal Server Error"
        }
    ```
---
## USER
---

---
### GET ALL DATA USER
---
* URL

    /users

* Method :

    GET

* Header

    access_token : 'string token'

* Success
    * Code : 200
    * Content :
    ```
        [
            {
                "id": 1,
                "username": "bayu",
                "email": "bayuindr2207@gmail.com",
                "password": "$2a$10$h3A1U0r5YRo6VHDWxec8qeuH.7kW4dwlM.CnILvz18f2XEfS0acF2",
                "phoneNumber": null,
                "ktp": null,
                "EctyId": "72911665",
                "planStatus": "Basic",
                "createdAt": "2022-03-10T12:22:08.401Z",
                "updatedAt": "2022-03-10T12:22:08.401Z"
            }
        ]
    ```
* Error Response :
    * Code : 500
    * Content :
    ```
        {
            "success": false,
            "error": "Internal Server Error"
        }
    ```
---
### GET ONE DATA USER
---
* URL

    /users/:id

* Method:

    GET

* URL Params

    /:id

    Required:

        ```
        id = [integer]
        ```

* Success
    * Code : 200 OK
    * Content :
    ```
        {
            "id": 1,
            "username": "bayu",
            "email": "bayuindr2207@gmail.com",
            "password": "$2a$10$h3A1U0r5YRo6VHDWxec8qeuH.7kW4dwlM.CnILvz18f2XEfS0acF2",
            "phoneNumber": null,
            "ktp": null,
            "EctyId": "72911665",
            "planStatus": "Basic",
            "createdAt": "2022-03-10T12:22:08.401Z",
            "updatedAt": "2022-03-10T12:22:08.401Z"
        }
    ```
* Error Response :
    * Code : 404 Not Found
    * Content :
    ```
        {
            "message": "Data User with id 4 not found"
        }
    ```
     * Code : 500
     * Content :
    ```
        {
            "success": false,
            "error": "Internal Server Error"
        }
    ```
---
### DELETE USER
---

* URL

    /users/:id

* Method:

    DELETE

* Header

    access_token : 'string token'

* URL Params

    /:id

    Required:

        ```
        id = [integer]
        ```

* Success
    * Code : 200 OK
    * Content :
    ```
        {
            "message": "success delete data"
        }
    ```
* Error Response :
    * Code : 404 Not Found
    * Content :
    ```
        {
            "message":  `data with ${id} not found`
        }
    ```
     * Code : 500
     * Content :
    ```
        {
            "success": false,
            "error": "Internal Server Error"
        }
    ```
---
### GET DATA BOOKING
---
* URL

    /bookings

* Method :

    GET

* Header

    access_token : 'string token'

* Success
    * Code : 200
    * Content :
    ```
        {
            "bookings": [
                {
                    "id": 2,
                    "petName": "Muezza",
                    "schedule": "2022-01-27T16:00:00.000Z",
                    "IdCategory": 1,
                    "IdUser": 4,
                    "harga": 75000,
                    "imgUrl": "https://ik.imagekit.io/3iasie8twbl/2_hVYNPk2Ii.jpg",
                    "createdAt": "2022-01-20T00:29:28.922Z",
                    "updatedAt": "2022-01-20T00:29:28.922Z",
                    "User": {
                        "id": 4,
                        "email": "uqy@gmail.com",
                        "password": "$2a$10$lAtb3mUj6w3m.l8Yz9peIOPEud2VuXSNBts1RR4mePhGvZt2TkisS",
                        "name": "luqy",
                        "address": "Lombok Barat",
                        "noHp": "087747402499",
                        "createdAt": "2022-01-19T01:52:02.575Z",
                        "updatedAt": "2022-01-19T01:52:02.575Z"
                    },
                    "Category": {
                        "id": 1,
                        "name": "Grooming Standart",
                        "description": "Grooming bersih dengan shampo Khusus yang harum dan berkualitas",
                        "createdAt": "2022-01-18T13:17:30.256Z",
                        "updatedAt": "2022-01-18T13:17:30.256Z"
                    }
                }
            ]
        }
    ```
* Error Response :
    * Code : 404
    * Content :
    ```
        {
            "success": false,
            "error": "Invalid data!"
        }
    ```
    * Code : 500
    * Content :
    ```
        {
            "success": false,
            "error": "Internal Server Error"
        }
    ```

---
### GET ONE DATA Booking
---
* URL

    /bookings/:id

* Method:

    GET

* URL Params

    /:id

    Required:

        ```
        id = [integer]
        ```

* Success
    * Code : 200 OK
    * Content :
    ```
        {
            "booking": {
                "id": 2,
                "petName": "Muezza",
                "schedule": "2022-01-27T16:00:00.000Z",
                "IdCategory": 1,
                "IdUser": 4,
                "harga": 75000,
                "imgUrl": "https://ik.imagekit.io/3iasie8twbl/2_hVYNPk2Ii.jpg",
                "createdAt": "2022-01-20T00:29:28.922Z",
                "updatedAt": "2022-01-20T00:29:28.922Z",
                "User": {
                    "id": 4,
                    "email": "uqy@gmail.com",
                    "password": "$2a$10$lAtb3mUj6w3m.l8Yz9peIOPEud2VuXSNBts1RR4mePhGvZt2TkisS",
                    "name": "luqy",
                    "address": "Lombok Barat",
                    "noHp": "087747402499",
                    "createdAt": "2022-01-19T01:52:02.575Z",
                    "updatedAt": "2022-01-19T01:52:02.575Z"
                },
                "Category": {
                    "id": 1,
                    "name": "Grooming Standart",
                    "description": "Grooming bersih dengan shampo Khusus yang harum dan berkualitas",
                    "createdAt": "2022-01-18T13:17:30.256Z",
                    "updatedAt": "2022-01-18T13:17:30.256Z"
                }
            }
        }
    ```
* Error Response :
    * Code : 404 Not Found
    * Content :
    ```
        {
            "message": "Data Booking dengan id ${id} tidak ditemukan"
        }
    ```
     * Code : 500
     * Content :
    ```
        {
            "success": false,
            "error": "Internal Server Error"
        }
    ```
---
### ADD BOOKING
---


* URL

    /bookings/:idCategory

* URL Params

    /:idCategory

    Required:

        ```
        idCategory = [integer]
        ```
* Method :

    POST

* Header

    access_token : 'string token'

* Success
    * Code : 201
    * Content :
    ```
        {
            "booking": {
            "harga": 75000,
            "id": 6,
            "petName": "Cio",
            "schedule": "2022-01-28T13:30:58.073Z",
            "IdUser": 4,
            "IdCategory": 1,
            "imgUrl": "https://ik.imagekit.io/3iasie8twbl/2_8JGBEOUZe.jpg",
            "updatedAt": "2022-01-20T22:45:54.597Z",
            "createdAt": "2022-01-20T22:45:54.597Z"
    }
        }
    ```
* Error Response :
    * Code : 400 Bad Request
    * Content :
    ```
        {
           "success": false,
            "error": [
                "Booking.petName cannot be null",
                "Booking.schedule cannot be null"
            ]
        }
    ```
    * Code : 400 Bad Request
    * Content :
    ```
        {
           "success": false,
            "error": [
                "Pet Name Harus Diisi",
                "Schedule Grooming Harus Diisi"
            ]
        }
    ```
    * Code : 500
    * Content :
    ```
        {
            "success": false,
            "error": "Internal Server Error"
        }
    ```
---
### DELETE BOOKING
---


* URL

    /bookings/:id

* Method:

    DELETE

* Header

    access_token : 'string token'

* URL Params

    /:id

    Required:

        ```
        id = [integer]
        ```

* Success
    * Code : 200 OK
    * Content :
    ```
        {
            "message": "success delete data"
        }
    ```
* Error Response :
    * Code : 404 Not Found
    * Content :
    ```
        {
            "message":  `data with ${id} not found`
        }
    ```
     * Code : 500
     * Content :
    ```
        {
            "success": false,
            "error": "Internal Server Error"
        }
    ```
---
### GET ONE DATA Booking
---
* URL

    /bookings/:id/pdf-convert

    - axios ('https://api.pspdfkit.com/build')

* Method:

    GET 
    POST

* URL Params

    /:id

    Required:

        ```
        id = [integer]
        ```

* Success
    * Code : 200 OK
    * Content :
    ```
        {
            "booking": {
                "id": 2,
                "petName": "Muezza",
                "schedule": "2022-01-27T16:00:00.000Z",
                "IdCategory": 1,
                "IdUser": 4,
                "harga": 75000,
                "imgUrl": "https://ik.imagekit.io/3iasie8twbl/2_hVYNPk2Ii.jpg",
                "createdAt": "2022-01-20T00:29:28.922Z",
                "updatedAt": "2022-01-20T00:29:28.922Z",
                "User": {
                    "id": 4,
                    "email": "uqy@gmail.com",
                    "password": "$2a$10$lAtb3mUj6w3m.l8Yz9peIOPEud2VuXSNBts1RR4mePhGvZt2TkisS",
                    "name": "luqy",
                    "address": "Lombok Barat",
                    "noHp": "087747402499",
                    "createdAt": "2022-01-19T01:52:02.575Z",
                    "updatedAt": "2022-01-19T01:52:02.575Z"
                },
                "Category": {
                    "id": 1,
                    "name": "Grooming Standart",
                    "description": "Grooming bersih dengan shampo Khusus yang harum dan berkualitas",
                    "createdAt": "2022-01-18T13:17:30.256Z",
                    "updatedAt": "2022-01-18T13:17:30.256Z"
                }
            }
        }
    ```
    ```
    pdf file = 'D:/booking ${petName}.pdf'
    ```
* Error Response :
    * Code : 404 Not Found
    * Content :
    ```
        {
            "message": "Data Booking dengan id ${id} tidak ditemukan"
        }
    ```
     * Code : 500
     * Content :
    ```
        {
            "success": false,
            "error": "Internal Server Error"
        }
    ```
---
# API 
---

```
PSPDF KIT = https://pspdfkit.com/api/pdf-generator-api/
```
```
Nodemailer = https://nodemailer.com/about/
```
```
ImageKit = https://www.imagekit.io/official/website

```