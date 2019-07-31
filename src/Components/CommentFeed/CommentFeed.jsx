import React, { Component } from 'react';
import axios from 'axios'
import { connect } from 'react-redux'

import {Grid, withStyles} from '@material-ui/core'

import Preview from '../Preview/Preview'

const styles = theme => ({
    container: {
        flexGrow: 1,
        padding: theme.spacing(3),
    }
});

class CommentFeed extends Component {
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
            <main className={this.props.classes.container}>
                {/* <h3>Comments</h3> */}
                {this.sortedComments && Object.values(this.sortedComments).map((commit,i)=>(
                    <Grid container>
                        <Grid item xs={6}>
                            <Preview commit={commit} i={i} key={i} />
                        </Grid>
                        <Grid item xs={6}>
                            {commit.map(comment => (
                                <p>{comment.body}</p>
                            ))}
                        </Grid>
                        
                    </Grid>
                ))}
            </main>
            
            
        )
    }
        
    
}


const mapStateToProps = reduxState => ({
    reduxState
});
export default withStyles(styles)(connect(mapStateToProps)(CommentFeed));