const currentBranch = (state = {}, action) => {
    if (action.type === 'STORE_CURRENT_BRANCH') {
        return action.payload
    }
    else {
        return state
    }
};

export default currentBranch;