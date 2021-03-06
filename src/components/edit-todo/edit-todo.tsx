import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';
import { ITodo } from '../types';

@Component({
  tag: 'edit-todo',
  styleUrl: 'edit-todo.css',
  shadow: true,
})
export class EditTodo {
  @Prop() todo: ITodo;

  private $textInputEditTitle?: HTMLInputElement;
  private $textInputEditOrder?: HTMLInputElement;
  @Event({ eventName: 'todo-to-edit' }) editTodoHandler: EventEmitter<ITodo>;

  handleEditTodo() {
    const title = (this.$textInputEditTitle.value).trim().toUpperCase();
    const order = Number(this.$textInputEditOrder.value);
    const newTodo = {
      ...this.todo,
      title,
      order,
    };
    this.editTodoHandler.emit(newTodo);
  }

  // Cancel button
  @Event({ eventName: 'cancel-modal' }) CancelTodoHandler: EventEmitter<null>;
  handleCancelEditTodo() {
    this.CancelTodoHandler.emit();
  }

  render() {
    return (
      <div class="modal">
        <h3>You can edit your 'to do's content from here: </h3>

        <hr />
        <div class="body">
          <label class="label">
            <b>Replace your target 'to do's Title :</b>
          </label>
          <input
            class="input-title"
            type="text"
            placeholder="can change TITLE "
            name="title"
            required
            value={this.todo?.title}
            ref={el => (this.$textInputEditTitle = el as HTMLInputElement)}
          />
          <br />
          <label class="label">
            <b>Replace your target 'to do's order :</b>
          </label>
          <input
            class="input-order"
            type="number"
            placeholder="can change ORDER"
            name="order"
            required
            value={this.todo?.order}
            ref={el => (this.$textInputEditOrder = el as HTMLInputElement)}
          />
          <h5>
            <span class="label">ID :</span> <span>{this.todo.id}</span>
          </h5>
          <hr />
          <div class="container">
            <button type="submit" class="cancel" onClick={() => this.handleCancelEditTodo()}>
              Cancel
            </button>
            <button type="submit" class="confirm" onClick={() => this.handleEditTodo()}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  }
}
