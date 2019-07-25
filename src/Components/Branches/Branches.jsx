import React, { Component } from 'react';
import axios from 'axios'
import { connect } from 'react-redux'


class Branches extends Component {

    handleSelect(branch){
        console.log('in handleSelect', branch);
        //store selected branch in redux
        this.props.dispatch({type: 'STORE_CURRENT_BRANCH', payload: branch})
        this.props.dispatch({ type: 'FETCH_COMMENTS', payload: { projectId: this.props.reduxState.currentProject.id, branchId: branch.id, client: this.props.reduxState.client } })
        this.props.dispatch({ type: 'FETCH_FILES', payload: { projectId: this.props.reduxState.currentProject.id, branchId: branch.id, client: this.props.reduxState.client } })
        // this.props.dispatch({type: 'FETCH_PREVIEW', payload: {projectId: this.props.reduxState.currentProject.id, branchId: branch.id, client: this.props.reduxState.client}})
    }
    render() {
        return (
            <>
                <h3>Branches</h3>
                {this.props.reduxState.branches && this.props.reduxState.branches.map((branch,i) =>{
                    return(
                        <li key={i}>
                            {branch.name}
                            <button onClick={()=>this.handleSelect(branch)}>Select</button>
                        </li>
                    )
                })}
                
            </>
        )
    }


}


const mapStateToProps = reduxState => ({
    reduxState
});
export default connect(mapStateToProps)(Branches);