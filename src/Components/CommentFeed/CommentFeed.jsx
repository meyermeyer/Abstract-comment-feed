import React, { Component } from 'react';
import axios from 'axios'
import { connect } from 'react-redux'

class CommentFeed extends Component {

    sortComments = () => {
        let sortedComments = {}
        // console.log('in sort comments', this.props.reduxState.comments);
        this.props.reduxState.comments.map(comment=>{
            
            let key=comment.layerId
            // console.log('in sortComment', comment.layerId)
            if (sortedComments[key]) {
                console.log('key exists', sortedComments[key]);
                
                sortedComments = {
                    ...sortedComments,
                    [key]: [...sortedComments[key], comment]
                }   
            }
            else {
                console.log('key does not exist', key);
                
                sortedComments = {
                    ...sortedComments,
                    [key]: [comment]
                }
            }
            
            
        })
        console.log('sortedComments', sortedComments);
        
    }

    componentDidUpdate(){
        this.props.reduxState.comments && this.sortComments()
    }

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