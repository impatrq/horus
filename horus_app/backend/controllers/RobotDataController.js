const robotdata = require('../models/robotdata')

// Show all logs <= for the "Data" route when there is no filter
const index = (req,res,next) => {
    robotdata_find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(err => {
        message: "Error (show all logs)"
    })
}  

// Show only one log <= for the filter in the "Data" route
const show = (req,res,next) => {
    let filter = req.body.date
    robotdata_find({
        date: filter
    })
    .then (response => {
        res.json({
            response
        })
    })
    .catch(err => {
        message: "Error (show only one log)"
    })
}

// Save a log
const store = (req,res,next) => {
    let log = new robotdata({
        robot_id: req.body.robot_id,
        plague_type: req.body.plague_type,
        pheromone_trap: req.body.pheromone_trap,
        image_id: req.body.image_id,
        probability: req.body.probability,
        date: req.body.date,
        time: req.body.time,
        coordinates: req.body.coordinates
    })
    log.save()
    .then (response => {
        res.json({
            message: "Log added succesfully"
        })
    })
    .catch (err => {
        res.json({
            message: "Error (storing process)"
        })
    }
    )
}

// Delete all logs <= should go along the rest of configuration settings
const destroyAll = (req,res,next) => {
    DateTime.deleteMany({})
    .then (response => {
        res.json({
            message: "Deleted all logs succesfully"
        })
    })
    .catch(err => {
        message: "Error (show only one log)"
    })
}

module.exports = {
    index, show, store, destroyAll
}

