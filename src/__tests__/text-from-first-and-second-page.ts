import { pdfToText, IConversionOptions } from '../index';

describe('Text from the first and second page', () => {
  let options: IConversionOptions = {
    firstPageToConvert: 1,
    lastPageToConvert: 2,
  };
  it('it should have output the expected text', async () => {
    const text = await pdfToText('./src/__tests__/pdf-files/pdf-example-bookmarks.pdf', options);
    expect(text?.includes('All you have to do is to click Print')).toBe(true);
    expect(text?.includes('Maximum resolution: 2400 dpi')).toBe(true);
  });
});
