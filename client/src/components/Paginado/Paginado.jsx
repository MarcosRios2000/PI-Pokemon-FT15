import React from "react";
import { useStyles } from './styles';

export default function Paginado({ pokemonsPerPage, allPokemons, paginado }) {
  const classes = useStyles();
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="paginacion">
      <ul className="paginado">
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li className="number" key={number}>
              <a onClick={() => paginado(number)}>{number}</a>
            </li>
          ))}
      </ul>
    </nav>
  );
}
