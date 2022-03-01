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
<<<<<<< HEAD
      <div class="app-home">
        <p>
          Welcome to the new to do API. You can use the buttons to see other tasks to do. 
          To see entire "to do" list check out the docs on{' '}
          <a href="https://dm-tdb-01.azurewebsites.net/api/ToDo">To do tasks list</a> .
        </p>

        {/* <stencil-route-link url="/profile/stencil">
          <button>Profile page</button>
        </stencil-route-link> */}

        {/* <my-button text='hello'> <h1 >Hello world</h1></my-button> */}
        {/* <my-button text='fromage'> <h1>Hello world</h1></my-button>
        <my-button text='du vin'> <h1>Hello world</h1></my-button> */}
      </div>
=======
      <Host>
        <span> Les APIs 'TO DO':</span>
        <hr />
        <my-button />
        <hr />
        <list-todo todos={this.todos} />
        {/* <to-do/> */}
      </Host>
>>>>>>> Sou2
    );
  }
}
