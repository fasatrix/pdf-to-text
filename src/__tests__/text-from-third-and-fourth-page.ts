import { pdfToText, IConversionOptions } from '../index';

describe('Text from the third and fourth page', () => {
  const options: IConversionOptions = {
    firstPageToConvert: 3,
    lastPageToConvert: 4,
  };
  it('it should have output the expected text', async () => {
    const text = await pdfToText('./src/__tests__/pdf-files/pdf-example-bookmarks.pdf', options);
    expect(text?.includes('After the PDF was created')).toBe(true);
    expect(text?.includes('Go to Start and click on Printers')).toBe(true);
  });
});
