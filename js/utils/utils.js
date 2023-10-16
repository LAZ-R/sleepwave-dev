import * as FILTER from './filter/filter.js';

export const getFilterStringForHexValue = (hexValue) => {
    return FILTER.getFilterStringForHexValue(hexValue);
}

export const getRandomIntegerBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
 }