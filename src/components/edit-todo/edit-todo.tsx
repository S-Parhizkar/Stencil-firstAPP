import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';
import { ITodo } from '../types';

@Component({
  tag: 'edit-todo',
  styleUrl: 'edit-todo.css',
  shadow: true,
})
export class EditTodo {
  @Prop() todo: ITodo;

  //******@@@@@@@@ EDIT /edit to do (popUP) @@@@@@@@****
  
  handleFindTodo() {
  }

  private $textInputEditTitle?: HTMLInputElement;
  private $textInputEditOrder?: HTMLInputElement;
  private $textInputEditId?: HTMLInputElement;
  @Event({ eventName: 'edit-todo' }) editTodoHandler: EventEmitter<ITodo>;

  handleEditTodo() {
    const id = Number(this.$textInputEditId.value);
    const title = this.$textInputEditTitle.value;
    const order = Number(this.$textInputEditOrder.value);
    const newTodo = {
      ...this.todo,
      id,
      title,
      order,
    };
    this.editTodoHandler.emit(newTodo);
    // this.editTodoHandler.emit(this.todo);

    console.log('3- test edit Input Value', id, title, order);

    this.emptyeditInputValue();
  }

  // Empty input
  emptyeditInputValue() {
    this.$textInputEditTitle.value = '';
    this.$textInputEditId.value = '';
    this.$textInputEditOrder.value = '';
  }

// cancel all change
  // handleCanselForm() {
  //   return  this.handleEditTodo() 
  // }

  render() {
    return (
      <div class="modal">
          <h4>You can edit your 'to do' content here: </h4>
           <br />
           <label class="label">
                <b> Which ID need to change? </b>
              </label>
              <input
                class="inputPop"
                type="number"
                placeholder="Enter the ID number"
                name="id"
                required
                // value={this.todo.id}
                ref={el => (this.$textInputEditId = el as HTMLInputElement)}
                onInput={() => this.handleFindTodo()}
              />
<hr />
            <div class="body">
              <label class="label">
                <b>New Title :</b>
              </label>
              <input
                class="inputPop"
                type="text"
                placeholder="Enter the new Title"
                name="title"
                required
                // value={this.todo.title}
                ref={el => (this.$textInputEditTitle = el as HTMLInputElement)}
              />
              <br />
              <label class="label">
                <b>New order :</b>
              </label>
              <input
                class="inputPop"
                type="number"
                placeholder="Enter the new order"
                name="order"
                required
                // value={this.todo.order}
                ref={el => (this.$textInputEditOrder = el as HTMLInputElement)}
              />
              
              <button type="submit" class="send" onClick={() => this.handleEditTodo()}>
                Edit
              </button>
              {/* <button type="button" class="cancel" onClick={() => this.handleCanselForm()}>
              Cancel
              </button> */}
            </div>
          </div>

    );
  }
}
