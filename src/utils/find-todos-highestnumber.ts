import { ITodo } from '../components/types';

export function findHighestnumberTodos( todos: Array<ITodo>):  number {
    const allNumOrder = todos
    .map(todo => todo.order)
    .filter(x => x !== undefined);

    let highestOrderNum = Math.max(0, ...allNumOrder);
    return highestOrderNum;
}