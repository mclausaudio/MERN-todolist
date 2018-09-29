import React, {Component} from  'react';
import TodoItem from './TodoItem.js';
import TodoForm from './TodoForm.js';
import * as apiCalls from './api'; 

import './TodoList.css';

class TodoList extends  Component {
    constructor(props) {
        super(props)
        
        this.state = {
            todos: []
        }
        
        this.addTodo = this.addTodo.bind(this);
        
    }
    
    componentWillMount() {
        this.loadTodos();
    }
    
    async loadTodos(){
        let todos = await apiCalls.getTodos();
        this.setState({todos});
    }
    
    async addTodo(val){
       let newTodo = await apiCalls.createTodo(val);
       this.setState({todos: [...this.state.todos, newTodo]});     
    }
    
    async deleteTodo(id) {
        await apiCalls.removeTodo(id);
        const todos = this.state.todos.filter(t => t._id !== id);
        this.setState({todos: todos});
    }
    
    async toggleTodo(t){
        let updatedTodo = await apiCalls.updateTodo(t);
            //map through IDs, if the current todo id is === to our updatedTodo, flip the completed status
            // otherwise keep it the same.
            const todos = this.state.todos.map(t => 
            (t._id === updatedTodo._id)
            ? {...t, completed: !t.completed}
            : t
            )
            this.setState({todos: todos});
    }
    
    render() {
        const todos = this.state.todos.map(t => (
            <TodoItem
                key={t._id}
                {...t}
                // we don't bind above in our constructor, we bind inside the TodoItem, since we need the _id, and can pass it in now
                onDelete={this.deleteTodo.bind(this, t._id)}
                onToggle={this.toggleTodo.bind(this, t)}
            />
        ));
        return (
            <div className="container">
                <h1>todo<strong>List</strong></h1>
                <h3 className="subtext">A todo list app built with React and the MERN stack</h3>
                <h4 className="subtext">Created by <a href="http://www.michaelclaus.io" target="_blank" rel="noopener noreferrer">Michael Claus</a>.</h4>
                <TodoForm addTodo={this.addTodo}/>
                <ul className="todo-list">
                    {todos}            
                </ul>
            </div>
        )
    }
}

export default TodoList;