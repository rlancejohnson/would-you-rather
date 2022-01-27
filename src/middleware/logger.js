/**
* @description Redux middleware to log actions and state changes
* @param {object} store - the redux store
* @param {function} next - func to pass action to the next middleware
* @param {object} action - the redux action
* @returns {function} calls next middleware with action
*/
const logger = (store) => (next) => (action) => {
    console.group(action.type);
    console.log('the action: ', action);
    const returnValue = next(action);
    console.log('The new state: ', store.getState());
    console.groupEnd();

    return returnValue;
};

export default logger;