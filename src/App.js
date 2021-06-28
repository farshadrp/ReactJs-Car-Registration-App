import { useState, useEffect } from "react";
import Car from "./car.png";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const App = () => {
  const useStyles = makeStyles(() => ({
    textField: {
      margin: "10px 0",
      width: "30%",
      height: "50px",
    },
    app: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    },
    button: {
      margin: "10px 0",
    },
    heading: {
      textShadow: "1px 1px #1976d2",
    },
    table: {
      width: "600px",
    },
    error: {
      color: "red",
      margin: "20px 0",
    },
    tableRow: {
      cursor: "pointer",
    },
  }));
  const classes = useStyles();

  const [cars, setCars] = useState([]);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [topSpeed, setTopSpeed] = useState("");
  const [msgError, setMsgError] = useState(null);
  const [isValid, setIsValid] = useState(false);

  const addCarHandler = () => {
    if (brand !== "" && model !== "" && year !== "" && topSpeed !== "") {
      setIsValid(false);
      const oldCars = [...cars];
      const newCar = {
        brand,
        model,
        year,
        topSpeed,
        id: Math.floor(Math.random() * 1000),
      };
      const newCars = oldCars.concat(newCar);
      console.log(newCars);
      setCars(newCars);
      setBrand("");
      setModel("");
      setYear("");
      setTopSpeed("");
      localStorage.setItem("cars", JSON.stringify(newCars));
    } else {
      setMsgError("Fiels cannot be Blank!");
      setIsValid(true);
      setTimeout(() => {
        setMsgError(null);
      }, 2000);
    }
  };

  const deleteCarHandler = (id) => {
    const oldCars = [...cars];
    const newCars = oldCars.filter((car) => car.id !== id);
    setCars(newCars);
    localStorage.setItem("cars", JSON.stringify(newCars));
  };

  useEffect(() => {
    if (localStorage.getItem("cars")) {
      const localStorageCars = JSON.parse(localStorage.getItem("cars"));
      setCars(localStorageCars);
    } else {
      setCars([]);
    }
  }, [setCars]);

  return (
    <div className={classes.app}>
      <img src={Car} style={{ width: "300px" }} alt="#" />
      <h1 className={classes.heading}>ReactJs Car Registration App</h1>
      {msgError ? <h4 className={classes.error}>{msgError}</h4> : null}
      <TextField
        label="Brand"
        variant="outlined"
        className={classes.textField}
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        error={isValid}
      />
      <TextField
        label="Model"
        variant="outlined"
        className={classes.textField}
        value={model}
        onChange={(e) => setModel(e.target.value)}
        error={isValid}
      />
      <TextField
        label="Year"
        variant="outlined"
        className={classes.textField}
        value={year}
        onChange={(e) => setYear(e.target.value)}
        error={isValid}
      />
      <TextField
        label="Top Speed"
        variant="outlined"
        className={classes.textField}
        value={topSpeed}
        onChange={(e) => setTopSpeed(e.target.value)}
        error={isValid}
      />
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={addCarHandler}
      >
        Register Car
      </Button>

      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Brand</TableCell>
            <TableCell align="center">Model</TableCell>
            <TableCell align="center">Year</TableCell>
            <TableCell align="center">Top Speed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cars.map((car, index) => (
            <TableRow
              className={classes.tableRow}
              title="Click To Delete"
              key={index}
              onClick={() => deleteCarHandler(car.id)}
            >
              <TableCell align="center">{car.brand}</TableCell>
              <TableCell align="center">{car.model}</TableCell>
              <TableCell align="center">{car.year}</TableCell>
              <TableCell align="center">{car.topSpeed}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default App;
