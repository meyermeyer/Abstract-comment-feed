import { combineReducers } from 'redux';

import branches from './branchesReducer'
import client from './clientReducer'
import comments from './commentsReducer'
import commits from './commitsReducer'
import currentBranch from './currentBranchReducer'
import currentProject from './currentProjectReducer'
import files from './filesReducer'
import previewBlob from './previewBlobReducer'
import projects from './projectsReducer'
import token from './tokenReducer';


// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
    branches, // stores all branches for chosen project
    client, // stores Abstract client
    comments, // stores all comments for selected branch of selected project
    commits, //stores commits in object for chosen branch and project
    currentBranch, //stores data for current branch
    currentProject, //stores data for selected project
    files, // stores all files for chosen branch
    previewBlob, // stores blob for preview
    projects, //stores all projects
    token, // stores API access token
});

export default rootReducer;
