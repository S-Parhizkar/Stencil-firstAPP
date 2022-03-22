import { ITodo } from '../components/types';

export function checkAddTodoTitle(newTitle: string, todos: Array<ITodo>): boolean {
  const hasExistingTitle = todos
  .map(todo => todo.title.trim().toUpperCase())
  .filter(title => title === newTitle)
  .length > 0;

  if (hasExistingTitle) {
    alert('This task has been already added..');
    return false;
  }
  if (!isNaN(parseFloat(newTitle))) {
    alert('The number is not allowed..');
    return false;
  }
  if (newTitle == '') {
    alert('Box is empty, please fill them..');
    return false;
  }

  return true;
}
