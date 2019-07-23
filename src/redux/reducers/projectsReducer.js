const projects = (state = [], action) => {
    if (action.type === 'STORE_PROJECTS') {
        return action.payload
    }
    else {
        return state
    }
};


export default projects;
