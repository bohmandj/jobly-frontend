import React from 'react';
import {
  render,
  screen,
  waitFor
} from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import App from '../App';

describe('App', () => {
  it("renders without crashing", async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  });

  it("matches snapshot", async () => {
    const { asFragment } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    await waitFor(() => expect(asFragment()).toMatchSnapshot());
  });

  it("loads homepage and displays landing page correctly", async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByText(/All the jobs in one, convenient place/i)).toBeInTheDocument());
  });
})