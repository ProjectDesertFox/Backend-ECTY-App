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
      const {name, description, estimatedPrice, rating, itineraryOrder, date, itineraryId, imagePlace} = req.body
      const itineraryPlace = await ItineraryPlace.update({name, description, estimatedPrice, rating, itineraryOrder, date, itineraryId, imagePlace}, {where: {id: +req.params.id}, returning: true, plain:true})
      console.log(itineraryPlace,'YOIIIIIIIIIIII');
      if(itineraryPlace[0] === 0 ){
        return next({status: 404, message: `Itinerary Place with id ${req.params.id} not found`})
      }else{
        return res.status(201).json({itineraryPlace,message: `Itinerary Place with id ${req.params.id} Updated`})
      }
    } catch (err) {
      if(err.name === 'SequelizeValidationError') {
        let validation = err.errors.map(el => el.message)
        next({ status: 400, message: validation })
      }else{
        console.log(err)
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
        return res.status(200).json({message: `Itinerary Place with id ${req.params.id} deleted`})
      }
    } catch (err) {
      next(err)
      
    }
  }
  static async addItineraryPlace (req, res, next) {
    try {
      const {name, description, estimatedPrice, rating, itineraryOrder, date, ItineraryId, imagePlace} = req.body
      const status = 'Active'
      let itineraryPlace = await ItineraryPlace.create({name, description, estimatedPrice, rating, itineraryOrder, date, ItineraryId, status, imagePlace})
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