import React from 'react';
import { render, fireEvent } from '@testing-library/react'; // << install this
import '@testing-library/react/cleanup-after-each';

import App from './App';

it('should reset balls and strikes on strikeout', () => {
  const { getByText } = render(<App />);
  const button = getByText(/STRIKE/);
  fireEvent.click(button);
  fireEvent.click(button);
  fireEvent.click(button);
  expect(getByText(/balls: 0/i)).toBeTruthy();
  expect(getByText(/strikes: 0/i)).toBeTruthy();
});

it('should reset balls and strikes on hit', () => {
  const { getByText } = render(<App />);
  const button = getByText(/HIT/);
  fireEvent.click(button);
  expect(getByText(/balls: 0/i)).toBeTruthy();
  expect(getByText(/strikes: 0/i)).toBeTruthy();
});

it('should increment strikes on foul with less than 2 strikes', () => {
  const { getByText } = render(<App />);
  const button = getByText(/FOUL/);
  fireEvent.click(button);
  expect(getByText(/strikes: 1/i)).toBeTruthy();
});

it('should not increment strikes on foul with 2 strikes', () => {
  const { getByText } = render(<App />);
  const button = getByText(/FOUL/);
  fireEvent.click(button);
  fireEvent.click(button);
  fireEvent.click(button);
  expect(getByText(/strikes: 2/i)).toBeTruthy();
});

it('should reset balls and strikes on walk', () => {
  const { getByText } = render(<App />);
  const button = getByText(/BALL/);
  fireEvent.click(button);
  fireEvent.click(button);
  fireEvent.click(button);
  fireEvent.click(button);
  expect(getByText(/balls: 0/i)).toBeTruthy();
  expect(getByText(/strikes: 0/i)).toBeTruthy();
});
