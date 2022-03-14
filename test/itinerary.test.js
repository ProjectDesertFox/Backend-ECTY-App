const request = require('supertest')
const app = require('../app.js')
const {sequelize} = require ('../models')
const {queryInterface} = sequelize
let jwt = require('jsonwebtoken')
const { encrypt } = require('../helper/bycrypt.js')

let access_token
let idItinerary 

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
    .then(() =>{
        access_token = jwt.sign({ id: 1, email: 'fifit.mocap@gmail.com' }, 'Rahasia')
        done()
    })
    .catch(err => done(err))
})

describe('POST /itinerary', function () {
    it('Itinerary create success', function (done) {
        let input = {
            title : "Bali Trip",
            destination : "Bali",
            dateStart : "2022-03-16",
            dateEnd : "2022-03-19",
            rating : "5",
            budget : "500000",
            type: "Sharing Public",
            sharingMemberSlot: 2,
            UserId : "1",
            nameGroup : "Bali 16 Maret",
            namePlace: "Uluwatu",
            descriptionPlace : "Sangat Segar",
            estimatedPricePlace : "100000",
            ratingPlace: "4",
            itineraryOrder : 1,
            datePlace : "2022-03-17",
            transportationType: "Motor",
            from: "Mataram",
            to: "Bali",
            distance: "10km",
            estimatedTime: "1 hari",
            estimatedPriceTrans: "40000"
        }
        request(app)
            .post("/itinerary")
            .send(input)
            .set('Accept', 'application/json')
            .set({ access_token: access_token })
            .then(response => {
                idItinerary = response.body.Itineraries.id
                console.log(response.body,'======================');
                const { body, status } = response
                expect(status).toBe(201)
                expect(body).toHaveProperty("message", "Succes create Itinerary")
                done()
            })
            .catch(err => {
               // console.log(err,'err============');
                done(err)
            })
    })
})
describe('GET /itinerary/:id', function () {
    it("Success get one data itinerary", function (done) {
        request(app)
            .get(`/itinerary/${idItinerary}`)
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
describe('PUT /itinerary/:id', function () {
    it('Update Itinerary', function (done) {
        let input = {
            title : "Bali Trip Abal2",
        }
        request(app)
            .put(`/itinerary/${idItinerary}`)
            .send(input)
            .set('Accept', 'application/json')
            .set({ access_token: access_token })
            .then(response => {
                console.log(response.body,'check+++++++++');
                const { body, status } = response
                expect(status).toBe(201)
                expect(body).toHaveProperty("message", `Itinerary with id ${idItinerary} Updated`)
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
            .put(`/itinerary/100`)
            .send(input)
            .set('Accept', 'application/json')
            .set({ access_token: access_token })
            .then(response => {
                console.log(response.body,'check+++++++++');
                const { body, status } = response
                expect(status).toBe(404)
                expect(body).toHaveProperty("message", `Itinerary with id 100 not found`)
                done()
            })
            .catch(err => {
                console.log(err,'err============');
                done(err)
            })
    })
})
describe('DELETE /itinerary/:id', function () {
    it("Delete Itinerary", function (done) {
        request(app)
            .delete(`/itinerary/${idItinerary}`)
            .set("Accept", "application/json")
            .set({ access_token: access_token })
            .then((res) => {
                //console.log(res.body, 'user delete +======');
                const { status, body } = res;
                expect(status).toBe(200);
                expect(body).toHaveProperty("message", `Itinerary with id ${idItinerary} Deleted`)
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
    it("Delete Itinerary id not found", function (done) {
        request(app)
            .delete("/itinerary/200")
            .set("Accept", "application/json")
            .set({ access_token: access_token })
            .then((res) => {
                //console.log(res.body, 'user delete +======');
                const { status, body } = res;
                expect(status).toBe(404);
                expect(body).toHaveProperty("message", "Itinerary with id 200 not found")
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