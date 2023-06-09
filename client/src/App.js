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
    <div>
      <ButtonAppBar></ButtonAppBar>
      <BasicStack></BasicStack>
    </div>
  );
}