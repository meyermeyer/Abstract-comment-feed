const currentProject = (state = {}, action) => {
    if (action.type === 'STORE_CURRENT_PROJECT') {
        return action.payload
    }
    else {
        return state
    }
};

export default currentProject;