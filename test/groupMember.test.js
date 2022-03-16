const request = require('supertest')
const app = require('../app.js')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
let jwt = require('jsonwebtoken')
const { encrypt } = require('../helper/bycrypt.js')

let access_token
let idGroupMember

beforeAll((done) => {
    //console.log('kepanggil gk=============');
    queryInterface.bulkDelete('Users', {}, null)
        .then(() => {
            return queryInterface.bulkInsert("Users", [{
                id: 1,
                username: "fifit",
                email: "fifit.mocap@gmail.com",
                password: encrypt('12345'),
                EctyId: "45829348",
                planStatus: "Basic",
                createdAt: new Date(),
                updatedAt: new Date()
            }])
        })
        .then(() => {
            return queryInterface.bulkDelete("Itineraries", {}, null)
        })
        .then(() => {
            return queryInterface.bulkInsert("Itineraries", [{
                id: 1,
                title: "Bali Trip",
                destination: "Bali",
                dateStart: "2022-03-16",
                dateEnd: "2022-03-19",
                rating: "5",
                budget: "500000",
                type: "Sharing Public",
                sharingMemberSlot: 2,
                UserId: 1,
                status: "Active",
                createdAt: new Date(),
                updatedAt: new Date()
            }])
        })
        .then(() => {
            return queryInterface.bulkDelete("GroupChats", {}, null)
        })
        .then(() => {
            return queryInterface.bulkInsert("GroupChats", [{
                id: 1,
                name : "Bali Trip 16",
                status: 'Active',
                ItineraryId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            }])
        })
        .then(() => {
            return queryInterface.bulkDelete("GroupMembers", {}, null)
        })
        .then(() => {
            access_token = jwt.sign({ id: 1, email: 'fifit.mocap@gmail.com' }, 'Rahasia')
            done()
        })
        .catch(err => {
            console.log(err, 'BeforeAlll+++++++++++++');
            done(err)
        })
})

describe('POST /groupMember/:groupChatId', function () {
    it('Create Group member Success', function (done) {
        request(app)
            .post("/groupMember/1")
            //.send(input)
            .set('Accept', 'application/json')
            .set({ access_token: access_token })
            .then(response => {
                idGroupMember = response.body.groupMember.id
                console.log(response.body,'======================');
                const { body, status } = response
                expect(status).toBe(201)
                expect(body).toHaveProperty("message", "Success to make Group Member")
                done()
            })
            .catch(err => {
                console.log(err,'err============');
                done(err)
            })
    })
})

describe('GET /groupMember/:groupChat', function () {
    it("Success get one data Group member", function (done) {
        request(app)
            .get(`/groupMember/${idGroupMember}`)
            .set("Accept", "application/json")
            .set({ access_token: access_token })
            .then((res) => {
                //console.log(res.body, 'user one +======');
                const { status, body } = res;
                expect(status).toBe(200);
                //expect(body).toHaveProperty("message", `Item with id ${idItinerary} Updated`)
                done();
            })
            .catch((err) => {
                //console.log(err);
                done(err)
            }
            );
    });
})

describe('DELETE /groupMember', function () {
    it("Delete Group member", function (done) {
        request(app)
            .delete(`/groupMember/${idGroupMember}`)
            .set("Accept", "application/json")
            .set({ access_token: access_token })
            .then((res) => {
                //console.log(res.body, 'user delete +======');
                const { status, body } = res;
                expect(status).toBe(200);
                expect(body).toHaveProperty("message", `Group member with id ${idGroupMember} deleted`)
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
    it("Delete Group Member id not found", function (done) {
        request(app)
            .delete("/groupMember/200")
            .set("Accept", "application/json")
            .set({ access_token: access_token })
            .then((res) => {
                //console.log(res.body, 'user delete +======');
                const { status, body } = res;
                expect(status).toBe(404);
                expect(body).toHaveProperty("message", "Group member with id 200 not found")
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