import { Component, Host, h, Prop } from '@stencil/core';
import { ITodo } from '../types';
@Component({
  tag: 'list-todo',
  styleUrl: 'list-todo.css',
  shadow: true,
})
export class ListTodo {
  @Prop() todos: Array<ITodo> = [];

  render() {
    return (
      <Host>
        {this.todos.map(todo => (<to-do todo={todo} />
        ))}
      </Host>
    );
  }
}
