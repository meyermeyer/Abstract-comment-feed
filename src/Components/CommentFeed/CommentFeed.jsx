import React, { Component } from 'react';
import axios from 'axios'
import { connect } from 'react-redux'
import moment from 'moment'

import {Avatar, Grid, withStyles, Card, CardContent, CardHeader} from '@material-ui/core'

import Preview from '../Preview/Preview'

const styles = theme => ({
    container: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    avatar: {
        // backgroundColor: theme.palette.primary.main,
        backgroundColor: '#945ecf'
    },
    commentCard: {
        marginTop: '20px',
        textAlign: 'left'
    },
    header: {
        textAlign: 'left'
    },
    commentBody: {
        textAlign: 'left',
        paddingTop: '5px'
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
                {this.sortedComments && Object.values(this.sortedComments).map((commit,i)=>(
                    <Grid container>
                        <Grid item xs={8}>
                            <Preview commit={commit} i={i} key={i} />
                        </Grid>
                        <Grid item xs={4}>
                            <Card className={this.props.classes.commentCard}>
                                {commit.map(comment => (
                                    <>
                                        <CardHeader
                                            className={this.props.classes.header}
                                            avatar={
                                                <Avatar aria-label="recipe" className={this.props.classes.avatar}>
                                                    {comment.user.name[0]}
                                                </Avatar>
                                            }
                                            title={comment.user.name}
                                            subheader={moment(comment.updatedAt).format('MMMM Do YYYY, h:mm a')}
                                        />
                                        <CardContent classes={this.props.classes.commentBody}>
                                            {comment.body}
                                        </CardContent>
                                    </>
                                    
                                ))}
                            </Card>
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