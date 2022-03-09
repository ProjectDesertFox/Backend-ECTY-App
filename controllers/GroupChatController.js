const {groupchat, sequelize, itinerary, groupmember, itineraryTransportation, itineraryPlaces} = require('../models/index.js')


class ControllerGroupChat {

    static async addChat(req, res, next){

        const data = {
            name: req.body.name,
            status: req.body.status,
            IteneryId: req.body.IteneryId,
        }

        groupchat.create(data)
            .then(data => {
                res.status(201).json({
                    name: data.name,
                    status: data.status,
                })
            })
            .catch(err => {
                console.log('err dari Add chat')
                res.status(500).json(err)
            })

        // const dataItinerary = {
        //     title: req.body.title,
        //     destinasion: req.body.destinasion,
        //     dateStart: req.body.dateStart,
        //     dateEnd: req.body.dateEnd,
        //     rating: req.body.rating,
        //     budget: req.body.budget,
        //     status: req.body.status,
        //     UserId: req.UserId,
        // }

        // let transaction;
        // try {
        //     transaction = await sequelize.transaction()
        //     const Itineraries = await itinerary.create(dataItinerary, {transaction})

        //     const chat = await groupchat.create({
        //         name: req.body.name,
        //         status: req.body.status,
        //         IteneryId: Itineraries.id,
        //     },{transaction})
        //     const member = await groupmember.create({
        //         GroupChatId: chat.id,
        //         UserId: req.UserId
        //     }, {transaction})
        //     const place = await itineraryPlaces.create({
        //         name: req.body.name,
        //         description: req.body.description,
        //         estimatedPrice: req.body.estimatedPrice,
        //         rating: req.body.rating,
        //         itineraryOrder: req.body.itineraryOrder,
        //         date: req.body.date,
        //         status: req.body.status,
        //         ItineraryId: Itineraries.id 
        //     }, {transaction})
        //     const transportation = await itineraryTransportation.create({
        //         transportationType: req.body.transportationType,
        //         from: req.body.from,
        //         to: req.body.to,
        //         distance: req.body.distance,
        //         estimatedTime: req.body.estimatedTime,
        //         estimatedPrice: req.body.estimatedPrice,
        //         ItineraryId: Itineraries.id
        //     },{transaction})
        //     await transaction.commit()
            
        // } catch (error) {
        //     if(transaction){
        //         await transaction.rollback()
        //     }
        // }
        
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
        const {name, ItineraryId} = req.body
        groupchat.update({name, ItineraryId}, {where : {id}})
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

        groupchat.destroy({
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


module.exports = ControllerGroupChat