import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { AppHome } from '../app-home';
import { ITodo } from '../../types';

describe('app-home', () => {
  const todo: ITodo = {
    completed: true,
    id: 2,
    order: 3,
    title: 'sport',
    url: 'https://my-list-to-do.netlify.app/',
  };

  let page: SpecPage;

  beforeEach(async () => {
    page = await newSpecPage({
      components: [AppHome],
      template: () => <app-home></app-home>,
    });
    await page.waitForChanges();

    // element = page.root as HTMLAppHomeElement;
    // await page.waitForChanges();

    // appHome = new AppHome();
  });

  it('render', () => {
    expect(page.root).toMatchSnapshot();
  });

  // it('should listen [update-todo] event when the todo updated /checkbox is completed', async () => {
  //   const todoUp = new CustomEvent<ITodo>('update-todo');
  //   // const listenerMock = jest.fn();
  //   page.body.addEventListener('update-todo', listenerMock);
  //   // (page.root as HTMLAppHomeElement).
  //   await page.waitForChanges(element);
  //   const mockTodo = { ...todo };
  //   mockTodo.completed = true

  //   expect(todoUp).toBeTruthy(mockTodo.completed)

  // });

  it('should listen [add-more] event with add-todo component when we add new todo', async () => {
    const todoUp = new CustomEvent<ITodo>('update-todo');
    const listenerMock = jest.fn();
  
    page.body.addEventListener('add-more', listenerMock);

  page.root.shadowRoot
  await page.waitForChanges(); 
    // const mockTodo = { ...todo };
    // mockTodo.title = todo.title.toUpperCase().trim();

    expect(listenerMock).toHaveReceivedEvent({detail: todoUp});
  });
});
