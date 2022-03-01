import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'my-button',
  styleUrl: 'my-button.css',
  shadow: true,
})
export class MyButton {
  @Prop() text: string;

  render() {
    return (
      <div class="row">
        <input type="text" id="userInput" placeholder="add new item..." />
        <button> add </button>
      </div>
    );
  }
}
