const ControllerItinerary = require('../../controllers/ItineraryController')

const Itineraries = require('express').Router()

console.log('router masuk');

Itineraries.post('/', ControllerItinerary.addItinerary)
Itineraries.get('/:id', ControllerItinerary.fetchOne)
Itineraries.put('/:id', ControllerItinerary.update)
Itineraries.delete('/:id', ControllerItinerary.delete)

module.exports = Itineraries