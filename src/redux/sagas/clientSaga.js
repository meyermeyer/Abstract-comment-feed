import axios from 'axios';
import { put, takeEvery, select } from 'redux-saga/effects';
import * as selectors from './selectors';
import * as Abstract from 'abstract-sdk';

function* fetchBranches(action){
    try {
        console.log('in fetchBranches saga', action.payload);
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
            apiUrl: "https://cors-anywhere.herokuapp.com/api.goabstract.com"
        });
        console.log('in fetchClient', client)
        yield put({type:'STORE_CLIENT', payload: client})
        yield put({type: 'FETCH_PROJECTS', payload: client})
        const currentProjectId = yield select(selectors.currentProjectId)
        console.log('trying selectors', selectors);
        
        // yield put({type:'FETCH_COMMENTS', payload: currentProjectId})
    }
    catch (error) {
        console.log('in fetchClient saga', error)
    }
}

function* fetchComments(action){
    try {
        console.log('in fetchCommentsSaga', action.payload);
        let comments = [];
        async function getAllComments() {
            comments = await action.payload.client.comments.list({projectId:action.payload.projectId, branchId: action.payload.branchId})
            console.log('in fetchComments', comments)
            return comments
        }
        yield getAllComments();
        yield put({type:'STORE_COMMENTS', payload: comments})
        
    }
    catch(err){
        console.log('error in fetchCommentsSaga', err);
        
    }
}

function* fetchFiles(action) {
    try {
        console.log('in fetchPreview', action.payload);
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
        console.log('files', files)


    }
    catch (err) {
        console.log('error in fetchFiles', err);

    }
}

function* fetchPreview(action) {
    try {
        console.log('in fetchPreview', action.payload);
        let preview
        async function getPreview() {
            preview = await action.payload.client.previews.url({
                projectId: "3ec7c0c4-6187-48be-b37d-f07e69830f77",
                branchId: "70d18c81-fe97-43a1-bb6a-ee2d1d0443af",
                fileId: "77EAA502-A7E9-4DAF-AD5B-3231089978B1",
                pageId: "0EC89917-F949-4461-A7B3-32A5201FD2A2",
                layerId: "BE149228-8EB1-4E5B-ABFD-ACA5636C595C",
                sha: "ba521ef22054ddcbe4cda6802e8ca6e4838dfafc" // or sha: "latest"
            });
        }
        yield getPreview()
        console.log('preview', preview)
        yield put ({type: 'STORE_PREVIEW_BLOB', payload: preview})

        
    }
    catch(err){
        console.log('error in fetchPreview', err);
        
    }
}

function* fetchProjects(action) {
    try {
        console.log('in fetchProjectsSaga', action.payload);
        let projects=[];
        async function getAllProjects() {
            // Query all projects
            projects = await action.payload.projects.list().catch(error => {
                console.log('error', error)
                return error;
            });
            console.log('projects', projects);
            return projects;
        }
        yield getAllProjects()
        yield put({type: 'STORE_PROJECTS', payload: projects})
    }
    catch(err) {
        console.log('error in fetchProjectsSaga', err);
        
    }
}

function* clientSaga() {
    yield takeEvery('FETCH_CLIENT', fetchClient)
    yield takeEvery('FETCH_COMMENTS', fetchComments)
    yield takeEvery('FETCH_PROJECTS', fetchProjects)
    yield takeEvery('FETCH_BRANCHES', fetchBranches)
    yield takeEvery('FETCH_FILES', fetchFiles)
    yield takeEvery('FETCH_PREVIEW', fetchPreview)
}

export default clientSaga;