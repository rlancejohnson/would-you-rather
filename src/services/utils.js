export function getClasses(styles, classNames) {
    if (classNames && classNames.length > 0 && styles) {
        const classes = classNames.map((className) => {
            if (className in styles) {
                return styles[className]
            }

            return ''
        })

        return classes.join(' ')
    }

    return ''
}