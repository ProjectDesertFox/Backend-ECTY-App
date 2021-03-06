const { Itinerary, ItineraryTransportation, ItineraryPlace, GroupChat, sequelize, User, GroupChats } = require('../models/index.js');


class ControllerItinerary {

    static async addItinerary(req, res, next) {



        // let transaction;
        try {
            const checkItinerary = await Itinerary.findAll({ where: { UserId: req.UserId } })
            console.log(checkItinerary, '-------------');
            const checkStatusUser = await User.findOne({ where: { id: req.UserId } })
            if (checkStatusUser.planStatus === 'Basic' && checkItinerary.length > 5) {
                return res.status(400).json({ message: "you need to upgrade your plan status to Premium to create itinerary more than 5" })
            } else {
                //console.log(req.body)
                const dataItinerary = {
                    title: req.body.title,
                    destination: req.body.destination,
                    dateStart: req.body.dateStart,
                    dateEnd: req.body.dateEnd,
                    rating: req.body.ratingItinerary,
                    budget: req.body.budget,
                    sharingMemberSlot: req.body.sharingMemberSlot,
                    type: req.body.type,
                    imageItinerary: req.body.imageItinerary,
                    UserId: req.UserId,
                }
                console.log(dataItinerary);
                // transaction = await sequelize.transaction()
                const Itineraries = await Itinerary.create(dataItinerary)
                // console.log(Itineraries.dataValues.id, '+++++++++++++++++++++++=')

                if (Itineraries.type !== 'Private' || 'private') {
                    const chat = await GroupChat.create({
                        name: req.body.nameGroup,
                        status: req.body.status,
                        ItineraryId: Itineraries.dataValues.id,
                    })
                }

                const place = await ItineraryPlace.create({
                    name: req.body.namePlace,
                    description: req.body.descriptionPlace,
                    estimatedPrice: req.body.estimatedPricePlace,
                    rating: req.body.ratingPlace,
                    itineraryOrder: req.body.itineraryOrder,
                    date: req.body.datePlace,
                    status: req.body.status,
                    imagePlace: req.body.imagePlace,
                    ItineraryId: Itineraries.dataValues.id
                })

                // const transportation = await ItineraryTransportation.create({
                //     transportationType: req.body.transportationType,
                //     from: req.body.from,
                //     to: req.body.to,
                //     distance: req.body.distance,
                //     estimatedTime: req.body.estimatedTime,
                //     estimatedPrice: req.body.estimatedPriceTrans,
                //     ItineraryId: Itineraries.dataValues.id
                // })
                // await transaction.commit()
                return res.status(201).json({ message: 'Succes create Itinerary', Itineraries, chat })
            }
        } catch (error) {
            //console.log(error);
            next(error)
        }
    }
    static fetchAllItinerary(req, res, next) {
        Itinerary.findAll({
            where: { type: 'public' || 'Public' }, include: [
                User,
                ItineraryPlace,
                //ItineraryTransportation,
                GroupChat
            ]
        })
            .then(itineraries => {
                // console.log("itineraries")
                res.status(200).json(itineraries)
            })
            .catch(err => {
                //console.log(err)
                next(err)
            })
    }
    static fetchAllItineraryMyList(req, res, next) {
        Itinerary.findAll({ where: { UserId: req.UserId }})
            .then(itineraries => {
                res.status(200).json(itineraries)
            })
            .catch(err => {
                console.log(err,')))))))))))))))');
                next(err)
            })
    }

    static fetchOne(req, res, next) {
        let id = req.params.id

        Itinerary.findOne({
            where: { id }, include: [ItineraryPlace]
        })
            .then(data => {
                res.status(200).json({
                    itinerary: data
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static update(req, res, next) {
        let id = req.params.id
        const { title, destinasion, dateStart, dateEnd, rating, budget, status, imageItinerary } = req.body
        let UserId = req.id
        Itinerary.update({ title, destinasion, dateStart, dateEnd, rating, budget, status, UserId, imageItinerary }, { where: { id } })
            .then(data => {
                if (data[0] === 0) {
                    res.status(404).json({
                        message: `Itinerary with id ${id} not found`
                    })
                } else {
                    res.status(201).json({
                        message: `Itinerary with id ${id} Updated`
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static delete(req, res, next) {
        let id = req.params.id

        Itinerary.destroy({
            where: { id }
        })
            .then(data => {
                if (data === 0) {
                    res.status(404).json({
                        message: `Itinerary with id ${id} not found`
                    })
                } else {
                    res.status(200).json({
                        message: `Itinerary with id ${id} Deleted`
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    // static fetchAllItinerary(req, res, next){
    //     Itinerary.findAll()
    //     .then(itineraries=>{
    //         res.status(200).json(itineraries)
    //     })
    //     .catch(err=>{
    //         console.log(err)
    //         next(err)
    //     })
    // }

    // static fetchAllItineraryMyList(req, res, next){
    //     Itinerary.findAll({where: {UserId:req.UserId}})
    //     .then(itineraries =>{
    //         res.status(200).json(itineraries)
    //     })
    //     .catch(err =>{
    //         console.log(err);
    //         next(err)
    //     })
    // }
}

module.exports = ControllerItinerary