const itineraryPlacesRouter = require('express').Router()
const itineraryPlacesController = require('../controllers/itineraryPlacesController')
// const {} authen & author

itineraryPlacesRouter.get('/:id', itineraryPlacesController.getOne)
itineraryPlacesRouter.patch('/:id', itineraryPlacesController.updateItineraryPlace)
itineraryPlacesRouter.delete('/:id', itineraryPlacesController.deleteItineraryPlace)
itineraryPlacesRouter.post('/', itineraryPlacesController.addItineraryPlace)

module.exports = itineraryPlacesRouter