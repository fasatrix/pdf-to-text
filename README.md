# PDF-TO-TEXT
A pdf to text wrapper to extract text from a pdf. It works with searchable and non-searchable(images) PDFs

![PDF CI](https://github.com/fasatrix/pdf-to-text/actions/workflows/pdfToText.yaml/badge.svg)

### Installation
`npm install text-from-pdf`

### Mac Users
`brew install poppler`

### Linux Users
`sudo apt-get update && sudo apt-get install poppler-utils`

### Windows Users
`No installation required`

### Usage
1) Standard Input PDF with horizontally aligned text:      
      ```javasctipt
       const text = await pdfToText('<PATH_TO_PDF_FILE/fileName.pdf>');
       console.log(text)
     ```
2)  Input PDF's with vertically aligned text:
       ```javasctipt  
        const options = {
          rotationDegree: -90,
        };
        $ const text = await pdfToText('<PATH_TO_PDF_FILE/fileName.pdf>', options);
        $ console.log(text)
       ```
3)  Text from first and second page:
       ```javasctipt  
        const options = {
           firstPageToConvert: 1,
           lastPageToConvert: 2,
        };
        $ const text = await pdfToText('<PATH_TO_PDF_FILE/fileName.pdf>', options);
        $ console.log(text)
       ```javasctipt
4)  Text from third to fifth page:
       ```javasctipt  
        const options = {
           firstPageToConvert: 3,
           lastPageToConvert: 5,
        };
        $ const text = await pdfToText('<PATH_TO_PDF_FILE/fileName.pdf>', options);
        $ console.log(text)
       ```
4)  Enable Progressbar logging:
       ```javasctipt  
        const options = {
           firstPageToConvert: 1,
           lastPageToConvert: 1,
           enableProgressBarLogging: true
        };
        $ const text = await pdfToText('<PATH_TO_PDF_FILE/fileName.pdf>', options);
        $ console.log(text)
       ```    

## Features request
Fork, add your changes and create a pull request 

       
