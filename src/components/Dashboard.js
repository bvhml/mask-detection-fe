import React from 'react';
import { Grid, CssBaseline } from '@material-ui/core';
import ResultsTable from './ResultsTable';

export const Dashboard = ({ classes }) =>{


    return (
    <Grid container component='main' className={classes.root} fixed='true' justify='center'>
    <CssBaseline />
        <ResultsTable/>
    </Grid>
    );
};

export default Dashboard;