const {GroupChat} = require('../models/index.js')


class ControllerGroupChat {

    static async addChat(req, res, next){

        const data = {
            name: req.body.name,
            status: req.body.status,
            ItineraryId: req.body.ItineraryId,
        }
        console.log(data)
        GroupChat.create(data)
            .then(data => {
                res.status(201).json({
                    name: data.name,
                    status: data.status,
                })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
        
    }

    static fetchOne(req, res, next) {
        let id = req.params.id

        GroupChat.findOne({
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
        GroupChat.update({name, ItineraryId}, {where : {id}})
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

        GroupChat.destroy({
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