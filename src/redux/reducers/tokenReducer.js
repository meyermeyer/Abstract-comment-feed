const token = (state = '', action) => {
    if (action.type === 'STORE_TOKEN'){
        return action.payload
    }
    else{
        return state
    }
};

export default token;
