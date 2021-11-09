import React from "react";
import { useStyles } from './styles';

export default function Card({ name, image, types }) {
  const classes = useStyles();
  return (
    <div className={classes.cardContainer}>
      <h3 className={classes.name} style={{ textTransform: "capitalize" }}>
        {name}
      </h3>
      <img src={image} alt={name} width="200px" height="200px" />
      <div style={{ display: "flex", justifyContent: "center" }}>
        {types.map((e, index) => {
          return (
            <div className={classes.type} key={index}>
              <img src={e.image} alt={e.name} width="50px" height="50px" />
              <p style={{ textTransform: "capitalize" }}> {e.name} </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
