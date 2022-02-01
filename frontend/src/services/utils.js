/**
* @description Provides a clean way of adding mutliple classes to an element
* @param {object} styles - the variable you imported your stylesheet to
* @param {array} classNames - a list of css class names you want to add to the element from the stylesheet
* @returns {string} a string of space separated css module class names from your stylesheet
*/
export function getClasses(styles, classNames) {
    if (classNames && classNames.length > 0 && styles) {
        const classes = classNames.map((className) => {
            if (className in styles) {
                return styles[className];
            }

            return '';
        });

        return classes.join(' ');
    }

    return '';
}