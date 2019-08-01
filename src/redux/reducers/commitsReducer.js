const commits = (state = {}, action) => {
    if (action.type === 'STORE_COMMITS') {
        return {
            ...state,
            [action.payload.sha]: action.payload
        }
    }
    else {
        return state
    }
};

export default commits;