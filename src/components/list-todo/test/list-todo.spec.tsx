import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { ListTodo } from '../list-todo';
import { ITodo } from '../../types';


describe('list-todo', () => {
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
      components: [ListTodo],
      template: () => <list-todo todo={todo}></list-todo>,
    });
    await page.waitForChanges();
  })

it('render', ()=>{
  expect(page.root).toMatchSnapshot();
})

});
