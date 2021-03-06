import Fs from '@supercharge/fs';
import fs from 'fs';
import Jimp from 'jimp';
import { Poppler } from 'node-poppler';
import Tesseract from 'tesseract.js';
import util from 'util';
import { progressbar } from '../src/utils/utils';

async function convertPdfToPng(
  inputFileName: string,
  outputFileName: string,
  options: IImageProps,
  path?: string,
): Promise<string | Error> {
  let poppler;
  if (path) {
    poppler = new Poppler(path);
  } else if (process.platform === 'darwin') {
    poppler = new Poppler('/usr/local/Cellar/poppler/21.12.0/bin');
  } else if (process.platform === 'linux') {
    poppler = new Poppler('/usr/bin');
  } else {
    poppler = new Poppler();
  }
  return poppler.pdfToCairo(inputFileName, outputFileName, options);
}

async function flipImage(page: number, outputFileName: string, rotationDegree: number): Promise<void> {
  await Jimp.read(`${outputFileName}-${page}.png`).then((image) => {
    image
      .rotate(rotationDegree, Jimp.RESIZE_BEZIER, (err) => {
        if (err) throw err;
      })
      .write(`${outputFileName}-${page}.png`);
  });
}
/**
 * Description: The Pdf to Text function
 * @param inputFileName: The full path to the PDF file to be converted to text
 * @param options: An object containing  properties as described in the IConversionOptions interface
 */
export async function pdfToText(inputFileName: string, options?: IConversionOptions): Promise<string | undefined> {
  const finalText: string[] = [];
  const imageOptions: IImageProps = {
    firstPageToConvert: options?.firstPageToConvert ?? 1,
    lastPageToConvert: options?.lastPageToConvert ?? 1,
    pngFile: true,
  };
  const outputFileName = `${process.cwd()}/images/${inputFileName.replace(/^.*[\\\/]/, '').split('.pdf')[0]}`;
  const makeDir = util.promisify(fs.mkdir);
  if (!(await Fs.exists(`${process.cwd()}/images/`))) await makeDir(`${process.cwd()}/images/`);
  await convertPdfToPng(inputFileName, outputFileName, imageOptions, options?.popplerFullPath);
  for (
    let i = imageOptions.firstPageToConvert ?? 1;
    i <= imageOptions.firstPageToConvert + (imageOptions.lastPageToConvert - imageOptions.firstPageToConvert);
    i++
  ) {
    await flipImage(i, outputFileName, options?.rotationDegree ?? 0);
    await Tesseract.recognize(
      `${outputFileName}-${i}.png`,
      options?.language ?? 'eng',
      options?.enableProgressBarLogging
        ? {
            logger:  (m) => {
              process.stdout.write("\u001b[3J\u001b[2J\u001b[1J");
              if (m.progress !== 1) {
                process.stdout.write(`Text extraction progress for page ${i} is at: ${progressbar(m.progress)}%`);
              }
            },
          }
        : { logger: (m) => null },
    ).then(({ data: { text } }) => {
      finalText.push(text);
    });
  }
  return finalText.join('\n');
}

interface IImageProps {
  firstPageToConvert: number;
  lastPageToConvert: number;
  pngFile: boolean;
}
export interface IConversionOptions {
  /**
   * Description: The first page to convert from the input PDF
   * @default 1
   */
  firstPageToConvert?: number;
  /**
   * Description: Last  page to convert from the input PDF
   * @default 1
   */
  lastPageToConvert?: number;
  /**
   * Description: The angle, in degrees, to be used to rotate the PDF
   * @default 0
   */
  rotationDegree?: number;
  /**
   * Description: The text regnognition language
   * @default english
   */
  language?: string;
  /**
   * Description: The full path of the Poppler installation
   * @default none - If none passed, it will be set to the platform's default installation (e.g. /usr/bin for Ubuntu etc.)
   */
  popplerFullPath?: string;
  /**
   * Description: The text recognition' logger
   * @default false - By default the logger is switched off.
   */
  enableProgressBarLogging?: boolean;
}
