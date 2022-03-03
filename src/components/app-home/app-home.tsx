import { Component, h, State, Host, Listen, Element } from '@stencil/core';
import { ITodo } from '../types';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
})
export class AppHome {
  @State() todos: Array<ITodo> = [];

// ****************** PUT ***************
//Listener to update check box / API
  @Listen('update-todo')
  async updateTodoListner(event: CustomEvent<ITodo>) {
    const todoUp = event.detail;
    await this.updateToDo(todoUp);
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

// ******************* POST ***************
@State() value: string;
@Element() element;

//Listener to add More "to do" to API
@Listen('addMore-todo')
async postTodoListener(event: CustomEvent<ITodo>) {
  const todoAdd = event.detail;
  console.log('1- test post from app-home')
  await this.postToDo(todoAdd);
  await this.loadTodoList();
}
//Post to add More "to do" to API
async postToDo(todo: ITodo) {
  const inputValue = this.element.getElementsByClassName('inputTodo').value;
  console.log('2- test post from app-home', inputValue )
  await fetch(todo.url, {
    method: 'POST',
    body: JSON.stringify(
      //TEST
      {
        id: 3333,
        title: "get lunch",
        completed: true,
        order: 1,
        url: "https://dm-tdb-01.azurewebsites.net/api/todo/1960"
      }
    ),
  })
  .then(response => console.log(response))
    .catch(err => console.log(err))
}

// ********************* DELETE ***************
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

  // ********************* LOADING ***************
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
