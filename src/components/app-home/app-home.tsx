import { Component, h, State, Host, Listen, Prop } from '@stencil/core';
import { ITodo } from '../types';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
})

export class AppHome {
  @State() todos: Array<ITodo> = [];
  @State() totoBeenEdited: ITodo
  @Prop() isLoading: boolean
  
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

async changeBooleanTotoBeenEdited(){
  this.totoBeenEdited = null;
}

  // ****************@@ Cancel Editing Title & Order /Modal  @@*************
  @Listen('cancel-modal')
  async RecievCancelEditTodoListner(event: CustomEvent<ITodo>) {
     event.detail;
    console.log('5: changeBooleanTotoBeenEdited',event.detail);
    await this.changeBooleanTotoBeenEdited();
  }

  // ****************@@ Edit Title & Order /Modal  / PUT @@*************

   //Listener to update Edit Title & Order / API
   @Listen('todo-to-update')
   async RecievEditTodoListner(event: CustomEvent<ITodo>) {
     this.totoBeenEdited= event.detail;
     console.log('4: test receive totoBeenEdited',this.totoBeenEdited);
    //  await this.editToDo(totoBeenEdited);
   }
  //Listener to update Edit Title & Order / API
  @Listen('todo-to-edit')
  async editTodoListner(event: CustomEvent<ITodo>) {
    const todoEdit = event.detail;
  console.log('8_ todo Edit', todoEdit.title)

  // const newTitle = todoEdit.title.trim().toUpperCase();
    const allTitles = this.todos.map(todo => todo.title);
    console.log('7- all title in EDIT TITLE :', allTitles)
    for (var i = 0; i < allTitles.length; i++) {
      if (todoEdit.title == allTitles[i]) {
        alert('This task has been already existed..');
        return;
      }else {
        if(todoEdit.title =='' || !todoEdit.order){
        alert('Please don\'t leave the boxes empty..');
      } else {
        await this.editToDo(todoEdit);
        await this.loadTodoList();
        await this.changeBooleanTotoBeenEdited();
      }
    }
      return;
    }
  }
  //edit Edit Title & Order / API
  async editToDo(todo: ITodo) {
    console.log('2: test todo Edit');
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
    const allNumOrder = this.todos.map(todo => todo.order).filter(x => x !== undefined);
    //** find highest order */
    let highestOrder: number = Math.max(...allNumOrder);
    //** initializing the order by adding 1 to highest order*/
    const newTodo: Partial<ITodo> = {
      title: sentTitle,
      order: highestOrder + 1,
    };

    const allTitles = this.todos.map(todo => todo.title);
    console.log('allTitles', allTitles)
    for (var i = 0; i <= allTitles.length; i++) {
      if (sentTitle == allTitles[i]) {
        alert('This task has been already existed..');
        return;
      } else {
        if (sentTitle ==''){
          alert('Box is empty, please add a "Title"..');
        }else {
        await this.postToDo(newTodo);
        await this.loadTodoList();
      }
     }
      return;
    }
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
    this.isLoading=true
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
        <div class='header' ></div>
        <hr />
        <add-todo />
        <hr />
        {Boolean(this.totoBeenEdited) && <edit-todo todo={this.totoBeenEdited} />}
        <hr />
        <div id={this.isLoading ? 'loader' : 'noloader'}> 
        <div class="rotate"></div>
        <b>Loading ...</b></div>
        <list-todo todos={this.todos} />
      </Host>
    );
  }
}
