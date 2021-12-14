# PDF to Text
A pdf to text wrapper. It works with searchable and non-searchable(images) PDF 
##Prerequisite: Poppler
1)  Mac Users


        $ brew install poppler
2) Linux Users
   
       $ sudo apt-get update && sudo apt-get install poppler-utils

3) Windows Users: No installation required

##Installation

      $ npm install text-from-pdf
      $ import { pdfToText } from 'text-from-pdf';

##Usage
1) Standard Input PDF with horizontally aligned text:      
      const text await pdfToText('./src/__tests__/pdf-files/pdf-example-bookmarks.pdf');
      console.log(text)
2)  Input PDF's with vertically aligned text:

            const options: IConversionOptions = {
               rotationDegree: -90,
            };
            $ const text await pdfToText('./src/__tests__/pdf-files/pdf-example-bookmarks.pdf', options);
            $ console.log(text)
3)  Text from first and second page:

            const options: IConversionOptions = {
               firstPageToConvert: 1,
               lastPageToConvert: 2,
            };
            $ const text await pdfToText('./src/__tests__/pdf-files/pdf-example-bookmarks.pdf', options);
            $ console.log(text)
4)  Text from third to fifth page:

            const options: IConversionOptions = {
               firstPageToConvert: 3,
               lastPageToConvert: 5,
            };
            $ const text await pdfToText('./src/__tests__/pdf-files/pdf-example-bookmarks.pdf', options);
            $ console.log(text)
       
