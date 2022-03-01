<<<<<<< HEAD
import { Component,EventEmitter, h, Host, Prop, State } from '@stencil/core';
import { ITodo } from '../types';
=======
import { Component, h, Prop } from '@stencil/core';
>>>>>>> Sou2

@Component({
  tag: 'my-button',
  styleUrl: 'my-button.css',
  shadow: true,
})
export class MyButton {
  @Prop() text: string;
<<<<<<< HEAD
  // @State() count: number = 0;
  @State() todo: ITodo;
  // @State() todos: ITodo[]= [];
  @State() todos: Array<ITodo>= [];

  // @Event() changeTask: EventEmitter<ITodo>
  // @Listen ('changeTask', {capture: true})
  // handleClick() {
  //   this.count = this.count + 1;
  //   this.myEvent.emit()
  // }

  async componentWillRender() {
    // await fetch("https://jsonplaceholder.typicode.com/todos/1")
    await fetch("https://dm-tdb-01.azurewebsites.net/api/ToDo")
      .then(response => response.json())
      .then(json => {
        this.todos= json;
        console.log('clg de json 3 ', json);
      });
  }
=======
>>>>>>> Sou2

//   changeTaskHandler(){
//     // const event = this.changeTask.emit(todo);
//     this.changeTask.emit(this.todo);
// var j = 0;
//     if( j < this.todos.length){
//       j++
//   }else {
//     j--
//      }
//  }


  render() {
    return (
<<<<<<< HEAD
      <Host>
        {/* <h1>{this.count}</h1> */}
        {/* <p > data to do : {this.todos.length ===0 ? 'loading ... ' : this.todos }</p> */}
        
          <p> 
          <span>  Les APIs 'TO DO':</span><hr />
           {this.todos.map((todo) =>
          <div>
          <div>Completed: {todo.completed === true ? 'YES'  : 'NO'}</div>
          <div>ID: {todo.id}</div>
          <div>Order: {todo.order}</div>
          <div>Title: {todo.title}</div>
          <div>URL: {todo.url}</div>
          <hr />
        </div>
      )}</p>

       {/* <div class="controls">
    <button class="btn prev-btn" {this.changeTask.emit()}>Previous</button>
    <button class="btn next-btn" {this.changeTask.emit()}>Next</button>
  </div>

        */}
      </Host>
=======
      <div class="row">
        <input type="text" id="userInput" placeholder="add new item..." />
        <button> add </button>
      </div>
>>>>>>> Sou2
    );
  }
}
