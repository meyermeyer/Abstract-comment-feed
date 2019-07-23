// Import the SDK client
import * as Abstract from "abstract-sdk";
import axios from 'axios'


// Create a client
const client = new Abstract.Client({
    // Specify a specific transport for demo purposes
    transportMode: "api",
    // accessToken: ,
    apiUrl: "https://cors-anywhere.herokuapp.com/api.goabstract.com"
});


export async function getAllProjects() {
    // Query all projects
    const projects = await client.projects.list().catch(error => {
        console.log('error', error)
        return error;
    });
    console.log('projects', projects);
    

    return projects;
}

// run();