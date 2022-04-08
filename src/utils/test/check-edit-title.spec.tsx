import { ITodo } from '../../components/types';
import { checkAddTodoTitle } from '../check-addtodo-title';
import { checkEditTodoTitle } from '../check-edit-title';

describe('checkEditTodoTitle', () => {
  const TODO_01: Readonly<ITodo> = {
    completed: true,
    id: 2,
    order: 3,
    title: 'sport',
    url: 'https://my-list-to-do.netlify.app/',
  };
  const TODO_02: Readonly<ITodo> = {
    ...TODO_01,
    title: 'Hello',
  };

  it('should always heave a title and e order number so turn to true', () => {
    const result = checkEditTodoTitle('hi', 3, []);
    expect(result).toEqual(true);
  });

  it('should always be false when the edited todo box of title and order is null or undefined', () => {
    const result = !checkAddTodoTitle('hi', [TODO_01]);
    expect(result).toEqual(false);
  });

  it('should be false if New order is null', () => {
    const result = checkEditTodoTitle('hi', null, [TODO_01]);
    expect(result).toEqual(false);
  });

  it('should popup the alert of empty box for title', () => {
    const spy = jest.spyOn(global, 'alert');
    checkEditTodoTitle('hi', null, [TODO_01]);
    expect(spy).toHaveBeenCalledWith('Box is empty, please add a "Title"..');
  });
});

// La commande: npx stencil test --spec ./src/utils/test/check-edit-title.spec.tsx --coverage
