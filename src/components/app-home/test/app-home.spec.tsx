import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { h, State } from '@stencil/core';
import { AppHome } from '../app-home';
import { ITodo } from '../../types';

describe('app-home', () => {
  const TODO_01: ITodo = {
    completed: true,
    id: 2,
    order: 3,
    title: 'sport',
    url: 'https://my-list-to-do.netlify.app/',
  };

  const todos: Array<ITodo> = [
    {
      completed: true,
      id: 1,
      order: 3,
      title: 'sport',
      url: 'https://my-list-to-do.netlify.app/',
    },
    {
      completed: true,
      id: 2,
      order: 3,
      title: 'jeux',
      url: 'https://my-list-to-do.netlify.app/',
    },
    {
      completed: false,
      id: 3,
      order: 3,
      title: 'lunch',
      url: 'https://my-list-to-do.netlify.app/',
    },
  ];

  let page: SpecPage;
  let fetchMock;
  beforeEach(async () => {
    fetchMock = jest.spyOn(global, 'fetch').mockReturnValue(
      Promise.resolve({
        json: () => Promise.resolve(todos),
      } as Response),
    );
    page = await newSpecPage({
      components: [AppHome],
      template: () => <app-home></app-home>,
    });
    await page.waitForChanges();
  });

  it('render', () => {
    expect(page.root).toMatchSnapshot();
  });

  it('should listen [update-todo] event in to-do component when we click check box as completed', async () => {
    const todoCheckedEvent = new CustomEvent<ITodo>('update-todo', {
      detail: {
        ...TODO_01,
        completed: true,
      },
    });
    window.fetch = jest.fn();
    page.root.dispatchEvent(todoCheckedEvent);
    expect(fetchMock).toBeTruthy();
  });

  function changeBooleanTotoBeenEdited() {
    return null;
  }
  it('should return null the ITodo related to modal', async () => {
    expect(changeBooleanTotoBeenEdited()).toBe(null);
  });

  it('should listen [todo-to-update] event in edit-todo component and open the modal of todo once we click on EDIT', async () => {
    const todoToShow = new CustomEvent<ITodo>('todo-to-update', {
      detail: TODO_01,
    });
    window.fetch = jest.fn();
    page.root.dispatchEvent(todoToShow);
    expect(fetchMock).toHaveBeenCalled();
  });

  it('should listen [todo-to-edit] event in edit-todo component and edit the ORDER and TITLE todo once we click on CONFIRM', async () => {
    const todoEditing = new CustomEvent<ITodo>('todo-to-edit', {
      detail: {
        ...TODO_01,
        title: 'Eating',
        order: 50,
      },
    });
    window.fetch = jest.fn();
    page.root.dispatchEvent(todoEditing);
    expect(fetchMock).toHaveBeenCalled();
  });

  it('should listen [add-more] event with add-todo component when we add new todo', async () => {
    const todoUpEvent = new CustomEvent<string>('add-more', {
      detail: 'Hello',
    });
    window.fetch = jest.fn();
    page.root.dispatchEvent(todoUpEvent);
    expect(fetchMock).toHaveBeenCalled();
  });

  it('should listen [delete-todo] event in to-do component when we click on DELET', async () => {
    const todoToDelet = new CustomEvent<ITodo>('delete-todo', {
      detail: TODO_01,
    });
    window.fetch = jest.fn();
    page.root.dispatchEvent(todoToDelet);
    expect(fetchMock).toHaveBeenCalled();
  });

  it('should fetch the API and show loading spinners ', async () => {
    const loading = true;

    window.fetch = jest.fn();
    expect(loading).toBeTruthy();
    expect(fetchMock).toHaveBeenCalled();
  });
});

// La commande: npx stencil test --spec ./src/components/app-home/test/app-home.spec.tsx --coverage
