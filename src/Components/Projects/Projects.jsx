import React, {Component} from 'react';
import axios from 'axios'
import {connect} from 'react-redux'

import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core'

import ExpansionPanels from '../ExpansionPanels/ExpansionPanels'

const styles = theme => ({
   
});

class Projects extends Component {

   handleClick = (project) =>{
       console.log('in handleClick', project);
       //store selected project ID in redux
       this.props.dispatch({ type: 'STORE_CURRENT_PROJECT', payload: project})
       //fetch branches for chosen project 
       this.props.dispatch({ type: 'FETCH_BRANCHES', payload: { id: project.id, client: this.props.reduxState.client }})
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
                {this.props.reduxState.projects && this.props.reduxState.projects.map((project, i) => (
                    <ListItem button key={i} onClick={() => this.handleClick(project)}>
                        <ExpansionPanels project={project}/>
                    </ListItem>
                ))}
            </>
        ) 
    }   
}

const mapStateToProps = reduxState => ({
    reduxState
});

export default withStyles(styles)(connect(mapStateToProps)(Projects));