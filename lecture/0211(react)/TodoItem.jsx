import React, {Component} from 'react';

class TodoItem extends Component{
    subDelete=(key)=>{
        this.props.delete(key);
    }

    render(){
        const li_items = this.props.items.map((item)=>{
        return <li onClick={()=>{this.subDelete(item.key)}} key={item.key}>{item.text}</li>
        });
        return(
            <ul>
                {li_items}
            </ul>
        );
    }
}

export default TodoItem;