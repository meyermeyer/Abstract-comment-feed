import React, { Component } from 'react';
import axios from 'axios'
import { connect } from 'react-redux'

class CommentFeed extends Component {

    render(){
        return (
            <>
                <h3>Comments</h3>
                {this.props.reduxState.comments && this.props.reduxState.comments.map((comment, i)=>(
                    <li key={i}>{comment.body}</li>
                ))}
            </>
            
            
        )
    }
        
    
}


const mapStateToProps = reduxState => ({
    reduxState
});
export default connect(mapStateToProps)(CommentFeed);