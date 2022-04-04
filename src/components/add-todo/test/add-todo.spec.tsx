import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { AddTodo } from '../add-todo';


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
      template: () => <add-todo todo={todo}></add-todo>,
    });
    await page.waitForChanges();
  })

it('render', ()=>{
  expect(page.root).toMatchSnapshot();
})


it('should emit [add-more] event to add new todo once clicked on Add to do button', async () => {
  const myMock = jest.fn();
  page.body.addEventListener('add-more', myMock);
  (page.root.shadowRoot.querySelector('input.inputTodo') as HTMLInputElement).value = "sport" as string;
  (page.root.shadowRoot.querySelector('button') as HTMLInputElement).click();
  await page.waitForChanges();
  const mockTodo = { ...todo };
    mockTodo.title = todo.title.toUpperCase().trim();
    expect(myMock).toHaveBeenCalledWith(expect.objectContaining({detail:todo}));
})
 
});
