import { Component, h, Prop,Event, EventEmitter, Element } from '@stencil/core';
import { ITodo } from '../types';


@Component({
  tag: 'add-todo',
  styleUrl: 'add-todo.css',
  shadow: true,
})
export class AddTodo {
  @Prop() text: string;
  @Prop() todo: ITodo;
  @Prop() value: string;
  @Element() element: HTMLElement;
  
  //  private textInput?: HTMLInputElement;

  //Post/add to do
  @Event({ eventName: 'addMore-todo' }) postTodoHandler:EventEmitter<ITodo>;





  handleAddToDo() {

    //JUST A TEST 
    // this.value = {
    //   id: 3333,
    //   title: "get lunch",
    //   completed: true,
    //   order: 1,
    //   url: "https://dm-tdb-01.azurewebsites.net/api/todo/1960"
    // };

    // const inputValue = this.element.getElementsByClassName('inputTodo').value;

    this.postTodoHandler.emit();
    console.log('3- test add-todo side ');
  }

  render() {
    return (

  <div>
          <input class={"inputTodo"} type="text"  placeholder='Enter new " to do "' 
          // ref={el => this.textInput = el as HTMLInputElement} 
          />
          <button onClick={() => this.handleAddToDo()}> add to do</button>
  </div>
     
    );
  }
}
