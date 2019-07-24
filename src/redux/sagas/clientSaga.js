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
        console.log('error in fetchPreview', err);

    }
}

function* fetchPreview(action) {
    try {
        console.log('in fetchPreview', action.payload);
        let preview
        async function getPreview() {
            preview = await action.payload.client.previews.url({
                projectId: "616daa90-1736-11e8-b8b0-8d1fec7aef78",
                branchId: "master",
                // fileId: "51DE7CD1-ECDC-473C-B30E-62AE913743B7",
                // pageId: "7D2D2599-9B3F-49BC-9F86-9D9D532F143A",
                // layerId: "CA420E64-08D0-4B96-B0F7-75AA316B6A19",
                sha: "latest" // or sha: "latest"
            });
        }
        yield getPreview()
        console.log('preview', preview)

        
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