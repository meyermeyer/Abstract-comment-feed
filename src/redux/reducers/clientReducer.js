const client = (state = '', action) => {
    if (action.type === 'STORE_CLIENT') {
        return action.payload
    }
    else {
        return state
    }
};


export default client;