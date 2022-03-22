import { ITodo } from '../components/types';
import { checkTodoTitle } from './check-todo-title';

export function checkEditTodoTitle(newTitle: string, newOrder: number, todos: Array<ITodo>): boolean {
    if(!checkTodoTitle(newTitle, todos)) {
        return false
    }

    if (!newOrder) {
            alert('Box is empty, please add a "Title"..');
    return false;
    }

    return true;
}