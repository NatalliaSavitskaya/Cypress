import { text } from './requirements';
import { booking_testData } from '../test-data/booking.test-data';

export function genRandomText() {
  const length = 10;
  let result = '';
  const symbols = text.allowedSymbols;
  for (let i = 0; i < length; i++) {
    let randomIndex = Math.floor(Math.random() * symbols.length);
    result += symbols[randomIndex];
  }
  return result;
}

export function generatePrice() {
  return Math.floor(Math.random() * 1000) + 1;
}

export function generateDepositPaid() {
  return Math.random() < 0.5;
}

export function generateValidDates() {
  const now = new Date();
  const checkinOffset = Math.floor(Math.random() * 29) + 1; // between 1 and 29 days from today
  const checkoutOffset = Math.floor(Math.random() * (checkinOffset - 28)) + 30; // from 1 day after checkin to 30 days from today
  const checkinDate = new Date(now.getTime() + checkinOffset * 24 * 60 * 60 * 1000);
  const checkoutDate = new Date(now.getTime() + checkoutOffset * 24 * 60 * 60 * 1000);
  const formatDate = (date) => date.toISOString().split('T')[0];
  return {
    checkin: formatDate(checkinDate),
    checkout: formatDate(checkoutDate),
  };
}

export function generateInvalidDates() {
  const now = new Date();
  const checkin = new Date(now.getTime() + Math.floor(Math.random() * 30 + 1) * 24 * 60 * 60 * 1000);
  const checkout = new Date(checkin.getTime() - Math.floor(Math.random() * 5 + 1) * 24 * 60 * 60 * 1000);
  const formatDate = (date) => date.toISOString().split('T')[0];
  return {
    checkin: formatDate(checkin),
    checkout: formatDate(checkout),
  };
}

export function generateDateInThePast() {
  const now = new Date();
  const daysInPast = Math.floor(Math.random() * 30) + 1;
  const pastDate = new Date(now.getTime() - daysInPast * 24 * 60 * 60 * 1000);
  return pastDate.toISOString().split('T')[0];
}

export function generateRandomField() {
  const randomCase = booking_testData.emptyFieldCases[Math.floor(Math.random() * booking_testData.emptyFieldCases.length)];
  return randomCase.field;
}