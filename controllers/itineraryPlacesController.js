const {ItineraryPlace} = require('../models')
class itineraryPlacesController {
  static async getOne (req, res, next) {
    try {
      const itineraryPlaces = await ItineraryPlace.findOne({where: {id: +req.params.id}})
      if (itineraryPlaces === null) {
        next({ status: 404, message: `Itinerary Place with id ${req.params.id} not found` })
      } else {
          return res.status(200).json(itineraryPlaces)
      }
    } catch (err) {
      next(err)
    }
  }
  static async updateItineraryPlace (req, res, next) {
    try {
      const {name, description, estimatedPrice, rating, itineraryOrder, date, itineraryId} = req.body
      const itineraryPlace = await itineraryPlace.update({name, description, estimatedPrice, rating, itineraryOrder, date, itineraryId}, {where: {id: +req.params.id}, returning: true, plain:true})

      if(itineraryPlace[0] === 0 ){
        next({status: 404, message: `Itinerary Place with id ${req.params.id} not found`})
      }else{
        return res.status(200).json(itineraryPlace)
      }
    } catch (err) {
      if(err.name === 'SequelizeValidationError') {
        let validation = err.errors.map(el => el.message)
        next({ status: 400, message: validation })
      }else{
        next(err)
      }
    }
  }
  static async deleteItineraryPlace(req, res, next){
    try {
      const itineraryPlace = await ItineraryPlace.destroy({where: {id: req.params.id}})
      if(itineraryPlace === 0){
        next({ status: 404, message: `Itinerary Place with id ${req.params.id} not found` })
      }else{
        return res.status(200).json(`Itinerary Place with id ${req.params.id} deleted`)
      }
    } catch (err) {
      next(err)
      
    }
  }
  static async addItineraryPlace (req, res, next) {
    try {
      const {name, description, estimatedPrice, rating, itineraryOrder, date, itineraryId} = req.body
      const status = 'Active'
      let itineraryPlace = await ItineraryPlace.create({name, description, estimatedPrice, rating, itineraryOrder, date, itineraryId, status})
      res.status(201).json({message:'Success Add Itinerary Place', itineraryPlace})
    } catch (err) {
      if(err.name === 'SequelizeValidationError') {
        let validation = err.errors.map(el => el.message)
        next({ status: 400, message: validation })
      }else{
        next(err)
      }
    }
  }
}

module.exports = itineraryPlacesController