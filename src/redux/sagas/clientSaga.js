import axios from 'axios';
import { put, takeEvery, select } from 'redux-saga/effects';
import * as selectors from './selectors';
import * as Abstract from 'abstract-sdk';

//GET stages from database
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
            comments = await action.payload.client.comments.list({projectId:action.payload.id})
            return comments
        }
        yield getAllComments();
        yield put({type:'STORE_COMMENTS', comments})
        
    }
    catch(err){
        console.log('error in fetchCommentsSaga', err);
        
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

}

export default clientSaga;