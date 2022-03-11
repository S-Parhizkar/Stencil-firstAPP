import { Component, h, Prop, Event, EventEmitter, } from '@stencil/core';
import { ITodo } from '../types';

@Component({
  tag: 'to-do',
  styleUrl: 'to-do.css',
  shadow: true,
})
export class ToDo {
   @Prop() todo: ITodo;

  //***** PUT /Check box ****
  @Event({ eventName: 'update-todo' }) updateTodoHandler: EventEmitter<ITodo>;
  handleChange() {
    this.updateTodoHandler.emit(this.todo);
  }

    //***** Edit request todo-to-update ****
  @Event({ eventName: 'todo-to-update' }) sendEditTodoHandler: EventEmitter<ITodo>;
  
  handleTodoToUpdate() {
    this.sendEditTodoHandler.emit(this.todo);
  }

  //****** DELETE /Delete to do ****
  @Event({ eventName: 'delete-todo' }) deleteTodoHandler: EventEmitter<ITodo>;
  handleDelete() {
    this.deleteTodoHandler.emit(this.todo);
  }




render() {
  return (
    <div>
      <div>Title: {this.todo.title}</div>
      <div>ID: {this.todo.id}</div>
      <div>Completed: {this.todo.completed ? 'YES' : 'NO'}</div>
      <div>Order: {this.todo.order}</div>
      <div>URL: {this.todo.url}</div>
      <br />
      <label>
        Check if completed:
        <input type="checkbox" checked={this.todo.completed} onClick={() => this.handleChange()} />
      </label>
<hr />
      <button class="editbtn" onClick={() => this.handleTodoToUpdate()}>Edit
      </button>

      <button class="myButton" onClick={() => this.handleDelete()}>delete it
      </button>
      <hr />
    </div>
  );
}
}
