import React from "react";
import Button from "react-bootstrap/Button";

function App_copy() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App_copy">  
      <Button>
        hey
      </Button>
    </div>
  );
}

export default App_copy;