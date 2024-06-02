/**Utility function from pdf Parser library to render a page from a PDF document
 * This function processes the text content of a PDF page and returns the extracted text as a string
**/
export const renderPage = (pageData: any) => {
  // Options to control how the text content is rendered
  const renderOptions = {
    normalizeWhitespace: false,
    disableCombineTextItems: false
  };

  return pageData.getTextContent(renderOptions)
      .then((textContent: any) => {
          let lastY, text = '';
          for (let item of textContent.items) {
              if (lastY == item.transform[5] || !lastY) {
                  // Append a space if there's already text
                  if (text !== '') {
                      text += ' ';
                  }
                  text += item.str;
              } else {
                  text += '\n' + item.str;
              }
              lastY = item.transform[5];
          }
          return text;
      })
      .catch((error: any) => {
        console.warn('Error processing page text content:', error);
      });
};
