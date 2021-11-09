import React from "react";
import { Link } from "react-router-dom";
import { useStyles } from './styles';

export default function LandingPage() {
  const classes = useStyles();
  return (
    <div className={classes.landing}>
      <h1 className={classes.landingH1}>Bienvenidos a mi página</h1>
      <Link className="link" to="/home">
        Ingresar
      </Link>
    </div>
  );
}
