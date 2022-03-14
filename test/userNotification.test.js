const request = require('supertest')
const app = require('../app.js')
const {sequelize} = require ('../models')
const {queryInterface} = sequelize
let jwt = require('jsonwebtoken')
const { encrypt } = require('../helper/bycrypt.js')

let access_token
let idUserNotif 

beforeAll((done)=>{
    //console.log('kepanggil gk=============');
    queryInterface.bulkDelete('Users', {}, null)
    .then(()=>{
        return queryInterface.bulkInsert("Users", [{
            id: 1,
            username: "fifit",
            email: "fifit.mocap@gmail.com",
            password: encrypt('12345'),
            EctyId:"45829348",
            planStatus:"Basic",
            createdAt: new Date(),
            updatedAt: new Date()
        }])
    })
    .then(()=>{
        return queryInterface.bulkDelete("UserNotifications", {}, null)
    })
    .then(() =>{
        access_token = jwt.sign({ id: 1, email: 'fifit.mocap@gmail.com' }, 'Rahasia')
        done()
    })
    .catch(err => done(err))
})

describe('POST /userNotification', function () {
    it('User Notification create success', function (done) {
        let input = {
            message : "Hai New User", 
            type : "Short", 
            DataId: 1,
        }
        request(app)
            .post("/userNotification")
            .send(input)
            .set('Accept', 'application/json')
            .set({ access_token: access_token })
            .then(response => {
                idUserNotif = response.body.notification.id
                console.log(response.body,'======================');
                const { body, status } = response
                expect(status).toBe(201)
                expect(body).toHaveProperty("message", "user notif created")
                done()
            })
            .catch(err => {
                // console.log(err,'err============');
                done(err)
            })
    })
})
describe('GET /userNotification', function () {
    it("get all data userNotification", function (done) {
        request(app)
            .get("/userNotification")
            .set("Accept", "application/json")
            .set({ access_token: access_token })
            .then((res) => {
                //idUser = res.body[0].id
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
describe('PATCH /userNotification/:id', function () {
    it('Update Status user notif success', function (done) {
        let input = {
            status: "Not Active",
        }
        request(app)
            .patch(`/userNotification/${idUserNotif}`)
            .send(input)
            .set('Accept', 'application/json')
            .set({ access_token: access_token })
            .then(response => {
                console.log(response.body, 'update+++++++berhasil');
                const { body, status } = response
                expect(status).toBe(201)
                expect(body).toHaveProperty("message", `update status success`)
                done()
            })
            .catch(err => {
                console.log(err, 'err============');
                done(err)
            })
    })
    it('Update Status User Notif id not found', function (done) {
        let input = {
            status: "Not Active",
        }
        request(app)
            .put(`/userNotification/100`)
            .send(input)
            .set('Accept', 'application/json')
            .set({ access_token: access_token })
            .then(response => {
                // console.log(response.body,'check+++++++++');
                console.log(response.body, 'update+++++++gagal');
                const { body, status } = response
                expect(status).toBe(404)
                expect(body).toHaveProperty("message", `Notification with id 100 not found`)
                done()
            })
            .catch(err => {
                // console.log(err,'err============');
                done(err)
            })
    })
})
describe('DELETE /userNotification/:id', function () {
    it("Delete user notification", function (done) {
        request(app)
            .delete(`/userNotification/${idUserNotif}`)
            .set("Accept", "application/json")
            .set({ access_token: access_token })
            .then((res) => {
                console.log(res.body, 'user delete +======');
                const { status, body } = res;
                expect(status).toBe(200);
                expect(body).toHaveProperty("message", `Notification with id ${idUserNotif} deleted`)
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
    it("Delete user notif id not found", function (done) {
        request(app)
            .delete("/userNotification/200")
            .set("Accept", "application/json")
            .set({ access_token: access_token })
            .then((res) => {
                console.log(res.body, 'user delete +======');
                const { status, body } = res;
                expect(status).toBe(404);
                expect(body).toHaveProperty("message", "Notification with id 200 not found")
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