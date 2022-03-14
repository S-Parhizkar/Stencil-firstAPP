import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';
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
      <div class="outDiv">
        <div class={this.todo.completed ? 'round' : ''}><span>TITLE:</span> {this.todo.title}</div>
        <div class={this.todo.completed ? 'round' : ''}><span>Order: </span> {this.todo.order}</div>
        <div class={this.todo.completed ? 'round' : ''}><span>ID:</span> {this.todo.id}</div>
        <div class={this.todo.completed ? 'round' : ''}><span>Completed?: </span> {this.todo.completed ? 'YES, Done!' : 'Not yet!'}</div>
        <div class={this.todo.completed ? 'round' : ''}><span>URL: </span> {this.todo.url}</div>

        <div class={this.todo.completed ? 'round' : ''}>
          <input type="checkbox" id="checkbox" checked={this.todo.completed} onClick={() => this.handleChange()} />
          <label> Click here if DONE</label>
        </div>
        <hr />

        <div class='container'>
          <button class="editbtn" onClick={() => this.handleTodoToUpdate()}>
            Edit
          </button>
          <button class="delete" onClick={() => this.handleDelete()}>
            delete
          </button>
        </div>
      </div>
    );
  }
}
