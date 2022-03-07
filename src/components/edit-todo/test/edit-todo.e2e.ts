import { newE2EPage } from '@stencil/core/testing';

describe('edit-todo', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<edit-todo></edit-todo>');

    const element = await page.find('edit-todo');
    expect(element).toHaveClass('hydrated');
  });
});
