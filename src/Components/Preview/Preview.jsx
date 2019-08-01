import React, { Component } from 'react';
import { connect } from 'react-redux'

import {Card, withStyles} from '@material-ui/core'


const styles = theme => ({
    image: {
        maxWidth: '75%',
        marginTop: '30px',
        marginBottom: '30px',
        padding: '20px',
        borderStyle: 'solid',
        borderColor: '#00000029',
        borderWidth: '2px',
        borderRadius: '4px'
    },
    cardContainer: {
        maxWidth: '100%',
        margin: '20px' 
    },
    header: {
        marginTop: '-23px'
    }
});

class Preview extends Component {

    componentDidMount(){
        this.props.dispatch({
            type:'FETCH_PREVIEW', 
            payload: {
                projectId: this.props.reduxState.currentProject.id, 
                branchId: this.props.reduxState.currentBranch.id, 
                layerId: this.props.commit[0].layerId,
                fileId: this.props.commit[0].fileId, 
                pageId: this.props.commit[0].pageId,
                sha: this.props.commit[0].commitSha,
                client: this.props.reduxState.client
            }
        })
        this.props.dispatch({ 
            type: 'FETCH_COMMITS', 
            payload: { 
                client: this.props.reduxState.client, 
                sha: this.props.commit[0].commitSha,
                projectId: this.props.reduxState.currentProject.id,
                branchId: this.props.reduxState.currentBranch.id, 
            }
        })
    }

    render() {
        console.log('trying to get title', this.props.commit[0].commitSha)
        return (
            <div >
                <h3 className={this.props.classes.header}>{this.props.reduxState.commits[this.props.commit[0].commitSha] && this.props.reduxState.commits[this.props.commit[0].commitSha].title}</h3>
                <Card className={this.props.classes.cardContainer}>
                    <img className={this.props.classes.image} src={this.props.reduxState.previewBlob[this.props.commit[0].commitSha]} />
                </Card>
            </div> 
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});
export default withStyles(styles)(connect(mapStateToProps)(Preview));