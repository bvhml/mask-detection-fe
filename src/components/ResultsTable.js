import React, {forwardRef, useState, useEffect} from 'react';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import { ArrowDownward, Check, ChevronLeft, ChevronRight, Clear, DeleteOutline, Edit, FilterList, FirstPage, LastPage, Remove, SaveAlt, Search, ViewColumn } from '@material-ui/icons';
import { Grid, Paper } from '@material-ui/core';
import axios from 'axios';
import Skeleton from '@material-ui/lab/Skeleton';
import SampleData from 'utils/sampleData.json';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const ResultsTable = () => {

  
  //const [ programas, setProgramas ] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  
  let columns= [
    { 
      title: 'Persona', 
      field: 'persona',
      filtering:false,
    },
    { 
      title: 'Mascara', 
      field: 'mascara',
      lookup: { 0: 'Mascara no detectada', 1: 'Mascara detectada' },
    },
  ];

  useEffect(()=>{
    let signal = axios.CancelToken.source();
    const getProgramas = async ()=>{
      try {
        //const response = await ProgramaHelperMethodsInstance.buscarProgramas(signal.token);
        //setProgramas(response);
      } catch (error) {}   
    };

    getProgramas();
    
    return ()=>signal.cancel('Api is being canceled')
  },[]);


  if (true) {
    return (<Grid container item xs={12} md={12} square spacing={2} style={{backgroundColor:'transparent'}} justify={'center'} alignContent='center'>  
      
      <MaterialTable
        columns={columns}
        data={SampleData}
        stickyHeader
        icons={tableIcons}
        title="Mask detection"
        style={{padding: '3vh', width:'100%', height:'auto'}}
        onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}

        options={{
          search: false,
          filtering: true,
          searchFieldAlignment:'left',
          exportButton: true,
          pageSize: 10,
          rowStyle: rowData => ({
              backgroundColor: (selectedRow === rowData.tableData.id) ? '#EE' : rowData.mascara ? '#71BA51' : '#F29B34',
              color: 'white'
            })
          }}
        
        
          
        localization={{ 
          toolbar: { searchPlaceholder: 'Buscar' },
          body: {
              emptyDataSourceMessage: 'No hay resultados',
              filterRow: {
                  filterTooltip: 'Filter'
              }
          } 
          }}
      />
      </Grid>);
  }else{
    return (
      <Grid container item xs={12} md={12} component={Paper} elevation={0} square spacing={2} style={{backgroundColor:'transparent'}} justify={'center'} alignContent='center'>  
        <Skeleton variant="rect" style={{width:'100%', height:'100%'}} />
      </Grid>
    );
      }
}

export default ResultsTable;