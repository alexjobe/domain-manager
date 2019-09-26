var express    = require('express'),
    router     = express.Router(),
    db         = require('../models'),
    middleware = require("../middleware");

//======================================================//
//                      HOST ROUTES                     //
//                      /api/hosts                      //
//======================================================//

// HOST INDEX - Get all hosts
router.get("/", middleware.isLoggedIn, function(req, res){
    db.Host.find()
    .then(function(hosts){ // Promise instead of typical callback
        res.json(hosts);
    })
    .catch(function(err){
        res.send(err);
    });
});

// HOST CREATE - Add new host to database
router.post("/", middleware.isLoggedIn, function(req, res){
    db.Host.create(req.body)
    .then(function(newHost) {
        res.status(201).json(newHost); // 201 is "created"
    })
    .catch(function(err){
        res.send(err);
    });
});

// HOST GET - Get a single host
router.get("/:hostId", middleware.isLoggedIn, function(req, res){
    db.Host.findById(req.params.hostId)
    .then(function(host){
        res.json(host);
    })
    .catch(function(err) {
        res.send(err);
    });
});

// HOST SEARCH - Get all hosts that match query. Search by name.
router.get("/search/:query", middleware.isLoggedIn, function(req, res){
    var search_query = '.*' + req.params.query + '.*';
    // Find all hosts whose name contains the query string
    db.Host.find({ 'name' : { $regex : search_query, $options : 'i' } })
    .then(function(registrars){ // Promise instead of typical callback
        res.json(registrars);
    })
    .catch(function(err){
        res.send(err);
    });
});

// HOST UPDATE - Update a host
router.put("/:hostId", middleware.isLoggedIn, function(req, res){
    db.Host.findOneAndUpdate({_id: req.params.hostId}, req.body, {new: true}) // {new: true} respond with updated data
    .then(function(host){
        res.json(host);
    })
    .catch(function(err){
        res.send(err);
    });
});

// HOST DELETE - Delete a host
router.delete("/:hostId", middleware.isLoggedIn, function(req, res){

    db.Host.deleteOne({_id: req.params.hostId})
    .then(function(){
        res.json({message: 'Deletion success'});
    })
    .catch(function(err){
        res.send(err);
    });
});

module.exports = router;