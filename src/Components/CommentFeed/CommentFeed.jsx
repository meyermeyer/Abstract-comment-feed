import React, { Component } from 'react';
import axios from 'axios'
import { connect } from 'react-redux'

import Preview from '../Preview/Preview'

class CommentFeed extends Component {
    // state = {
    //     sortedComments: {}
    // }
    sortedComments
    sortComments = () => {
        let sortedComments = {}
        // console.log('in sort comments', this.props.reduxState.comments);
        this.props.reduxState.comments.map(comment=>{
            
            let key=comment.commitSha
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
        this.sortedComments = sortedComments
        console.log('sortedComments', this.sortedComments);
        
        
    }

    componentDidUpdate(){
        this.props.reduxState.comments && this.sortComments()
    }

    render(){
        return (
            <>
                {/* <h3>Comments</h3> */}
                {this.sortedComments && Object.values(this.sortedComments).map((commit,i)=>(
                    <>
                        <Preview commit={commit} i={i} key={i}/>
                        {commit.map(comment=>(
                            <p>{comment.body}</p>
                        ))}
                    </>
                ))}
                {/* {this.props.reduxState.comments && this.props.reduxState.comments.map((comment, i)=>(
                    <li key={i}>{comment.body}</li>
                ))} */}
            </>
            
            
        )
    }
        
    
}


const mapStateToProps = reduxState => ({
    reduxState
});
export default connect(mapStateToProps)(CommentFeed);