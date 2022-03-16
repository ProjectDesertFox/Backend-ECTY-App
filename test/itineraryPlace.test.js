const request = require('supertest')
const app = require('../app.js')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
let jwt = require('jsonwebtoken')
const { encrypt } = require('../helper/bycrypt.js')

let access_token
let idItineraryPlace

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
            return queryInterface.bulkDelete("ItineraryPlaces", {}, null)
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

describe('POST /itineraryPlaces', function () {
    console.log('masuk');
    it('Itinerary Place create success', function (done) {
        let input = {
            name: "Pura Tanah Lot",
            description: "Amazing",
            estimatedPrice: "200000",
            rating: "5",
            itineraryOrder: 2,
            date: "2022-03-17",
            ItineraryId: 1,
            imagePlace: "https://www.rentalmobilbali.net/wp-content/uploads/2019/12/Sunset-Pura-Tanah-Lot-Bali-Twitter.jpg"
        }
        request(app)
            .post("/itineraryPlaces")
            .send(input)
            .set('Accept', 'application/json')
            .set({ access_token: access_token })
            .then(response => {
                idItineraryPlace = response.body.itineraryPlace.id
                //console.log(response.body,'======================');
                const { body, status } = response
                expect(status).toBe(201)
                expect(body).toHaveProperty("message", "Success Add Itinerary Place")
                done()
            })
            .catch(err => {
                // console.log(err,'err============');
                done(err)
            })
    })
})
describe('GET /itineraryPlaces/:id', function () {
    it("Success get one data itineraryPlace", function (done) {
        request(app)
            .get(`/itineraryPlaces/${idItineraryPlace}`)
            .set("Accept", "application/json")
            .set({ access_token: access_token })
            .then((res) => {
                console.log(res.body, 'itineraryPlace one +======');
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
    it("Failed get one data itineraryPlace", function (done) {
        request(app)
            .get(`/itineraryPlaces/100`)
            .set("Accept", "application/json")
            .set({ access_token: access_token })
            .then((res) => {
                //console.log(res.body, 'itineraryPlace one +======');
                const { status, body } = res;
                expect(status).toBe(404);
                expect(body).toHaveProperty("message", `Itinerary Place with id 100 not found`)
                done();
            })
            .catch((err) => {
                //console.log(err);
                done(err)
            }
            );
    });
})
describe('PATCH /itineraryPlaces/:id', function () {
    it('Update itinerary Places success', function (done) {
        let input = {
            name: "Tanah Lot",
        }
        request(app)
            .patch(`/itineraryPlaces/${idItineraryPlace}`)
            .send(input)
            .set('Accept', 'application/json')
            .set({ access_token: access_token })
            .then(response => {
                console.log(response.body, 'update+++++++berhasil');
                const { body, status } = response
                expect(status).toBe(201)
                expect(body).toHaveProperty("message", `Itinerary Place with id ${idItineraryPlace} Updated`)
                done()
            })
            .catch(err => {
                console.log(err, 'err============');
                done(err)
            })
    })
    it('Update itinerary Places id not found', function (done) {
        let input = {
            name: "Tanah Lot 2",
        }
        request(app)
            .patch(`/itineraryPlaces/100`)
            .send(input)
            .set('Accept', 'application/json')
            .set({ access_token: access_token })
            .then(response => {
                console.log(response.body, 'update+++++++gagal');
                const { body, status } = response
                expect(status).toBe(404)
                expect(body).toHaveProperty("message", `Itinerary Place with id 100 not found`)
                done()
            })
            .catch(err => {
                console.log(err, 'err============');
                done(err)
            })
    })
})
describe('DELETE /itineraryPlaces/:id', function () {
    it("Delete Itinerary Place", function (done) {
        request(app)
            .delete(`/itineraryPlaces/${idItineraryPlace}`)
            .set("Accept", "application/json")
            .set({ access_token: access_token })
            .then((res) => {
                //console.log(res.body, 'user delete +======');
                const { status, body } = res;
                expect(status).toBe(200);
                expect(body).toHaveProperty("message", `Itinerary Place with id ${idItineraryPlace} deleted`)
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
    it("Delete itinerary Place id not found", function (done) {
        request(app)
            .delete("/itineraryPlaces/200")
            .set("Accept", "application/json")
            .set({ access_token: access_token })
            .then((res) => {
                //console.log(res.body, 'user delete +======');
                const { status, body } = res;
                expect(status).toBe(404);
                expect(body).toHaveProperty("message", "Itinerary Place with id 200 not found")
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