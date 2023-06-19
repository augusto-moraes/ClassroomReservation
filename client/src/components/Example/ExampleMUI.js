import * as React from 'react';
import Button from '@mui/material/Button';

export default function ExampleMUI() {

  // data comes from backend
  const [data, setData] = React.useState(null);
  

  // fetches data from backend (port 3001) and saves it in session as "data", to be displayed in the button
  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div>
      <Button variant="contained">{!data ? "Loading..." : data}</Button>
    </div>
  );
}