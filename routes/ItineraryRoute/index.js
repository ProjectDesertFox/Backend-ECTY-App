const ControllerItinerary = require('../../controllers/ItineraryController');
const { authentication } = require('../../middlewares/auth');

const Itineraries = require('express').Router()

console.log('router masuk');

Itineraries.get('/', ControllerItinerary.fetchAllItinerary)
Itineraries.get('/:id', ControllerItinerary.fetchOne)

Itineraries.use(authentication)
Itineraries.post('/', ControllerItinerary.addItinerary)
Itineraries.put('/:id', ControllerItinerary.update)
Itineraries.delete('/:id', ControllerItinerary.delete)
Itineraries.get('/list', ControllerItinerary.fetchAllItineraryMyList)

module.exports = Itineraries