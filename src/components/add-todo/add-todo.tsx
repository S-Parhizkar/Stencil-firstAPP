import { Component, h, Prop,Event, EventEmitter } from '@stencil/core';
import { ITodo } from '../types';


@Component({
  tag: 'add-todo',
  styleUrl: 'add-todo.css',
  shadow: true,
})
export class AddTodo {
  @Prop() text: string;
  @Prop() todo: ITodo;
  @Prop() value: ITodo;
 
  
  //Post/add to do
  @Event({ eventName: 'addMore-todo' }) postTodoHandler:EventEmitter<ITodo>;

  handleAddToDo() {

    //TEST 
    // this.value = {
    //   id: 3333,
    //   title: "get lunch",
    //   completed: true,
    //   order: 1,
    //   url: "https://dm-tdb-01.azurewebsites.net/api/todo/1960"
    // };
    this.postTodoHandler.emit(this.todo);
    console.log('3-- test add-todo side ', this.value);
  }

  render() {
    return (

  <div>
          <input type="text"  placeholder='Enter new " to do "'  />
          <button onClick={() => this.handleAddToDo()}> add to do</button>
  </div>
     
    );
  }
}
