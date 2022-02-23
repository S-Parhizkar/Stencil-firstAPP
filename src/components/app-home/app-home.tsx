import { Component, h, Listen} from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true,
})
export class AppHome {

  @Listen("myEvent", {capture: true})
  handleMyEvent(event:any){
  console.log(event);}

  render() {
    return (
      <div class="app-home">
        <p>
          Welcome to the new API. You can use this starter to build entire apps all with web components using Stencil! Check out our docs on{' '}
          <a href="https://stenciljs.com">stenciljs.com</a> to get started.
        </p>

        <stencil-route-link url="/profile/stencil">
          <button>Profile page</button>
        </stencil-route-link>
        <my-button text='hello'> <h1 slot='fromage'>Hello world</h1></my-button>
        <my-button text='fromage'> <h1>Hello world</h1></my-button>
        <my-button text='du vin'> <h1>Hello world</h1></my-button>
      </div>
    );
  }
}
