import * as React from 'react';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import SimpleContainer from './components/containers/FluidContainer';
import BasicStack from './components/BasicStack';
import ButtonAppBar from './components/AppBar';
import BoxSx from './components/containers/Box';
import AutoGrid from './components/containers/Grid';
import {
  Card,
  Container,
  Header,
  Icon,
  Image,
  Item,
  Label,
  Menu,
  Segment,
  Step,
  Table,
} from 'semantic-ui-react'
import ResponsiveLayout from './components/ResponsiveLayout';
import BasicCard from './components/BasicCard';
import { backdropClasses } from '@mui/material';
import { grey } from '@mui/material/colors';
import BasicButtonGroup from './components/ButtonGroup';

export default function App() {

  // data 
  const [data, setData] = React.useState(null);
  const [age, setAge] = React.useState('');
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const style = {
    h1: {
      marginTop: '3em',
    },
    h2: {
      margin: '4em 0em 2em',
    },
    h3: {
      marginTop: '2em',
      padding: '2em 0em',
    },
    last: {
      marginBottom: '300px',
    },
  }


  // fonctions
  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div style={{backgroundColor:'#F7F7F7'}}>

    <div>
      <ButtonAppBar></ButtonAppBar>
    </div>

    <div style={{
      margin: 20,
      paddingLeft: 100,
      paddingRight: 100
    
      }}>      
      <AutoGrid></AutoGrid>
    </div>

    <div style={{ display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'}}>
      <Card style= {{paddingLeft: 20, padding:20, width: 1100, margin: "10px", borderRadius: "5px", backgroundColor: 'white', boxShadow: '2px 2px 0px #D7D7D7'}}>
      <h1>Salle TD1</h1>
      <p>ceci est une salle</p>
      <BasicButtonGroup></BasicButtonGroup>
      <BasicButtonGroup></BasicButtonGroup>
      </Card>
    </div>

</div>

  );
}