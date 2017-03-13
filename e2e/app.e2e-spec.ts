import { GrafikaPage } from './app.po';

describe('grafika App', () => {
  let page: GrafikaPage;

  beforeEach(() => {
    page = new GrafikaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
