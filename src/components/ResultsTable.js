import React, { forwardRef, useState, useEffect} from 'react';
import MaterialTable from 'material-table';
import { AddBox } from '@material-ui/icons/';
import { ArrowDownward, Check, ChevronLeft, ChevronRight, Clear, DeleteOutline, Edit, FilterList, FirstPage, LastPage, Remove, SaveAlt, Search, ViewColumn } from '@material-ui/icons';
import { Grid, Paper, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import Tooltip from '@material-ui/core/Tooltip';

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

const ImageComponent = forwardRef(function ImageComponent(props, ref) {
  //  Spread the props to the underlying DOM element.
  return <img {...props} ref={ref}/>
});

const ResultsTable = () => {

  
  const [ data, setData] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  //<img style={{width:'300px'}} src={rowData.PHOTOURL} alt="imagen"/>
  let columns= [
    { 
      title: 'Persona', 
      field: 'ID',
      filtering:false,
    },
    { 
      title: 'Imagen', 
      field: 'PHOTOURL',
      filtering:false,
      render: rowData => (<Tooltip title="Imagen"><ImageComponent style={{width:'300px'}} src={rowData.PHOTOURL} alt="imagen"/></Tooltip>)
      
    },
    { 
      title: 'Mascara', 
      field: 'MASCARILLA',
      lookup: { 0: 'Mascara no detectada', 1: 'Mascara detectada' },
    },
    { 
      title: 'Fecha', 
      field: 'FECHA_INGRESO',
      filtering:false,
      render: rowData => <div>{new Date(rowData.FECHA_INGRESO).toLocaleDateString("en-US")}</div>
    },
  ];

  useEffect(()=>{
    const getData = async ()=>{
      try {
        const response = await
        fetch(process.env.REACT_APP_REQUEST_URI)
        .then(response=>response.json());
        console.log(response)
        setData(response);
      } catch (error) {}   
    };

    getData();
  },[]);


  if (data) {
    return (
    <Grid container item xs={12} md={12} square="true" spacing={2} style={{backgroundColor:'transparent'}} justify={'center'} alignContent='center'>
    <Grid container item spacing={2}>
      <Grid item xs={12}>
        <Paper elevation={5} style={{padding:'5vh'}}>
          <Grid container item justify={'center'} >
            <Typography variant={'h2'} style={{textTransform:'none'}}>
              Mask Detector Dashboard
            </Typography> 
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={5}>
          <Grid container item justify={'center'}>
          <Typography variant={'subtitle1'}>
            Usuarios analizados:
          </Typography> 
          </Grid>
          <Grid container item justify={'center'}>
            <Typography>
            <CameraAltIcon style={{color:'#37767A', height:'100px',width:'100px'}}/>
            </Typography>
          </Grid>
          <Grid container item justify={'center'}>
            <Typography variant={'h4'}>
            {data.length}
            </Typography>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
      <Grid container item spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper elevation={5}>
            <Grid container item justify={'center'}>
            <Typography variant={'subtitle1'}>
              Usuarios sin mascarilla:
            </Typography> 
            </Grid>
            <Grid container item justify={'center'}>
            <Typography>
              <ErrorIcon style={{color:'#F29B34', height:'100px',width:'100px'}}/>
            </Typography> 
            </Grid>
            <Grid container item justify={'center'}>
            <Typography variant={'h4'}>
            {data.filter((element)=>element.MASCARILLA === 0).length}
            </Typography>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={5}>
            <Grid container item justify={'center'}>
                <Typography variant={'subtitle1'}>
                  Usuarios con mascarilla:
                </Typography> 
            </Grid>
            <Grid container item justify={'center'}>
                <Typography>
                  <CheckCircleIcon style={{color:'#71BA51', height:'100px',width:'100px'}}/>
                </Typography> 
            </Grid>
            <Grid container item justify={'center'}>
              <Typography variant={'h4'}>
              {data.filter((element)=>element.MASCARILLA === 1).length} 
              </Typography> 
            </Grid>
          </Paper>
        </Grid>    
      </Grid>  
      <Grid container item xs={12}>
      <MaterialTable
        columns={columns}
        data={data}
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
              backgroundColor: (selectedRow === rowData.tableData.id) ? '#EE' : rowData.MASCARILLA ? '#71BA51' : '#F29B34',
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
      </Grid>
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