import React, {Component} from 'react';
import TodoItem from './TodoItem';

class TodoList extends Component{
    state={
        items : []
    }

    delete=(key)=>{
        const filteredItems = this.state.items.filter((item)=>{
            return item.key !== key;
        });

        this.setState({
            items:filteredItems
        });
    };

    addList=()=>{
        this.state.items.unshift({
            text : this._inputItem.value,
            key : Date.now()
        });

        this.setState({
            items: this.state.items
        });
        
        console.log(this.state.items);
        
    }
    render(){
        return(
            <div>
                <div>
                    <input ref={ref=>this._inputItem=ref}/>
                    <button onClick={this.addList}>add</button>
                    <TodoItem items={this.state.items} delete={this.delete}/>
                </div>
            </div>
        );
    }
}

export default TodoList;