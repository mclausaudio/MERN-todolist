import React, {Component} from  'react';
import TodoItem from './TodoItem.js';

const APIURL = '/api/todos';

class TodoList extends  Component {
    constructor(props) {
        super(props)
        
        this.state = {
            todos: []
        }
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
    
    render() {
        const todos = this.state.todos.map(t =>
            <TodoItem
                key={t._id}
                {...t}
            />
        );
        return (
            <div>
                <h1>Todo List</h1>
                <ul>
                    {todos}            
                </ul>
            </div>
        )
    }
}

export default TodoList;