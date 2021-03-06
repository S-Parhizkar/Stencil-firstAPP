import { Component, h, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'add-todo',
  styleUrl: 'add-todo.css',
  shadow: true,
})
export class AddTodo {
  private $textInput?: HTMLInputElement;

  //Post/add to do
  @Event({ eventName: 'add-more' }) sendTodoHandler: EventEmitter<string>;

  handleAddToDo() {
    const inputValue = this.$textInput.value;
    this.sendTodoHandler.emit(inputValue);
    this.emptyinputValue();
  }
  emptyinputValue() {
    this.$textInput.value = '';
  }

  render() {
    return (
      <div class="container ">
        <input class={'inputTodo'} type="text" placeholder='   Add your new " to do " to this list here' ref={el => (this.$textInput = el as HTMLInputElement)} />
        <button onClick={() => this.handleAddToDo()}> Add to do</button>
      </div>
    );
  }
}
