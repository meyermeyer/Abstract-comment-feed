import React, { Component } from 'react';
import { connect } from 'react-redux'


class Preview extends Component {

    componentDidMount(){
        console.log('preview props', this.props.commit);
        
        //fetch latest layer for preview
        // this.props.dispatch({
        //     type:'FETCH_LAYER', 
        //     payload: {
        //         projectId: this.props.reduxState.currentProject.id,
        //         branchId: this.props.reduxState.currentBranch.id,
        //         fileId: this.props.file.id,
        //         client: this.props.reduxState.client
        // }})
        this.props.dispatch({
            type:'FETCH_PREVIEW', 
            payload: {
                projectId: this.props.reduxState.currentProject.id, 
                branchId: this.props.reduxState.currentBranch.id, 
                layerId: this.props.commit[0].layerId,
                fileId: this.props.commit[0].fileId, 
                pageId: this.props.commit[0].pageId,
                layerId: this.props.commit[0].layerId,
                sha: this.props.commit[0].commitSha,
                client: this.props.reduxState.client
            }})
    }
    render() {
        return (
            <>
                {/* <p>{this.props.file.name}</p> */}
                <img src={this.props.reduxState.previewBlob}/>
            </>
        )
    }

}


const mapStateToProps = reduxState => ({
    reduxState
});
export default connect(mapStateToProps)(Preview);