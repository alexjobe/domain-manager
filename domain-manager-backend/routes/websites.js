var express = require('express'),
    router = express.Router();
    var db = require('../models');

//======================================================//
//                      WEBSITE ROUTES                  //
//                       /api/websites                  //
//======================================================//

// WEBSITE INDEX - Get all websites
router.get("/", function(req, res){
    db.Website.find()
    .populate('registrar')
    .populate('host')
    .then(function(websites){ // Promise instead of typical callback
        res.json(websites);
    })
    .catch(function(err){
        res.send(err);
    });
});

// WEBSITE GET - Get a single website
router.get("/:websiteId", function(req, res){
    // Mongoose populates based on ObjectID
    db.Website.findById(req.params.websiteId)
    .populate('registrar')
    .populate('host')
    .then(function(website){
        res.json(website);
    })
    .catch(function(err) {
        res.send(err);
    });
});

// WEBSITE SEARCH - Get all websites that match query. Search by name and url.
router.get("/search/:query", function(req, res){
    var search_query = '.*' + req.params.query + '.*';
    db.Website.find(
        // Find all websites whose name or url contain the query string
        {$or: [ { 'name' : { $regex : search_query, $options : 'i' } }, 
        { 'url' : { $regex : search_query, $options : 'i' } }] }
    )
    .populate('registrar')
    .populate('host')
    .then(function(websites){ // Promise instead of typical callback
        res.json(websites);
    })
    .catch(function(err){
        res.send(err);
    });
});

// WEBSITE CREATE - Add new website to database
router.post("/", function(req, res){
    db.Website.create(req.body)
    .then(function(website){
        return website.populate('registrar').populate('host').execPopulate();
    })
    .then(function(website) {
        res.status(201).json(website); // 201 is "created"
    })
    .catch(function(err){
        res.send(err);
    });
});

// WEBSITE UPDATE - Update a website
router.put("/:websiteId", function(req, res){
    // Mongoose populates based on ObjectID
    db.Website.findByIdAndUpdate({_id: req.params.websiteId}, req.body, {new: true}) // {new: true} respond with updated data
    .populate('registrar')
    .populate('host')
    .then(function(website){
        res.json(website);
    })
    .catch(function(err){
        res.send(err);
    });
});

// WEBSITE DELETE - Delete a website
router.delete("/:websiteId", function(req, res){

    db.Website.deleteOne({_id: req.params.websiteId})
    .then(function(){
        res.json({message: 'Deletion success'});
    })
    .catch(function(err){
        res.send(err);
    });
});

module.exports = router;