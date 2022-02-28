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
          Welcome to the new to do API. You can use the buttons to see other tasks to do. 
          To see entire "to do" list check out the docs on{' '}
          <a href="https://dm-tdb-01.azurewebsites.net/api/ToDo">To do tasks list</a> .
        </p>

        {/* <stencil-route-link url="/profile/stencil">
          <button>Profile page</button>
        </stencil-route-link> */}

        {/* <my-button text='hello'> <h1 >Hello world</h1></my-button> */}
        {/* <my-button text='fromage'> <h1>Hello world</h1></my-button>
        <my-button text='du vin'> <h1>Hello world</h1></my-button> */}
      </div>
    );
  }
}
