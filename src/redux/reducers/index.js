import { combineReducers } from 'redux';
import token from './tokenReducer';
import client from './clientReducer'
import projects from './projectsReducer'
import currentProject from './currentProjectReducer'
import comments from './commentsReducer'
import branches from './branchesReducer'
import files from './filesReducer'
import currentBranch from './currentBranchReducer'


// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
    token, // stores API access token
    client, // stores Abstract client
    projects, //stores all projects
    currentProject, //stores data for selected project
    comments, // stores all comments for selected branch of selected project
    branches, // stores all branches for chosen project
    files, // stores all files for chosen branch
    currentBranch, //stores data for current branch
});

export default rootReducer;
