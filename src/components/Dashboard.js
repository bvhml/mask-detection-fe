import React from 'react';
import { Grid, CssBaseline } from '@material-ui/core';
import ResultsTable from './ResultsTable';

export const Dashboard = ({ classes, mobile }) =>{
    return (
    <Grid container component='main' className={classes.root} fixed='true' justify='center' style={{padding: mobile ? '6vh':'0'}}>
    <CssBaseline />
        <ResultsTable mobile={mobile}/>
    </Grid>
    );
};

export default Dashboard;