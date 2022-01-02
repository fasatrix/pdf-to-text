import { pdfToText, IConversionOptions } from '../index';

describe.only('Text from rotated PDF', () => {
  const options: IConversionOptions = {
    rotationDegree: -90,
  };
  it('it should output the expected text', async () => {
    const text = await pdfToText('./src/__tests__/pdf-files/downloadedLabel.pdf', options);
    expect(text?.includes('969 MARKET ST')).toBe(true);
  });
});
