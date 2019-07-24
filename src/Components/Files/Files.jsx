import React, { Component } from 'react';
import axios from 'axios'
import { connect } from 'react-redux'

import Preview from '../Preview/Preview'

class Files extends Component {
    render(){
        return (
            <>
                {this.props.reduxState.files && this.props.reduxState.files.map((file, i)=>(
                    <div key= { i }>
                        <p >{file.name}</p>
                        <Preview file={file} />
                    </div >
                    
                ))}
            </>
        )
    }

}


const mapStateToProps = reduxState => ({
    reduxState
});
export default connect(mapStateToProps)(Files);