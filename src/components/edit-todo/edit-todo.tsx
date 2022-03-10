import { Component, h, Prop, Event, EventEmitter, Listen, State } from '@stencil/core';
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

  handleEditTodo(todo: ITodo) {
    const title = this.$textInputEditTitle.value;
    const order = Number(this.$textInputEditOrder.value);
    const newTodo = {
      ...this.todo,
      title,
      order,
    };
    this.editTodoHandler.emit(newTodo );
    console.log(todo)
    // this.emptyeditInputValue();
  }
  // Empty input
  // emptyeditInputValue() {
  //   this.$textInputEditTitle.value = '';
  //   this.$textInputEditOrder.value = '';
  // }


  render() {
    return (
      <div class= 'modal'>
        <h3>You can edit your 'to do's content from here: </h3>

        <hr />
        <div class='body'>
          <label class="label">
            <b>Replace your target 'to do's Title :</b>
          </label>
          <input
            class='inputPop'
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
            class='inputPop'
            type="number"
            placeholder="can change ORDER"
            name="order"
            required
            value={this.todo?.order}
            ref={el => (this.$textInputEditOrder = el as HTMLInputElement)}
          />
          <h5> ID : {this.todo.id}</h5>

          <button type="submit" class='confirm' onClick={() => this.handleEditTodo(this.todo)}>
            Confirm
          </button>
        </div>
      </div>
    );
  }
}
