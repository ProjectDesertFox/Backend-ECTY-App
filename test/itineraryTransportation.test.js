const request = require('supertest')
const app = require('../app.js')
const {sequelize} = require ('../models')
const {queryInterface} = sequelize
let jwt = require('jsonwebtoken')
const { encrypt } = require('../helper/bycrypt.js')

let access_token
let idItineraryTrans

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
            status:"Active",
            createdAt: new Date(),
            updatedAt: new Date()
        }])
    })
    .then(()=>{
        return queryInterface.bulkDelete("ItineraryTransportations", {}, null)
    })
    .then(() =>{
        access_token = jwt.sign({ id: 1, email: 'fifit.mocap@gmail.com' }, 'Rahasia')
        done()
    })
    .catch(err => done(err))
})

describe('POST /itineraryTransportation', function () {
    it('Itinerary create success', function (done) {
        let input = {
            transportationType: "Motor",
            from: "Mataram",
            to: "Bali",
            distance: "10km",
            estimatedTime: "1 hari",
            estimatedPriceTrans: "40000",
            ItineraryId : 1
        }
        request(app)
            .post("/itineraryTransportation")
            .send(input)
            .set('Accept', 'application/json')
            .set({ access_token: access_token })
            .then(response => {
                idItineraryTrans = response.body.itineraryTransportation.id
                console.log(response.body,'======================');
                const { body, status } = response
                expect(status).toBe(201)
                expect(body).toHaveProperty("message", "Success to create Itinerary Transportation")
                done()
            })
            .catch(err => {
                console.log(err,'err============');
                done(err)
            })
    })
})

describe('GET /itineraryTransportation/:id', function () {
    it("Success get one data itineraryTransportation", function (done) {
        request(app)
            .get(`/itineraryTransportation/${idItineraryTrans}`)
            .set("Accept", "application/json")
            .set({ access_token: access_token })
            .then((res) => {
                //console.log(res.body, 'user one +======');
                const { status, body } = res;
                expect(status).toBe(200);
                //expect(body).toHaveProperty("message", `Item with id ${idItineraryTrans} Updated`)
                done();
            })
            .catch((err) => {
                //console.log(err);
                done(err)
            }
            );
    });
})

describe('PATCH /itineraryTransportation/:id', function () {
    it('Update itineraryTransportation', function (done) {
        let input = {
            from: "Jawa",
        }
        request(app)
            .patch(`/itineraryTransportation/${idItineraryTrans}`)
            .send(input)
            .set('Accept', 'application/json')
            .set({ access_token: access_token })
            .then(response => {
                 console.log(response.body,'update+++++++berhasil');
                const { body, status } = response
                expect(status).toBe(201)
                expect(body).toHaveProperty("message", `Itinerary Transportation with id ${idItineraryTrans} Updated`)
                done()
            })
            .catch(err => {
                console.log(err,'err============');
                done(err)
            })
    })
    it('Update Itinerary id not found', function (done) {
        let input = {
            title : "Bali Trip Abal2",
        }
        request(app)
            .patch(`/itineraryTransportation/1`)
            .send(input)
            .set('Accept', 'application/json')
            .set({ access_token: access_token })
            .then(response => {
                // console.log(response.body,'check+++++++++');
                console.log(response.body,'update+++++++gagal');
                const { body, status } = response
                expect(status).toBe(404)
                expect(body).toHaveProperty("message", `Itinerary Transportation with id 1 not found`)
                done()
            })
            .catch(err => {
                // console.log(err,'err============');
                done(err)
            })
    })
})

describe('DELETE /itineraryTransportation/:id', function () {
    it("Delete Itinerary", function (done) {
        request(app)
            .delete(`/itineraryTransportation/${idItineraryTrans}`)
            .set("Accept", "application/json")
            .set({ access_token: access_token })
            .then((res) => {
                //console.log(res.body, 'user delete +======');
                const { status, body } = res;
                expect(status).toBe(200);
                expect(body).toHaveProperty("message", `Itinerary Transportation with id ${idItineraryTrans} deleted`)
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
    it("Delete itineraryTransportation id not found", function (done) {
        request(app)
            .delete("/itineraryTransportation/2")
            .set("Accept", "application/json")
            .set({ access_token: access_token })
            .then((res) => {
                //console.log(res.body, 'user delete +======');
                const { status, body } = res;
                expect(status).toBe(404);
                expect(body).toHaveProperty("message", "Itinerary Transportation with id 2 not found")
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