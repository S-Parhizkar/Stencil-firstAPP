import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { AppHome } from '../app-home';
import { ITodo } from '../../types';

describe('app-home', () => {
  const TODO_01: Readonly<ITodo> = {
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
  });

  it('render', () => {
    expect(page.root).toMatchSnapshot();
  });


  it.only('should listen [add-more] event with add-todo component when we add new todo', async () => {
    const todoUpEvent = new CustomEvent<string>('add-more', {
      detail: 'Hello'
    });
   window.fetch = jest.fn();
    page.root.dispatchEvent(todoUpEvent)
    expect(window.fetch).toHaveBeenCalled(todoUpEvent);
    expect(window.fetch).toHaveBeenCalledWith();
  });
});


// La commande: npx stencil test --spec ./src/components/app-home/test/app-home.spec.tsx --coverage