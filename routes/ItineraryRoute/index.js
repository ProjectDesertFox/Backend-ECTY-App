const ControllerItinerary = require('../../controllers/ItineraryController');
const { authentication } = require('../../middlewares/auth');

const Itineraries = require('express').Router()

// console.log('router masuk');

Itineraries.get('/', ControllerItinerary.fetchAllItinerary)
//Itineraries.use(authentication)
Itineraries.post('/',authentication, ControllerItinerary.addItinerary)
Itineraries.get('/list',authentication, ControllerItinerary.fetchAllItineraryMyList)
Itineraries.get('/:id', ControllerItinerary.fetchOne)
Itineraries.put('/:id',authentication, ControllerItinerary.update)
Itineraries.delete('/:id',authentication, ControllerItinerary.delete)

module.exports = Itineraries