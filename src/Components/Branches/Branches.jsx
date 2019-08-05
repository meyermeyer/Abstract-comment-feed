import React, { Component } from 'react';
import axios from 'axios'
import { connect } from 'react-redux'

//MaterialUI
import ListItem from '@material-ui/core/ListItem';
import {Button, IconButton, Grid, Typography, withStyles} from '@material-ui/core'
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardIos'


const styles = theme => ({
    button: {
        paddingTop: 0,
        color: theme.palette.secondary.dark
    }
});

class Branches extends Component {

    handleSelect(branch){
        console.log('in handleSelect', branch);
        //store selected branch in redux
        this.props.dispatch({type: 'STORE_CURRENT_BRANCH', payload: branch})
        this.props.dispatch({ type: 'FETCH_COMMENTS', payload: { projectId: this.props.reduxState.currentProject.id, branchId: branch.id, client: this.props.reduxState.client } })
        this.props.dispatch({ type: 'FETCH_FILES', payload: { projectId: this.props.reduxState.currentProject.id, branchId: branch.id, client: this.props.reduxState.client } })
    }
    render() {
        return (
            <>
                <h3>Branches</h3>
                {this.props.reduxState.branches && this.props.reduxState.branches.map((branch,i) =>{
                    if (this.props.project.id === branch.projectId){
                        return (
                            <ListItem key={i}>
                                <Grid container>
                                    <Grid item xs={7}>
                                        <Typography>{branch.name}</Typography>
                                    </Grid>
                                    <Grid item xs={5}>
                                        <IconButton
                                            type="submit"
                                            variant="contained"
                                            // color="secondary"
                                            onClick={() => this.handleSelect(branch)}
                                            classes={this.props.classes.button}

                                        >
                                            <ArrowForwardIcon />
                                        </IconButton>
                                        {/* <Button onClick={() => this.handleSelect(branch)}>
                                            
                                        </Button> */}
                                    </Grid>
                                </Grid>
                            </ListItem> 
                        )
                    }
                })} 
            </>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

export default withStyles(styles)(connect(mapStateToProps)(Branches));