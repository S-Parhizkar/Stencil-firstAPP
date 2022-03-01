import { newE2EPage } from '@stencil/core/testing';

describe('to-do', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<to-do></to-do>');

    const element = await page.find('to-do');
    expect(element).toHaveClass('hydrated');
  });
});
