import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { ToDo } from '../to-do';

describe('to-do', () => {
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
      components: [ToDo],
      template: () => <to-do todo={todo}></to-do>,
    });
    await page.waitForChanges();
  })

it('render', ()=>{
  expect(page.root).toMatchSnapshot();
})

it('should emit [update-todo] event to check once clicked on check nox ', async () => {
  const myMock = jest.fn();
  page.body.addEventListener('update-todo', myMock);
  (page.root.shadowRoot.querySelector('input#checkbox') as HTMLInputElement).click();
  await page.waitForChanges();
  expect(myMock).toBeTruthy()
  })

it('should emit [todo-to-update] event open [edit-tood] modal once clicked on edit button', async () => {
  const myMock = jest.fn();
  page.body.addEventListener('todo-to-update', myMock);
  (page.root.shadowRoot.querySelector('button.editbtn') as HTMLInputElement).click();
  await page.waitForChanges();
  expect(myMock).toHaveBeenCalledWith(expect.objectContaining({detail:todo}));
})

it('should emit [delete-todo] event to delete the todo once clicked on delete button', async () => {
  const myMock = jest.fn();
  page.body.addEventListener('delete-todo', myMock);
  (page.root.shadowRoot.querySelector('button.delete') as HTMLInputElement).click();
  await page.waitForChanges();
  expect(myMock).toBeNull();
})
 
});
