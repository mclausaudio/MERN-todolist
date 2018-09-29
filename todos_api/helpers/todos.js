var db = require('../models')

exports.getTodos =  function(req, res){
    db.Todo.find()
    .then(function(todos){
        res.json(todos);
    })
    .catch(function(err){
        res.send(err);
    })
};

exports.createTodo =  function(req, res){
    db.Todo.create(req.body)
    .then(function(newTodo){
        res.status(201).json(newTodo);
    })
    .catch(function(err){
        res.send(err);
    })
};

exports.getTodo =  function(req, res){
    db.Todo.findById(req.params.todoId)
    .then(function(foundTodo){
        res.json(foundTodo)
    })
    .catch(function(err){
        res.sned(err)
    })
};

exports.updateTodo = function (req, res){
    //adding {new: true} makes mongoose send the updated version rather than the old vers
    db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
    .then(function(todo){
        res.json(todo);
    })
    .catch(function(err){
        res.send(err);
    })
};

exports.deleteTodo =  function(req, res){
    db.Todo.remove({_id: req.params.todoId})
    .then(function(){
        res.json({message: "Successfully deleted, nice one."})
    })
    .catch(function(err){
        res.send(err);
    })
};

module.exports = exports;