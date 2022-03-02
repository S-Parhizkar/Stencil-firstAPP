import { Component, h, Prop, State } from '@stencil/core';
import { ITodo } from '../types';


@Component({
  tag: 'my-button',
  styleUrl: 'my-button.css',
  shadow: true,
})
export class MyButton {
  @Prop() text: string;
  // @State() count: number = 0;
  @State() todo: ITodo;
  // @State() todos: ITodo[]= [];
  @State() todos: Array<ITodo>= [];

  

  async componentWillRender() {
    // await fetch("https://jsonplaceholder.typicode.com/todos/1")
    await fetch("https://dm-tdb-01.azurewebsites.net/api/ToDo")
      .then(response => response.json())
      .then(json => {
        this.todos= json;
        console.log('clg de json 3 ', json);
      });
  }


  render() {
    return (

      <div class="row">
        <input type="text" id="userInput" placeholder="add new item..." />
        <button> add </button>
      </div>
    );
  }
}
