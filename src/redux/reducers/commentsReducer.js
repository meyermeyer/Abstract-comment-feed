const commentsReducer = (state = [], action) => {
    if (action.type === 'STORE_COMMENTS') {
        console.log('in commentsReducer',action.payload);
        
        return action.payload
    }
    else {
        return state
    }
};


export default commentsReducer;