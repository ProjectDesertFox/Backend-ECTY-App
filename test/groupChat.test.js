const request = require('supertest')
const app = require('../app.js')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
let jwt = require('jsonwebtoken')
const { encrypt } = require('../helper/bycrypt.js')

let access_token
let idGroupChat

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
            access_token = jwt.sign({ id: 1, email: 'fifit.mocap@gmail.com' }, 'Rahasia')
            done()
        })
        .catch(err => {
            console.log(err, 'BeforeAlll+++++++++++++');
            done(err)
        })
})
describe('POST /groupChat', function () {
    it('Create Group Chat Success', function (done) {
        let input = {
            name: "Bali Trip 16",
            ItineraryId: 1,
        }
        request(app)
            .post("/groupChat")
            .send(input)
            .set('Accept', 'application/json')
            .set({ access_token: access_token })
            .then(response => {
                //idItineraryPlace = response.body.itineraryPlace.id
                console.log(response.body,'======================');
                const { body, status } = response
                expect(status).toBe(201)
                expect(body).toHaveProperty("message", "Success to make Group Chat")
                done()
            })
            .catch(err => {
                // console.log(err,'err============');
                done(err)
            })
    })
})
describe('GET /groupChat', function () {
    
})
describe('PUT /groupChat', function () {
    
})
describe('DELETE /groupChat', function () {
    
})