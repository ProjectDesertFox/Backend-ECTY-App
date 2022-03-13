const request = require('supertest')
const app = require('../app.js')
const {sequelize} = require ('../models')
const {queryInterface} = sequelize
let jwt = require('jsonwebtoken')
const { encrypt } = require('../helper/bycrypt.js')

let access_token
let idItineraryPlace

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
        return queryInterface.bulkDelete("Itineraries", {}, null)
    })
    .then(()=>{
        return queryInterface.bulkInsert("Itineraries", [{
            id:1,
            title : "Bali Trip",
            destination : "Bali",
            dateStart : "2022-03-16",
            dateEnd : "2022-03-19",
            rating : "5",
            budget : "500000",
            type: "Sharing Public",
            sharingMemberSlot: 2,
            UserId : "1",
        }])
    })
    .then(()=>{
        return queryInterface.bulkDelete("ItineraryPlaces", {}, null)
    })
    .then(() =>{
        access_token = jwt.sign({ id: 1, email: 'fifit.mocap@gmail.com' }, 'Rahasia')
        done()
    })
    .catch(err => done(err))
})

describe('POST /itineraryPlaces', function () {
    it('Itinerary create success', function (done) {
        let input = {
            name: "Pura Tanah Lot",
            description : "Amazing",
            estimatedPrice : "200000",
            rating: "5",
            itineraryOrder : 2,
            date : "2022-03-17",
            ItineraryId: 1
        }
        request(app)
            .post("/itineraryPlaces")
            .send(input)
            .set('Accept', 'application/json')
            .set({ access_token: access_token })
            .then(response => {
                //idItinerary = response.body.Itineraries.id
                console.log(response.body,'======================');
                const { body, status } = response
                expect(status).toBe(201)
                expect(body).toHaveProperty("message", "Succes create Itinerary Places")
                done()
            })
            .catch(err => {
               // console.log(err,'err============');
                done(err)
            })
    })
})
describe('GET /itinerary/:id', function () {
    
})
describe('PATCH /itinerary/:id', function () {
    
})
describe('DELETE /itinerary/:id', function () {
    
})