const branchesReducer = (state = [], action) => {
    if (action.type === 'STORE_BRANCHES') {
        return action.payload
    }
    else {
        return state
    }
};


export default branchesReducer;