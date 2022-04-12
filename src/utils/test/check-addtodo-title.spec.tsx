import { ITodo } from '../../components/types';
import { checkAddTodoTitle } from '../check-addtodo-title';

describe('checkAddTodoTitle', () => {
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

  it('should always be true when list of todo is not provided', () => {
    const result = checkAddTodoTitle('hi');
    expect(result).toBeTruthy();
  });

  it('should always be true when list of todo is empty', () => {
    const result = checkAddTodoTitle('hi', []);
    expect(result).toEqual(true);
  });

  it('should always be true when list of todo is empty', () => {
    const result = checkAddTodoTitle('');
    expect(result).toEqual(false);
  });

  it('should always be false when the new title is existed in the list', () => {
    const result = checkAddTodoTitle('SPORT', [TODO_01]);
    expect(result).toEqual(false);
  });

  it('should always be false when the new title is a number', () => {
    const result = checkAddTodoTitle('5');
    expect(result).toEqual(false);
  });

  it('should be true when the new title does not exist in todos', () => {
    const result = checkAddTodoTitle('Going to shop', [TODO_01, TODO_02]);
    expect(result).toEqual(true);
  });

  it('should popup the alert of empty box', () => {
    const spy = jest.spyOn(global, 'alert');
    checkAddTodoTitle('');
    expect(spy).toHaveBeenCalledWith('Box is empty, please fill them..');
  });

  it('should popup the alert of forbidden number', () => {
    const spy = jest.spyOn(global, 'alert');
    checkAddTodoTitle('5');
    expect(spy).toHaveBeenCalledWith('The number is not allowed..');
  });

  it('should popup the alert existing title', () => {
    const spy = jest.spyOn(global, 'alert');
    checkAddTodoTitle('SPORT', [TODO_01]);
    expect(spy).toHaveBeenCalledWith('This task has been already added..');
  });
});

// La commande: npx stencil test --spec ./src/utils/test/check-addtodo-title.spec.tsx --coverage
