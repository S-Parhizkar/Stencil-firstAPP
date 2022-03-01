import { newSpecPage } from '@stencil/core/testing';
import { ToDo } from '../to-do';

describe('to-do', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ToDo],
      html: `<to-do></to-do>`,
    });
    expect(page.root).toEqualHtml(`
      <to-do>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </to-do>
    `);
  });
});
