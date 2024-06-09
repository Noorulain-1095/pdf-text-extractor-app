import { render, screen } from '@testing-library/react';
import ViewerContainer from '../../components/pdf-text-extractor/PdfViewerContainer';

describe('ViewerContainer', () => {
  test('renders without crashing', () => {
    render(
      <ViewerContainer
        loading={false}
        fileURL="test.pdf"
        text="Sample text"
        handleCopy={() => {}}
        handleDownload={() => {}}
      />
    );
    expect(screen.getByText('Extracted Text:')).toBeInTheDocument();
  });

  test('displays PDF when fileURL is provided', () => {
    render(
      <ViewerContainer
        fileURL="test.pdf"
        text=""
        loading={false}
        handleCopy={() => {}}
        handleDownload={() => {}}
      />
    );
    expect(screen.getByTitle('PDF Viewer')).toBeInTheDocument();
  });

  test('displays message when fileURL is null', () => {
    render(
      <ViewerContainer
        text=""
        fileURL={null}
        loading={false}
        handleCopy={() => {}}
        handleDownload={() => {}}
      />
    );
    expect(screen.getByText('No PDF uploaded. Please upload a PDF to extract text.')).toBeInTheDocument();
  });


  test('displays extracted text when text is provided', () => {
    render(
      <ViewerContainer
        loading={false}
        fileURL="test.pdf"
        text="Sample text"
        handleCopy={() => {}}
        handleDownload={() => {}}
      />
    );
    expect(screen.getByText('Sample text')).toBeInTheDocument();
  });
});
