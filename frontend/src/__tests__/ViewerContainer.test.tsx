import { render, screen } from '@testing-library/react';
import ViewerContainer from '../components/ViewerContainer';

describe('ViewerContainer', () => {
  test('renders without crashing', () => {
    render(
      <ViewerContainer
        fileURL="test.pdf"
        text="Sample text"
        loading={false}
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
        fileURL={null}
        text=""
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
        fileURL="test.pdf"
        text="Sample text"
        loading={false}
        handleCopy={() => {}}
        handleDownload={() => {}}
      />
    );
    expect(screen.getByText('Sample text')).toBeInTheDocument();
  });
});
