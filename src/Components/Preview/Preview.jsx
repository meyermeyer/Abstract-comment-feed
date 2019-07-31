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
        maxWidth: '400px',
        
        margin: '20px'

        
    }

});

class Preview extends Component {

    componentDidMount(){
        console.log('preview props', this.props);
        this.props.dispatch({
            type:'FETCH_PREVIEW', 
            payload: {
                projectId: this.props.reduxState.currentProject.id, 
                branchId: this.props.reduxState.currentBranch.id, 
                layerId: this.props.commit[0].layerId,
                fileId: this.props.commit[0].fileId, 
                pageId: this.props.commit[0].pageId,
                // layerId: this.props.commit[0].layerId,
                sha: this.props.commit[0].commitSha,
                client: this.props.reduxState.client
            }})
    }
    render() {
        return (
            // <div >
                <Card className={this.props.classes.cardContainer}>
                    {/* <p>{this.props.file.name}</p> */}
                    {/* <h2>{this.props.commit[0].name}</h2> */}
                    
                    <img className={this.props.classes.image} src={this.props.reduxState.previewBlob[this.props.i]} />
                    {/* <h3>Comments</h3> */}
                
                </Card>
            //</div> 
            
        )
    }

}


const mapStateToProps = reduxState => ({
    reduxState
});
export default withStyles(styles)(connect(mapStateToProps)(Preview));