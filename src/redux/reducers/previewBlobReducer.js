const previewBlob = (state = {}, action) => {
    if (action.type === 'STORE_PREVIEW_BLOB') {
        return {
            ...state,
            [action.payload.sha]: action.payload.preview
        }
    }
    else {
        return state
    }
};

export default previewBlob;