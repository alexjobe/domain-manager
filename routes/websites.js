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
    .then(function(website) {
        res.status(201).json(website); // 201 is "created"
    })
    .catch(function(err){
        res.send(err);
    });
});

// WEBSITE GET - Get a single website
router.get("/:websiteId", function(req, res){
    // Mongo populates registrar based on ObjectID
    db.Website.findById(req.params.websiteId).populate('registrar')
    .then(function(website){
        res.json(website);
    })
    .catch(function(err) {
        res.send(err);
    });
});

// WEBSITE UPDATE - Update a website
router.put("/:websiteId", function(req, res){
    db.Website.findOneAndUpdate({_id: req.params.websiteId}, req.body, {new: true}) // {new: true} respond with updated data
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