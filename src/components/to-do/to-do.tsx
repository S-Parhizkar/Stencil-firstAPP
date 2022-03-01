import { Component, h, Prop } from '@stencil/core';
import { ITodo } from '../types';

@Component({
  tag: 'to-do',
  styleUrl: 'to-do.css',
  shadow: true,
})
export class ToDo {
  @Prop() todo: ITodo;
  @Prop() checked: boolean;

  handleChange() {
    return this.todoDone();
  }

  todoDone() {
    this.todo.completed === true;
    console.log('this.todo.completed', this.todo.completed);
  }

  render() {
    return (
      <div>
        <div>Completed: {this.todo.completed === true ? 'YES' : 'NO'}</div>
        <div>ID: {this.todo.id}</div>
        <div>Order: {this.todo.order}</div>
        <div>Title: {this.todo.title}</div>
        <div>URL: {this.todo.url}</div>

        <form action="">
          <label>
            Check if completed:
            <input type="checkbox" checked={this.checked} onClick={() => this.handleChange()} />
          </label>
        </form>

        <hr />
      </div>
    );
  }
}
