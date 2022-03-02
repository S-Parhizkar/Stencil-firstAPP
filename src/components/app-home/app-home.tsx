import { Component, h, State, Host, Listen } from '@stencil/core';
import { ITodo } from '../types';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
})
export class AppHome {
  @State() todos: Array<ITodo> = [];

//Listener to update check box / API
  @Listen('update-todo')
  async updateTodoListner(event: CustomEvent<ITodo>) {
    const todo = event.detail;
    await this.updateToDo(todo);
    await this.loadTodoList();
  }
//update check box / API
  async updateToDo(todo: ITodo) {
    todo.completed = !todo.completed;
    await fetch(todo.url, {
      method: 'PUT',
      body: JSON.stringify(todo),
    });
  }

  //Listener to delete check box / API
  @Listen('delete-todo')
  async deleteToDoListner(event: CustomEvent<ITodo>) {
    const todoDel = event.detail;
  
    await this.deleteToDo(todoDel);
    await this.loadTodoList();
  }
//Delete to do / API
async deleteToDo(todo: ITodo) {
  await fetch(todo.url, {
    method: 'DELETE',
    })
    .then(response => response.json()) 
    .then(response => console.log(response))
    .catch(err => console.log(err))
}

  async loadTodoList() {
    await fetch('https://dm-tdb-01.azurewebsites.net/api/ToDo')
      .then(response => response.json())
      .then(json => {
        this.todos = json;
      });
  }

  async componentWillLoad() {
    this.loadTodoList();
  }

  render() {
    return (
      <Host>
        <span> Les APIs 'TO DO':</span>
        <hr />
        <add-todo />
        <hr />
        <list-todo todos={this.todos} />
        {/* <to-do/> */}
      </Host>
    );
  }
}
