import { ITodo } from '../../components/types';
import { findHighestnumberTodos } from '../find-todos-highestnumber';


describe('findHighestnumberTodos', () => {
  const TODO_01: Readonly<ITodo> = {
    completed: true,
    id: 2,
    order: 3,
    title: 'sport',
    url: 'https://my-list-to-do.netlify.app/',
  };
  const TODO_02: Readonly<ITodo> = {
    ...TODO_01,
    order: 6,
  };
  const TODO_03: Readonly<ITodo> = {
    ...TODO_01,
    order:9,
  };

  it('should return the higest number of the all todos.order', () => {
    const result = findHighestnumberTodos([TODO_01, TODO_02, TODO_03]);
    expect(result).toEqual(9);
  });

});

// La commande: npx stencil test --spec ./src/utils/test/find-todos-highestnumber.spec.tsx --coverage
