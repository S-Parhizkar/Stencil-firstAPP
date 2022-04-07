import { checkAddTodoTitle } from '../check-addtodo-title';

describe('checkAddTodoTitle', () => {
  
  const todo = {
    completed: true,
    id: 2,
    order: 3,
    title: 'sport',
    url: 'https://my-list-to-do.netlify.app/',
  };

  test('should check out if the title of new [add todo] has already exist in TODOS when we add new todo', async () => {
    const mockTodos: Array<ITodo>  = [
      {...todo, title: 'Hello'},
      {...todo, title: 'sport'},
      {...todo, title: 'hola'},
      {...todo, title: 'coucou'}
  ]
    let checkerFunctio = checkAddTodoTitle;

    expect(checkerFunctio(todo.title)).toBeEqual(mockTodos[1].title);
  
  });
});


// La commande: npx stencil test --spec ./src/utils/test/check-addtodo-title.spec.tsx --no-coverage
