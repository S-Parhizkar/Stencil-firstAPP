import { Component, h, State, Host, Listen } from '@stencil/core';
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

//Listener to add More "to do" to API
@Listen('add-more')
async postTodoListener(event: CustomEvent<string>) {
  const sentTitle = event.detail;
  console.log('1- test post from app-home', sentTitle)
  await this.postToDo(sentTitle);
  // await this.loadTodoList();
}
//Post to add More "to do" to API
async postToDo(title: string) {
  console.log('2- test post from app-home', title )
  const url = 'https://dm-tdb-01.azurewebsites.net/api/ToDo'
  await fetch(url, {    
    method: 'POST',
    body: JSON.stringify({title} as ITodo),
    // headers: {
    //   "Content-Type" : "application/json"
    // },
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
