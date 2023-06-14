import * as React from 'react';

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
    <p>{data ? data : "data not found"}</p>
  );
}