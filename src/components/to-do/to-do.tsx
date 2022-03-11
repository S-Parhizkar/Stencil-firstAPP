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
    <div class='outDiv'>
      <div><span>TITLE:</span> {this.todo.title}</div>
      <div><span>Order: </span> {this.todo.order}</div>
      <div><span>ID:</span> {this.todo.id}</div>
      <div><span>Is completed? : </span> {this.todo.completed ? 'YES' : 'NO'}</div>
      <div><span>URL: </span> {this.todo.url}</div>
      <label>
        Check if you've done :
        <input type="checkbox" checked={this.todo.completed} onClick={() => this.handleChange()} />
      </label>
<hr />
      <button class="editbtn" onClick={() => this.handleTodoToUpdate()}>Edit
      </button>

      <button class="delete" onClick={() => this.handleDelete()}>delete
      </button>
    </div>
  );
}
}
