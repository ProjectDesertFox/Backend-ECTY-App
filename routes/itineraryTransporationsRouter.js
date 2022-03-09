const itineraryTransporationsRouter = require('express').Router()
const itineraryTransportationsController = require('../controllers/itineraryTransportationsController')
// const {} authen & author

itineraryTransporationsRouter.get('/:id', itineraryTransportationsController.getOne)
itineraryTransporationsRouter.patch('/:id', itineraryTransportationsController.updateItineraryTransportation)
itineraryTransporationsRouter.delete('/:id', itineraryTransportationsController.deleteItineraryTransportation)
itineraryTransporationsRouter.post('/', itineraryTransportationsController.addItineraryTransportation)

module.exports = itineraryTransporationsRouter