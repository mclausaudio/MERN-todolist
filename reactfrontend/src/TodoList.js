import React, {Component} from  'react';
import TodoItem from './TodoItem.js';
import TodoForm from './TodoForm.js';

const APIURL = '/api/todos/';

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
    
    loadTodos(){
        fetch(APIURL)
        .then(resp => {
            if(!resp.ok) {
                if(resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data =>{
                        let err = {errorMessgge: data.message};
                        throw err;                  
                    })
                } else {
                    let err = {errorMessgge: 'Please try back later'}
                    throw err; 
                }
            }
            return resp.json();
        }).then(todos => this.setState({todos})) 
    }
    
    addTodo(val){
        fetch(APIURL, {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({name: val})
        })
        .then(resp => {
            if(!resp.ok) {
                if(resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data =>{
                        let err = {errorMessgge: data.message};
                        throw err;                  
                    })
                } else {
                    let err = {errorMessgge: 'Please try back later'}
                    throw err; 
                }
            }
            return resp.json();
        }).then(newTodo => {
            console.log('the value from todolist ', newTodo);
            this.setState({todos: [...this.state.todos, newTodo]});     
        });
    }
    
    deleteTodo(id) {
        const deleteURL = APIURL + id;
        fetch(deleteURL, {
            method: 'delete'
        })
        .then(resp => {
            if(!resp.ok) {
                if(resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data =>{
                        let err = {errorMessgge: data.message};
                        throw err;                  
                    })
                } else {
                    let err = {errorMessgge: 'Please try back later'}
                    throw err; 
                }
            }
            //since it's a delete request, there shouldn't be a todo to response with
            return resp.json();
        }).then(() => {
            const todos = this.state.todos.filter(t => t._id !== id);
            this.setState({todos: todos});     
        });        
        
    }
    
    toggleTodo(t){
        console.log(t._id, t.completed)
        const updateURL = APIURL + t._id;
        fetch(updateURL, {
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({completed: !t.completed})
        })
        .then(resp => {
            if(!resp.ok) {
                if(resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data =>{
                        let err = {errorMessgge: data.message};
                        throw err;                  
                    })
                } else {
                    let err = {errorMessgge: 'Please try back later'}
                    throw err; 
                }
            }
            //since it's a delete request, there shouldn't be a todo to response with
            return resp.json();
        }).then(updatedTodo => {
            //map through IDs, if the current todo id is === to our updatedTodo, flip the completed status
            // otherwise keep it the same.
            const todos = this.state.todos.map(t => 
            (t._id === updatedTodo._id)
            ? {...t, completed: !t.completed}
            : t
            )
            this.setState({todos: todos});     
        });   
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
            <div>
                <h1>Todo List</h1>
                <TodoForm addTodo={this.addTodo}/>
                <ul>
                    {todos}            
                </ul>
            </div>
        )
    }
}

export default TodoList;