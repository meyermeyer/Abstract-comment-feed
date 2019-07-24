import React, { Component } from 'react';
import axios from 'axios'
import { connect } from 'react-redux'

class CommentFeed extends Component {

    componentDidMount(){
        //fetch comments for selected project
        console.log('in commentsfeed redux:', this.props.reduxState)
        // this.props.dispatch({type:'FETCH_COMMENTS', payload: {client: this.props.reduxState.client, projectId: this.props.reduxState.currentProject}})
    }
    render(){
        return (
            <p>feed here</p>
        )
    }
        
    
}


const mapStateToProps = reduxState => ({
    reduxState
});
export default connect(mapStateToProps)(CommentFeed);