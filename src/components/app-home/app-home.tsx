import { Component, h, State, Host, Listen } from '@stencil/core';
import { ITodo } from '../types';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
})
export class AppHome {
  @State() todos: Array<ITodo> = [];


  @Listen("update-todo") 
  async updateTodoListner(event: CustomEvent<ITodo>){
    const todo = event.detail;
    await this.updateToDo(todo);
    await this.loadTodoList()
  }

  async updateToDo(todo: ITodo) {
    todo.completed = !todo.completed
    await fetch(todo.url, {
    method: 'PUT',
    body: JSON.stringify(todo)
    });
  }


 async loadTodoList(){
    await fetch('https://dm-tdb-01.azurewebsites.net/api/ToDo')
    .then(response => response.json())
    .then(json => {
      this.todos = json;
    });

  }


  async componentWillLoad() {
    this.loadTodoList()
  }


  render() {
    return (

      <Host>
        <span> Les APIs 'TO DO':</span>
        <hr />
        <my-button />
        <hr />
        <list-todo todos={this.todos} />
        {/* <to-do/> */}
      </Host>


    );
  }
}
