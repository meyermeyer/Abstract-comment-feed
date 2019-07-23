import axios from 'axios';
import { put, takeEvery, actionChannel } from 'redux-saga/effects';
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
    }
    catch (error) {
        console.log('in fetchClient saga', error)
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
    yield takeEvery('FETCH_PROJECTS', fetchProjects)
}

export default clientSaga;