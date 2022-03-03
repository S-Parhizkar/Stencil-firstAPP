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

  //** find all orders and filter all undefined */
  // const allOrder = this.todos.map((todo) => todo.order);  //out :all orders
  // const allNumOrder = allOrder.filter((x) => x !== undefined); 
  // The same as below => 
  const allNumOrder = this.todos
    .map((todo) => todo.order)
    .filter(x => x !== undefined);
  //** find highest order */
  let highestOrder : number = Math.max(...allNumOrder);
//** initializing the order by adding 1 to highest order*/
    const newTodo : Partial<ITodo> = {
      title: sentTitle,
      order: highestOrder + 1
    };
  await this.postToDo(newTodo);
  await this.loadTodoList();
}

//Post to add More "to do" to API
async postToDo(todo: Partial<ITodo>) {
  const url = 'https://dm-tdb-01.azurewebsites.net/api/ToDo'
  await fetch(url, {    
    method: 'POST',
    body: JSON.stringify(todo),
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


// ********************* LOADING ***************
  async loadTodoList() {
  // let highestOrder : number = Math.max(...this.todos.map((todo) => todo.order));

    await fetch('https://dm-tdb-01.azurewebsites.net/api/ToDo')
      .then(response => response.json())
      .then(json => {
        this.todos= json;
      });
      this.todos.sort(function (firstEl: ITodo, secondEl:ITodo) {
        return secondEl.order - firstEl.order;
      });
  }

  async componentWillLoad() {
    this.loadTodoList();
  }

  // ********************* RENDERING ***************

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
