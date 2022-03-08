import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';
import { ITodo } from '../types';

@Component({
  tag: 'edit-todo',
  styleUrl: 'edit-todo.css',
  shadow: true,
})
export class EditTodo {
  @Prop() todo: ITodo;


  //Listener to update Edit Title & Order / API
  // @Listen('todo-to-update')
  //  async RecievEditTodoListner(event: CustomEvent<ITodo>) {
  //    const todoToUpdate= event.detail;
  //    console.log('4- test receive todo Edit', todoToUpdate);
  //    await this.handleEditTodo(todoToUpdate);
  //    console.log('5-send-edit :', todoToUpdate)
  //  }
//____________________________________________________

  private $textInputEditTitle?: HTMLInputElement;
  private $textInputEditOrder?: HTMLInputElement;
  @Event({ eventName: 'edit-onetodo' }) editTodoHandler: EventEmitter<ITodo>;

  handleEditTodo(todo: ITodo) {
    const title = this.$textInputEditTitle.value;
    const order = Number(this.$textInputEditOrder.value);
    const newTodo = {
      ...this.todo,
      title,
      order,
    };
    this.editTodoHandler.emit(newTodo);
    console.log('3- test edit Input','todot:',this.todo, 'Title:' ,title,  'Order:',order);
    this.emptyeditInputValue();
  }
  // Empty input
  emptyeditInputValue() {
    this.$textInputEditTitle.value = '';
    this.$textInputEditOrder.value = '';
  }



  render() {
    return (
      <div class="modal">
        <h3>You can edit your 'to do's content from here: </h3>

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

          <button type="submit" class="confirm" onClick={() => this.handleEditTodo(this.todo)}>
            Confirm
          </button>
        </div>
      </div>
    );
  }
}
