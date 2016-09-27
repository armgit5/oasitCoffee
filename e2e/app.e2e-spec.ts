import { OasitPage } from './app.po';

describe('oasit App', function() {
  let page: OasitPage;

  beforeEach(() => {
    page = new OasitPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
