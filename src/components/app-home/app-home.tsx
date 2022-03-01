import { Component, h, State, Host } from '@stencil/core';
import { ITodo } from '../types';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
})
export class AppHome {
  @State() todos: Array<ITodo> = [];

  // @Listen('myEvent', { capture: true })
  // handleMyEvent(event: any) {
  //   console.log(event);
  // }

  async componentWillLoad() {
    fetch('https://dm-tdb-01.azurewebsites.net/api/ToDo')
      .then(response => response.json())
      .then(json => {
        this.todos = json;
        console.log('clg de json 3 ', json);
      });
  }

  render() {
    return (
      <Host>
        <span> Les APIs 'TO DO':</span>
        <hr />
        <my-button />
        <hr />
        <list-todo todos={this.todos} />
      </Host>
    );
  }
}
