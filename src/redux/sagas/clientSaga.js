import axios from 'axios';
import { put, takeEvery, select, all } from 'redux-saga/effects';
import * as selectors from './selectors';
import * as Abstract from 'abstract-sdk';

function* fetchBranches(action){
    try {
        let branches = []
        async function getBranches() {
            branches = await action.payload.client.branches.list({ projectId: action.payload.id })
            return branches
        }
        yield getBranches()
        yield put({type: 'STORE_BRANCHES', payload: branches})
    }
    catch(error){
        console.log('error in fetchBranches saga', error);
        
    }
}
function* fetchClient(action) {
    try {
        const client = yield new Abstract.Client({
            // Specify a specific transport for demo purposes
            transportMode: "api",
            accessToken: action.payload,
            //bypass CORS restrictions (doesn't work for preview URL)
            apiUrl: "https://cors-anywhere.herokuapp.com/api.goabstract.com"
        });
        yield put({type:'STORE_CLIENT', payload: client})
        yield put({type: 'FETCH_PROJECTS', payload: client})
    }
    catch (error) {
        console.log('in fetchClient saga', error)
    }
}

function* fetchComments(action){
    try {
        let comments = [];
        async function getAllComments() {
            comments = await action.payload.client.comments.list({projectId:action.payload.projectId, branchId: action.payload.branchId})
            return comments
        }
        yield getAllComments();
        yield put({type:'STORE_COMMENTS', payload: comments})
    }
    catch(err){
        console.log('error in fetchCommentsSaga', err);
    }
}

function* fetchCommits(action) {
    try {
        console.log('in fetchCommits', action.payload)
        let commit
        async function getCommit() {
            commit = await action.payload.client.commits.info({
                projectId: action.payload.projectId,
                branchId: action.payload.branchId,
                sha: action.payload.sha
            })
        }
        yield getCommit();
        yield put({type: 'STORE_COMMITS', payload: commit})
    }
    catch(err){
        console.log('error in fetchCommit', err)
    }
}

function* fetchFiles(action) {
    try {
        let files = []
        async function getFiles() {
            files = await action.payload.client.files.list({
                projectId: action.payload.projectId,
                branchId: action.payload.branchId,
                sha: "latest"
            });
        }
        yield getFiles()
        yield put({type: 'STORE_FILES', payload: files})
    }
    catch (err) {
        console.log('error in fetchFiles', err);
    }
}

function* fetchPreview(action) {
    try {
        let preview
        async function getPreview() {
            preview = await action.payload.client.previews.url({
                projectId: action.payload.projectId,
                branchId: action.payload.branchId,
                fileId: action.payload.fileId,
                pageId: action.payload.pageId,
                layerId: action.payload.layerId,
                sha: action.payload.sha
            });
        }
        yield getPreview()
        yield put ({type: 'STORE_PREVIEW_BLOB', payload: {preview: preview, sha: action.payload.sha}}) 
    }
    catch(err){
        console.log('error in fetchPreview', err);
    }
}

function* fetchProjects(action) {
    try {
        let projects=[];
        async function getAllProjects() {
            // Query all projects
            projects = await action.payload.projects.list().catch(error => {
                console.log('error', error)
                return error;
            });
            return projects;
        }
        
        yield getAllProjects()
        yield put({type: 'STORE_PROJECTS', payload: projects})
    }
    catch(err) {
        console.log('error in fetchProjectsSaga', err);
        async function waitForReset() {
            if (err instanceof Abstract.RateLimitError) {
                // Query all projects again
                setTimeout(async() => {
                    const projects = await action.payload.projects.list();
                },
                    // Wait until the rate limit resets
                    err.data.resetsAt - Date.now());
            }
        }
        yield waitForReset();
    }
}

function* clientSaga() {
    yield takeEvery('FETCH_BRANCHES', fetchBranches)
    yield takeEvery('FETCH_CLIENT', fetchClient)
    yield takeEvery('FETCH_COMMITS', fetchCommits)
    yield takeEvery('FETCH_COMMENTS', fetchComments)
    yield takeEvery('FETCH_FILES', fetchFiles)
    yield takeEvery('FETCH_PREVIEW', fetchPreview)
    yield takeEvery('FETCH_PROJECTS', fetchProjects)
}

export default clientSaga;