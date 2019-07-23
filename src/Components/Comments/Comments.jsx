import React, {Component} from 'react';
import axios from 'axios'
import {connect} from 'react-redux'
// import {run, getAllProjects} from '../Abstract/Abstract'
import * as Abstract from 'abstract-sdk';
require('dotenv').config();

class Comments extends Component {
   state = {
       token: '',
       projectArray:[]
   }

    // client = new Abstract.Client({
    //     // Specify a specific transport for demo purposes
    //     transportMode: "api",
    //     accessToken: this.props.reduxState.token,
    //     apiUrl: "https://cors-anywhere.herokuapp.com/api.goabstract.com"
    // });

//    async getAllProjects() {
//     // Query all projects
//     const projects = await this.client.projects.list().catch(error => {
//         console.log('error', error)
//         return error;
//     });
//     console.log('projects', projects);


//     return projects;
// }
    componentDidMount() {
            axios.get('/api/token')
            .then(response=>{
                console.log('token', response.data);
                this.props.dispatch({type: 'FETCH_CLIENT', payload: response.data})
                this.props.dispatch({type:'STORE_TOKEN', payload: response.data})
            })
            .catch(err=>{
                console.log(err)
            })
        
    }
    render(){
        console.log('redux', this.props.reduxState.promise);
        
        return(
            <>
                <h3>Projects IDs</h3>
                {this.props.reduxState.projects.map((project, i)=>(
                    <p key={i}>ID:{project.id} NAME:{project.name}</p>
                ))}
            </>
            
            
        )
        

        
    }
    
}
const mapStateToProps = reduxState => ({
    reduxState
});
export default connect(mapStateToProps)(Comments);