var mongoose = require('mongoose');
mongoose.set('debug', true);
// mongoose.connect('mongodb://mikec:todoapp1@ds155292.mlab.com:55292/todoapp');

mongoose.connect('mongodb://localhost/todo-api');

mongoose.Promise = Promise;

module.exports.Todo = require("./todo");