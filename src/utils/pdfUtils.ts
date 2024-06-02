// Utility function to render a page from a PDF document
export const renderPage = async (pageData: any) => {
  // Options to control how the text content is rendered
  const renderOptions = {
    normalizeWhitespace: false,
    disableCombineTextItems: false
  };

  // Extract the text content from the page with the specified render options
  const textContent = await pageData.getTextContent(renderOptions);

  let lastY: number | null = null;
  let text = ''; 

  // Iterate over each text item in the page
  for (let item of textContent.items) {
    if (lastY === item.transform[5] || lastY === null) {
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
};
