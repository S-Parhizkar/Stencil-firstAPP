import { Component, h, State, Host, Listen, Prop } from '@stencil/core';
import { checkEditTodoTitle } from '../../utils/check-edit-title';
import { checkTodoTitle } from '../../utils/check-todo-title';
import { ITodo } from '../types';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
})
export class AppHome {
  @State() todos: Array<ITodo> = [];
  @State() totoBeenEdited: ITodo;
  @Prop() isLoading: boolean;

  // ****************@@ Check / PUT @@*************
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
  // _____________change totoBeenEdited ____

  async changeBooleanTotoBeenEdited() {
    this.totoBeenEdited = null;
  }

  // ****************@@ Cancel Editing Title & Order /Modal  @@*************
  @Listen('cancel-modal')
  async RecievCancelEditTodoListner(event: CustomEvent<ITodo>) {
    event.detail;
    console.log('5: changeBooleanTotoBeenEdited', event.detail);
    await this.changeBooleanTotoBeenEdited();
  }

  // ****************@@ Edit Title & Order /Modal  / PUT @@*************

  //Listener to update Edit Title & Order / API
  @Listen('todo-to-update')
  async RecievEditTodoListner(event: CustomEvent<ITodo>) {
    this.totoBeenEdited = event.detail;
  }
  //Listener to update Edit Title & Order / API
  @Listen('todo-to-edit')
  async editTodoListner(event: CustomEvent<ITodo>) {
    const todoEdit = event.detail;

    if(checkEditTodoTitle(todoEdit.title, todoEdit.order, this.todos)){
       await this.editToDo(todoEdit);
       await this.loadTodoList();
       await this.changeBooleanTotoBeenEdited();
     }
     return;
  }
  //edit Edit Title & Order / API
  async editToDo(todo: ITodo) {
    await fetch(todo.url, {
      method: 'PUT',
      body: JSON.stringify(todo),
    });
  }

  // ****************@@ POST @@*************

  //Listener to add More "to do" to API
  @Listen('add-more')
  async postTodoListener(event: CustomEvent<string>) {
    let sentTitle = event.detail.trim().toUpperCase();
    const allNumOrder = this.todos
    .map(todo => todo.order)
    .filter(x => x !== undefined);

    let highestOrder = Math.max(0, ...allNumOrder);

    if (checkTodoTitle(sentTitle, this.todos)) {
      const newTodo: Partial<ITodo> = {
        title: sentTitle,
        order: highestOrder + 1,
      };
      await this.postToDo(newTodo);
      await this.loadTodoList();
    }
    return;
  }

  //Post to add More "to do" to API
  async postToDo(todo: Partial<ITodo>) {
    const url = 'https://dm-tdb-01.azurewebsites.net/api/ToDo';
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(todo),
    })
      .then(response => console.log(response))
      .catch(err => console.log(err));
  }

  // *******************@@ DELETE @@*************
  //Listener to delete check box / API
  @Listen('delete-todo')
  async deleteToDoListner(event: CustomEvent<ITodo>) {
    const todoDel = event.detail;

    await this.deleteToDo(todoDel);
    await this.loadTodoList();
    await this.changeBooleanTotoBeenEdited();
  }
  //Delete to do / API
  async deleteToDo(todo: ITodo) {
    await fetch(todo.url, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.log(err));
  }

  // ******************@@ LOADING @@*************

  async loadTodoList() {
    this.isLoading = true;
    await fetch('https://dm-tdb-01.azurewebsites.net/api/ToDo')
      .then(response => response.json())
      .then(json => {
        this.todos = json;
        this.cancelLoading();
      });
    this.todos.sort(function (firstEl: ITodo, secondEl: ITodo) {
      return secondEl.order - firstEl.order;
    });
  }

  async componentWillLoad() {
    this.loadTodoList();
  }

  cancelLoading() {
    this.isLoading = false;
  }

  // ********************* RENDERING ***************

  render() {
    return (
      <Host>
        <div class="header"></div>
        <hr />
        <add-todo />
        <hr />
        {Boolean(this.totoBeenEdited) && <edit-todo todo={this.totoBeenEdited} />}
        <hr />
        <div id={this.isLoading ? 'loader' : 'noloader'}>
          <div class="rotate"></div>
          <b>Loading ...</b>
        </div>
        <list-todo todos={this.todos} />
      </Host>
    );
  }
}
