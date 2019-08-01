import React from 'react';
import {connect} from 'react-redux'


import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';


import Branches from '../Branches/Branches'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    panel: {
        backgroundColor: theme.palette.primary.light
    }

}));

function ControlledExpansionPanels(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = panel => (event, isExpanded) => {
            setExpanded(isExpanded ? panel : false);   
    };


    console.log('expansion panels', props)
    return (
        <div className={classes.root}>
            <ExpansionPanel expanded={expanded === props.project.id} onChange={handleChange(props.project.id)}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    className={classes.panel}
                >
                    <Typography className={classes.heading}>{props.project.name}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.panel}>
                    <List>
                        <Branches project={props.project}/> 
                    </List>          
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}
const mapStateToProps = reduxState => ({
    reduxState
});
export default connect(mapStateToProps)(ControlledExpansionPanels)