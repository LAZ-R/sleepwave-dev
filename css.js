import * as FILTER from './js/utils/filter/filter.js';

export const applyColorFilterOnElement = (element, hexValue) => {
    element.setAttribute('style', `filter: ${FILTER.getFilterStringForHexValue(hexValue)}`);
}



export const getCssRootVariableValue = (variableName) => {
    const root = document.querySelector(':root');
    var roots = getComputedStyle(root);
    let value = roots.getPropertyValue(`${variableName}`);
    if (value.charAt(0) == " ") {
        value = value.slice(1, (value.length));
    }
    return value;
}

export const getRootColorFilterValue = (rootVariableName) => {
    return `${getFilterStringForHexValue(getCssRootVariableValue(rootVariableName))}`;
}