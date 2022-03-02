import { Component, h, Prop } from '@stencil/core';
import { ITodo } from '../types';


@Component({
  tag: 'add-todo',
  styleUrl: 'add-todo.css',
  shadow: true,
})
export class AddTodo {
  @Prop() text: string;
  @Prop() todo: ITodo;
 
  

  render() {
    return (

      <div class="row">
        <input type="text" id="userInput" placeholder="add new item..." />
        <button> add to do</button>
      </div>
    );
  }
}
