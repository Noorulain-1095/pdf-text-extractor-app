import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import { act } from 'react';

describe('Header Component', () => {
  it('renders header correctly', () => {
    const handleSubmit = jest.fn();
    const handleFileChange = jest.fn();
    const file = null;

    render(<Header handleSubmit={handleSubmit} handleFileChange={handleFileChange} file={file} />);

    expect(screen.getByText('PDF Text Extractor')).toBeInTheDocument();
  });

  it('calls handleSubmit on form submission', () => {
    const handleSubmit = jest.fn();
    const handleFileChange = jest.fn();
    const file = new File(['file content'], 'file.pdf', { type: 'application/pdf' });
  
    render(<Header handleSubmit={handleSubmit} handleFileChange={handleFileChange} file={file} />);
  
    act(() => {
      userEvent.click(screen.getByText('Extract Text'));
    });
  
    expect(handleSubmit).toHaveBeenCalled();
  });
  

  it('calls handleFileChange on file input change', () => {
    const handleSubmit = jest.fn();
    const handleFileChange = jest.fn();
    const file = null;

    render(<Header handleSubmit={handleSubmit} handleFileChange={handleFileChange} file={file} />);

    const fileInput = screen.getByLabelText('Upload PDF');
    act(() => {
      userEvent.upload(fileInput, new File(['file content'], 'file.pdf', { type: 'application/pdf' }));
    });

    expect(handleFileChange).toHaveBeenCalled();
  });
});
