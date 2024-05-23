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
    index, show, destroyAll
}

