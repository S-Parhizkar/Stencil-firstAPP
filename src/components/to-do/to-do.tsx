import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';
import { ITodo } from '../types';

@Component({
  tag: 'to-do',
  styleUrl: 'to-do.css',
  shadow: true,
})
export class ToDo {
  @Prop() todo: ITodo;
//Check box
  @Event({ eventName: 'update-todo' }) updateTodoHandler:EventEmitter<ITodo>;
  handleChange() {
    this.updateTodoHandler.emit(this.todo);
  }
//Delete to do
  @Event({ eventName: 'delete-todo' }) deleteTodoHandler:EventEmitter<ITodo>;
  handleDelet() {
    this.deleteTodoHandler.emit(this.todo);
    console.log('test 22222')
  }

  render() {
    return (
      <div>
        <div>Completed: {this.todo.completed ? 'YES' : 'NO'}</div>
        <div>ID: {this.todo.id}</div>
        <div>Order: {this.todo.order}</div>
        <div>Title: {this.todo.title}</div>
        <div>URL: {this.todo.url}</div>

       
          <label>
            Check if completed:
            <input type="checkbox" checked={this.todo.completed} onClick={() => this.handleChange()} />
          </label>
        
   <button class="myButton" onClick={() => this.handleDelet()}> delete it </button>
        <hr />
      </div>
    );
  }
}
