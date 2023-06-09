import * as React from 'react';
import Button from '@mui/material/Button';

export default function App() {

  // data comes from backend
  const [data, setData] = React.useState(null);

  // 
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