const ControllerItinerary = require('../../controllers/ItineraryController')

const Itineraries = require('express').Router()

console.log('router masuk');

Itineraries.get('/', ControllerItinerary.fetchAllItinerary)
Itineraries.post('/', ControllerItinerary.addItinerary)
Itineraries.get('/:id', ControllerItinerary.fetchOne)
Itineraries.put('/:id', ControllerItinerary.update)
Itineraries.delete('/:id', ControllerItinerary.delete)
Itineraries.get('/my-list', ControllerItinerary.fetchAllItineraryMyList)


module.exports = Itineraries