const request = require('supertest')
const app = require('../app.js')
const {sequelize} = require ('../models')
const {queryInterface} = sequelize

let uniqueNumber
let access_token
let idUser

beforeAll((done)=>{
    console.log('kepanggil gk=============');
    queryInterface.bulkDelete('UserVerifications', null, {})
    .then(()=>{
        return queryInterface.bulkDelete('Users', {}, null)
    })
    .then(() =>{
        done()
    })
    .catch(err => done(err))
})

describe('POST /verification/email', function () {
    it('success to send 4 digit to email', function (done) {
        let input = {
            UserEmail: "fifit.mocap@gmail.com"
        }
        request(app)
            .post("/verification/email")
            .send(input)
            .set('Accept', 'application/json')
            .then(response => {
                uniqueNumber = response.body.data.UniqueNumberVerificationEmail
                console.log(response.body.data.UniqueNumberVerificationEmail,'verif----------');
                const { body, status } = response
                expect(status).toBe(201)
                expect(body.message).toEqual("Success Sent Verification code to fifit.mocap@gmail.com, kindly check your email!!")
                done()
            })
            .catch(err => done(err))
    })
    it('unique email', function (done) {
        let input = {
            UserEmail: "fifit.mocap@gmail.com",
        }
        request(app)
            .post("/verification/email")
            .send(input)
            .set('Accept', 'application/json')
            .then(response => {
                console.log(response.body,'unique++++++++++');
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty("success", false)
                expect(body.message).toContain("UserEmail must be unique")
                done()
            })
            .catch(err => done(err))
    })

})
describe('PATCH /verification/email-verification', function () {
    it('check 4 digit success', function (done) {
        let input = {
            UserEmail: "fifit.mocap@gmail.com",
            UniqueNumberVerificationEmail : uniqueNumber
        }
        request(app)
            .patch("/verification/email-verification")
            .send(input)
            .set('Accept', 'application/json')
            .then(response => {
                console.log(response.body,'check+++++++++');
                const { body, status } = response
                expect(status).toBe(201)
                expect(body).toHaveProperty("message", `Email verification succes`)
                done()
            })
            .catch(err => done(err))
    })

})
describe('POST /register', function () {
    it('Register Success', function (done) {
        let input = {
            username: "fifit",
            email: "fifit.mocap@gmail.com",
            password: "12345",
        }
        request(app)
            .post("/register")
            .send(input)
            .set('Accept', 'application/json')
            .then(response => {
                const { body, status } = response
                expect(status).toBe(201)
                expect(body).toHaveProperty("message", "Register Success")
                done()
            })
            .catch(err => done(err))
    })
    it('Email is null', function (done) {
        let input = {
            username: "fifit",
           // email: "fifit.mocap@gmail.com",
            password: "12345",
        }
        request(app)
            .post("/register")
            .send(input)
            .set('Accept', 'application/json')
            .then(response => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty("success", false)
                expect(body.message).toContain("User.email cannot be null")
                done()
            })
            .catch(err => done(err))
    })
    it('Password is null', function (done) {
        let input = {
            username: "fifit",
            email: "fifit.mocap@gmail.com",
            //password: "12345",
        }
        request(app)
            .post("/register")
            .send(input)
            .set('Accept', 'application/json')
            .then(response => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty("success", false)
                expect(body.message).toContain("User.password cannot be null")
                done()
            })
            .catch(err => done(err))
    })
    it('Email is empty string', function (done) {
        let input = {
            username: "fifit",
            email: "",
            password: "12345",
        }
        request(app)
            .post("/register")
            .send(input)
            .set('Accept', 'application/json')
            .then(response => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty("success", false)
                expect(body.message).toContain("Email is Required")
                done()
            })
            .catch(err => done(err))
    })
    it('Password is empty string and less from 5 character', function (done) {
        let input = {
            username: "fifit",
            email: "fifit.mocap@gmail.com",
            password: "",
        }
        request(app)
            .post("/register")
            .send(input)
            .set('Accept', 'application/json')
            .then(response => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty("success", false)
                expect(body.message).toContain("Password is Required")
                expect(body.message).toContain("Password Characters minimun is 5")
                done()
            })
            .catch(err => done(err))
    })
    it('Format email not valid', function (done) {
        let input = {
            username: "fifit",
            email: "fifit.mocap@gmail",
            password: "12345",
        }
        request(app)
            .post("/register")
            .send(input)
            .set('Accept', 'application/json')
            .then(response => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty("success", false)
                expect(body.message).toContain("Format Email is not Valid")
                done()
            })
            .catch(err => done(err))
    })
    it('Unique email', function (done) {
        let input = {
            username: "fifit14",
            email: "fifit.mocap@gmail.com",
            password: "12345"
        }
        request(app)
            .post("/register")
            .send(input)
            .set('Accept', 'application/json')
            .then(response => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty("success", false)
                expect(body.message).toContain("email must be unique")
                done()
            })
            .catch(err => done(err))
    })
})
describe('POST /login', function () {
    it('login success', function (done) {
        let login = {
            email: "fifit.mocap@gmail.com",
            password: "12345"
        }
        request(app)
            .post("/login")
            .send(login)
            .set('Accept', 'application/json')
            .then(response => {
                console.log(response.body,'logiiiinnn+++++++++++++++++');
                access_token = response.body.access_token
                const { body, status } = response
                expect(status).toBe(200)
                expect(body).toHaveProperty("success", true)
                expect(body).toHaveProperty("access_token", expect.any(String))
                done()
            })
            .catch(err => done(err))
    })
    it('wrong password', function (done) {
        let login = {
            email: "fifit.mocap@gmail.com",
            password: "123456"
        }
        request(app)
            .post("/login")
            .send(login)
            .set('Accept', 'application/json')
            .then(response => {
                const { body, status } = response
                expect(status).toBe(401)
                expect(body).toHaveProperty("success", false)
                expect(body).toHaveProperty("message", "Invalid email/password!")
                done()
            })
            .catch(err => done(err))
    })
    it('wrong email', function (done) {
        let login = {
            email: "fifit.m@gmail.com",
            password: "12345"
        }
        request(app)
            .post("/login")
            .send(login)
            .set('Accept', 'application/json')
            .then(response => {
                const { body, status } = response
                expect(status).toBe(401)
                expect(body).toHaveProperty("success", false)
                expect(body).toHaveProperty("message", "Invalid email/password!")
                done()
            })
            .catch(err => done(err))
    })
})
describe('PATCH /verification/ktp', function () {

})
describe('GET /users', function () {
    it("get all data user", function (done) {
        request(app)
            .get("/users")
            .set("Accept", "application/json")
            .set({ access_token: access_token })
            .then((res) => {
                idUser = res.body[0].id
                const { status, body } = res;
                console.log(res.body, 'user===========');
                expect(status).toBe(200); 
                expect(body.length).toBe(1)
                done();
            })
            .catch((err) => {
                //console.log(err);
                done(err)
            }
            );
    });
})
describe('GET /users/:id', function () {
    it("Succes get one data user", function (done) {
        request(app)
            .get(`/users/${idUser}`)
            .set("Accept", "application/json")
            .set({ access_token: access_token })
            .then((res) => {
                console.log(res.body, 'user one +======');
                const { status, body } = res;
                expect(status).toBe(200);
                //expect body. name ===
                //expect(body.transportation.name === "Fortuner").toBe(true)
                done();
            })
            .catch((err) => {
                //console.log(err);
                done(err)
            }
            );
    });
    it("wrong id params", function (done) {
        request(app)
            .get("/users/4")
            .set("Accept", "application/json")
            .set({ access_token: access_token })
            .then((res) => {
                const { status, body } = res;
                console.log(res.body, 'id wrong ++++++++++++');
                expect(status).toBe(404);
                //respo kalau ada
                expect(body).toHaveProperty("message", 'Data User with id 4 not found')
                done();
            })
            .catch((err) => {
                console.log(err);
                done(err)
            }
            );
    });
})
describe('PATCH /users/:id', function () {

})
describe('DELETE /users/:id', function () {
    it("Delete User", function (done) {
        request(app)
            .delete(`/users/${idUser}`)
            .set("Accept", "application/json")
            .set({ access_token: access_token })
            .then((res) => {
                console.log(res.body, 'user one +======');
                const { status, body } = res;
                expect(status).toBe(200);
                expect(body).toHaveProperty("message", "success delete data")
                //expect body. name ===
                //expect(body.transportation.name === "Fortuner").toBe(true)
                done();
            })
            .catch((err) => {
                //console.log(err);
                done(err)
            }
            );
    });
})