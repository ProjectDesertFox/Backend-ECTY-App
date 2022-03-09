const { itinerary, itineraryTransportation, itineraryPlaces, groupchat } = require('../models/index.js')


class ControllerItinerary {

    static addItinerary(req, res, next){

        const dataItinerary = {
            title: req.body.title,
            destinasion: req.body.destinasion,
            dateStart: req.body.dateStart,
            dateEnd: req.body.dateEnd,
            rating: req.body.rating,
            budget: req.body.budget,
            status: req.body.status,
            UserId: req.UserId,
        }

        let transaction;
        try {
            transaction = await sequelize.transaction()
            const Itineraries = await itinerary.create(dataItinerary, {transaction})

            const chat = await groupchat.create({
                name: req.body.name,
                status: req.body.status,
                IteneryId: Itineraries.id,
            },{transaction})

            const place = await itineraryPlaces.create({
                name: req.body.name,
                description: req.body.description,
                estimatedPrice: req.body.estimatedPrice,
                rating: req.body.rating,
                itineraryOrder: req.body.itineraryOrder,
                date: req.body.date,
                status: req.body.status,
                ItineraryId: Itineraries.id 
            }, {transaction})

            const transportation = await itineraryTransportation.create({
                transportationType: req.body.transportationType,
                from: req.body.from,
                to: req.body.to,
                distance: req.body.distance,
                estimatedTime: req.body.estimatedTime,
                estimatedPrice: req.body.estimatedPrice,
                ItineraryId: Itineraries.id
            },{transaction})
            await transaction.commit()
            
        } catch (error) {
            if(transaction){
                await transaction.rollback()
            }
        }
        
        // const data = {
        //     title: req.body.title,
        //     destinasion: req.body.destinasion,
        //     dateStart: req.body.dateStart,
        //     dateEnd: req.body.dateEnd,
        //     rating: req.body.rating,
        //     budget: req.body.budget,
        //     status: req.body.status,
        //     UserId: req.UserId,
        // }

        // itinerary.create(data)
        //     .then(data => {
        //         res.status(201).json({
        //             title: data.title,
        //             destinasion: data.destinasion,
        //             dateStart: data.dateStart,
        //             dateEnd: data.dateEnd,
        //         })
        //     })
        //     .catch(err => {
        //         console.log('err dari Add Item')
        //         res.status(500).json(err)
        //     })
    }

    static fetchOne(req, res, next) {
        let id = req.params.id

        itinerary.findOne({
            where: { id }
        })
            .then(data => {
                res.status(201).json({
                    items: data
                })
            })
            .catch(err => {
                console.log('err dari getOne')
            })
    }

    static update(req, res, next) {
        let id = req.params.id
        const {title, destinasion, dateStart, dateEnd, rating, budget, status} = req.body
        let UserId = req.id
        itinerary.update({title, destinasion, dateStart, dateEnd, rating, budget, status, UserId}, {where : {id}})
            .then(data => {
                if(data[0] === 0){
                    res.status(404).json({
                        message: `Item with id ${id} not found`
                    })
                } else {
                    res.status(201).json({
                        message : `Item with id ${id} Updated`
                    })
                }
            })
            .catch(err =>{
                console.log(err)
            })
    }

    static delete(req, res, next) {
        let id = req.params.id

        itinerary.destroy({
            where: {id}
        })
        .then(data =>{
            if(data === 0){
                res.status(404).json({
                    message: `Item with id ${id} not found`
                })
            } else {
                res.status(200).json({
                    message: `Item with id ${id} Deleted`
                })
            }
        })
        .catch(err =>{
            console.log(err)
        })
    }
}

module.exports = ControllerItinerary