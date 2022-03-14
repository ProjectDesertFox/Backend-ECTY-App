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
### UPDATE USER
---

* URL

    /users/:id

* Method:

    PATCH

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
            "message": "User with id 1 Updated"
        }
    ```
* Error Response :
    * Code : 404 Not Found
    * Content :
    ```
        {
            "message": "User with id 7 not found"
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
## FRIEND LIST
---

---
### ADD FRIEND
---
* URL

    /friendList/:ectyId

* Method :

    POST

* URL Params

    /:ectyId

    Required:

        ```
        ectyId = random [integer]
        ```

* Header

    access_token : 'string token'

* Success
    * Code : 201
    * Content :
    ```
        {
            "id": 2,
            "UserId": 1,
            "FriendId": "849594810",
            "updatedAt": "2022-03-14T02:56:38.209Z",
            "createdAt": "2022-03-14T02:56:38.209Z"
        }
    ```
* Error Response :
    * Code : 404
    * Content : Not Found
    ```
        {
            "success": false,
            "message": "Friend Id is not found"
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
### GET ALL DATA FRIEND
---
* URL

    /friendList

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
                "UserId": 1,
                "FriendId": "849594810",
                "createdAt": "2022-03-14T02:54:58.118Z",
                "updatedAt": "2022-03-14T02:54:58.118Z",
                "User": {
                    "id": 1,
                    "username": "fifit1407",
                    "email": "fifit.mocap@gmail.com",
                    "password": "$2a$10$tzpcVylFxVeGczM80IIU2u7.x.psWxVNxV3viaJ5wFd0N0efqBpC6",
                    "phoneNumber": null,
                    "ktp": null,
                    "EctyId": "85558488",
                    "planStatus": "Basic",
                    "createdAt": "2022-03-14T02:13:01.651Z",
                    "updatedAt": "2022-03-14T02:39:29.081Z"
                }
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
### DELETE FRIEND
---

* URL

    /friendList/:id

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
            "message": "Friend with id 2 delete success"
        }
    ```
* Error Response :
    * Code : 404 Not Found
    * Content :
    ```
        {
            "success": false,
            "message": "Friend with id ${id} not found"`
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
## ITINERARY
---

---
### ADD ITINERARY
---
* URL

    /itinerary

* Method :

    POST

* Header

    access_token : 'string token'

* Success
    * Code : 201
    * Content :
    ```
        {
            "message": "Succes create Itinerary",
            "Itineraries": {

            }
        }
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