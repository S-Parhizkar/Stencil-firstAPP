import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { EditTodo } from '../edit-todo';

describe('edit-todo', () => {
  const todo = {
    completed: true,
    id: 2,
    order: 3,
    title: 'sport',
    url: 'https://my-list-to-do.netlify.app/',
  };

  let page: SpecPage

  beforeEach(async () => {
    page = await newSpecPage({
      components: [EditTodo],
      template: () => <edit-todo todo={todo}></edit-todo>,
    });
    await page.waitForChanges();
  });

  it('render', () => {
    expect(page.root).toMatchSnapshot();
  });

  it('should emit [todo-to-edit] event when the todo updated is completed', async () => {
    const listenerMock = jest.fn();
    page.body.addEventListener('todo-to-edit', listenerMock);
    expect(listenerMock).not.toHaveBeenCalledWith();
    (page.root.shadowRoot.querySelector('button.confirm') as HTMLButtonElement).click();
    await page.waitForChanges();
    const mockTodo = { ...todo };
    mockTodo.title = todo.title.toUpperCase().trim();
    expect(listenerMock).toHaveBeenCalledWith(expect.objectContaining({ detail: mockTodo}));

  });

  it('should emit [todo-to-edit] event with updated todo when the todo updated is completed', async () => {
    const listenerMock = jest.fn();
    page.body.addEventListener('todo-to-edit', listenerMock);

    (page.root.shadowRoot.querySelector('input.input-order') as HTMLInputElement).value = 100 as  unknown as string;
    (page.root.shadowRoot.querySelector('button.confirm') as HTMLButtonElement).click();
    await page.waitForChanges();
    const mockTodo = { ...todo };
    mockTodo.title = todo.title.toUpperCase().trim();
    mockTodo.order = 100;
    expect(listenerMock).toHaveBeenCalledWith(expect.objectContaining({ detail: mockTodo}));

  });
});
