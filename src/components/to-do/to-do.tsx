import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';
import { ITodo } from '../types';

@Component({
  tag: 'to-do',
  styleUrl: 'to-do.css',
  shadow: true,
})
export class ToDo {
  @Prop() todo: ITodo;

  @Event({ eventName: 'update-todo' }) updateTodoHandler: EventEmitter<ITodo>;

  handleChange() {
    this.updateTodoHandler.emit(this.todo);
  }

  render() {
    return (
      <div>
        <div>Completed: {this.todo.completed ? 'YES' : 'NO'}</div>
        <div>ID: {this.todo.id}</div>
        <div>Order: {this.todo.order}</div>
        <div>Title: {this.todo.title}</div>
        <div>URL: {this.todo.url}</div>

        <form action="">
          <label>
            Check if completed:
            <input type="checkbox" checked={this.todo.completed} onClick={() => this.handleChange()} />
          </label>
        </form>

        <hr />
      </div>
    );
  }
}
