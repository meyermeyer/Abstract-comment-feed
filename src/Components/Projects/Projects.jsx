import React, {Component} from 'react';
import axios from 'axios'
import {connect} from 'react-redux'

import Branches from '../Branches/Branches'
import CommentFeed from '../CommentFeed/CommentFeed'
import Files from '../Files/Files'

class Comments extends Component {

   handleClick = (project) =>{
       console.log('in handleClick', project);
       //store selected project ID in redux
       this.props.dispatch({ type: 'STORE_CURRENT_PROJECT', payload: project})
       //fetch branches for chosen project 
       this.props.dispatch({ type: 'FETCH_BRANCHES', payload: { id: project.id, client: this.props.reduxState.client }})
       //fetch comments for chosen project
    //    this.props.dispatch({type:'FETCH_COMMENTS', payload: {id: project.id, client:this.props.reduxState.client}})  
   }

    componentDidMount() {
            //call to server to get access token from .env
            axios.get('/api/token')
            .then(response=>{
                console.log('token', response.data);
                // action to saga to create an instance of Abstract client
                this.props.dispatch({type: 'FETCH_CLIENT', payload: response.data})
                // store accessToken in redux
                this.props.dispatch({type:'STORE_TOKEN', payload: response.data})
            })
            .catch(err=>{
                console.log(err)
            })
        
    }
    render(){
        console.log('redux', this.props.reduxState);
        
        return(
            <>
                <h3>Projects IDs</h3>
                <ul>
                    {this.props.reduxState.projects && this.props.reduxState.projects.map((project, i) => (
                        <li key={i}>
                            ID:{project.id} NAME:{project.name}
                            <button onClick={()=>this.handleClick(project)}>Select</button>
                        </li>
                    ))}
                </ul>
                <Branches/>
                <Files/>
                
                
            </>
            
            
        )
        

        
    }
    
}
const mapStateToProps = reduxState => ({
    reduxState
});
export default connect(mapStateToProps)(Comments);