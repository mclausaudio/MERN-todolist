import React from  'react';
import './TodoItem.css';

const TodoItem = ({name, completed, onDelete, onToggle}) => (
    <li className="todo-item">
        <span
            style={{
                textDecoration: completed ? 'line-through' : 'none'
                }}
            onClick={onToggle}
        >
            {name}
        </span>
        <span onClick={onDelete}> X </span>
    </li>
)

export default TodoItem;