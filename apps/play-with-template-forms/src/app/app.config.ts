import { ApplicationConfig } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [],
};

// form array keys in here are always of the form "someString_0", "note_1" etc
// so we have to split by "_" and get the second element to find its number
export function getLastNumber(arr: string[]) {
  const maxNumber = Math.max(...arr.map(val => +val.split('_')[1]));
  return maxNumber < 0 ? 0 : maxNumber + 1;
}
