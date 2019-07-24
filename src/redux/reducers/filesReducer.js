const files = (state = [], action) => {
    if (action.type === 'STORE_FILES') {
        return action.payload
    }
    else {
        return state
    }
};

export default files;
