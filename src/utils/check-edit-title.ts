import { ITodo } from '../components/types';
import { checkAddTodoTitle } from './check-addtodo-title';

export function checkEditTodoTitle(newTitle: string, newOrder: number, todos: Array<ITodo>): boolean {
    if(!checkAddTodoTitle(newTitle, todos)) {
        return false
    }

    if (!newOrder) {
            alert('Box is empty, please add a "Title"..');
    return false;
    }

    return true;
}