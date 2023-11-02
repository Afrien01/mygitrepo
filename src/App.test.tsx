// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './App';
; // Adjust the import path as needed

describe('App Component', () => {
  it('should render the component with a "Go Live" button', () => {
    render(<App />);
    const goLiveButton = screen.getByText('Go Live');
    expect(goLiveButton).toBeTruthy();
  });
});
