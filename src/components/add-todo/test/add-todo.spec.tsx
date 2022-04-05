import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { AddTodo } from '../add-todo';
import { ITodo } from '../../types';


describe('add-more', () => {
  const todo: ITodo = {
    completed: true,
    id: 2,
    order: 3,
    title: 'sport',
    url: 'https://my-list-to-do.netlify.app/',
  };

  let page: SpecPage;

  beforeEach(async ()=> {
    page = await newSpecPage({
      components: [AddTodo],
      template: () => <add-todo></add-todo>,
    });
    await page.waitForChanges();
  })

it('render', ()=>{
  expect(page.root).toMatchSnapshot();
})


it('should emit [add-more] event to add new todo once clicked on Add to do button', async () => {
  const myMock = jest.fn();
  page.body.addEventListener('add-more', myMock);
  (page.root.shadowRoot.querySelector('button') as HTMLInputElement).click();
  // (page.root.shadowRoot.querySelector('input.inputTodo') as HTMLInputElement).value = "sport" as string;
  await page.waitForChanges();

    // mockTodo.order = 100;
    expect(myMock).toHaveBeenCalledWith(expect.objectContaining({detail: ''}));
})
 
});
