import currency from 'https://unpkg.com/currency.js@2.0.4/dist/currency.es.js';

const getValue = (value) => currency(value).value;

export const equals = (a, b) => getValue(a) === getValue(b);

export const add = (a, b) => currency(a).add(b).format();

export const subtract = (a, b) => currency(a).subtract(b).format();

export const sum = (moneys) => moneys.reduce(add, '$0.00');

export const divide = (value, rate) => currency(value).divide(rate).format();

export const multiply = (value, rate) =>
  currency(value).multiply(rate).format();

export const abs = (value) => Math.abs(getValue(value)).format();

export const min = (a, b) => Math.min(getValue(a), getValue(b)).format();

export const max = (a, b) => Math.max(getValue(a), getValue(b)).format();
