import React from "react";

export default function Card({ name, image, types }) {
  return (
    <div>
      <h3 style={{ textTransform: "capitalize" }}>{name}</h3>
      <img src={image} alt={name} width="200px" height="200px" />
      <div style={{ display: "flex", justifyContent: "center" }}>
        {types.map((e, index) => {
          return (
            <div key={index}>
              <img src={e.image} alt={e.name} width="50px" height="50px" />
              <p style={{ textTransform: "capitalize" }}> {e.name} </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
