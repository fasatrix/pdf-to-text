import { pdfToText, IConversionOptions } from '../index';

describe('Text from default settigns (the first page only)', () => {
  it('it should output the expected text', async () => {
    const text = await pdfToText('./src/__tests__/pdf-files/pdf-example-bookmarks.pdf');
    expect(text?.includes('All you have to do is to click Print')).toBe(true);
  });
});
