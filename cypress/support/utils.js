import { text } from './requirements';

export function generateRandomText(length) {
  let result = '';
  const symbols = text.allowedSymbols;
  for (let i = 0; i < length; i++) {
    let randomIndex = Math.floor(Math.random() * symbols.length);
    result += symbols[randomIndex];
  }
  return result;
}

export function generateAdditionalNeeds() {
  return Math.random() < 0.5 ? '' : generateRandomText(10);
}

export function generateNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateBooleanValue() {
  return Math.random() < 0.5;
}

export function generateDateInRange(daysFromTodayMin, daysFromTodayMax){
  const todayDate = new Date();
  const randomOffset = Math.floor(Math.random() * (daysFromTodayMax - daysFromTodayMin + 1)) + daysFromTodayMin;
  const randomDate = new Date(todayDate.getTime() + randomOffset * 24 * 60 * 60 * 1000);
  const formatDate = (date) => date.toISOString().split('T')[0];
  return formatDate(randomDate);
}