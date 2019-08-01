const commentsReducer = (state = [], action) => {
    if (action.type === 'STORE_COMMENTS') {
        return action.payload
    }
    else {
        return state
    }
};

export default commentsReducer;