import { pdfToText, IConversionOptions } from '../index';

describe.only('Text from rotated PDF', () => {
  let options: IConversionOptions = {
    rotationDegree: -90,
  };
  it('it should have output the expected text', async () => {
    const text = await pdfToText('./src/__tests__/pdf-files/downloadedLabel.pdf', options);
    console.log(text);
    expect(text?.includes('969 MARKET ST')).toBe(true);
  });
});
