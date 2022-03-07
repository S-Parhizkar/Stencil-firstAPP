import { newSpecPage } from '@stencil/core/testing';
import { EditTodo } from '../edit-todo';

describe('edit-todo', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [EditTodo],
      html: `<edit-todo></edit-todo>`,
    });
    expect(page.root).toEqualHtml(`
      <edit-todo>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </edit-todo>
    `);
  });
});
