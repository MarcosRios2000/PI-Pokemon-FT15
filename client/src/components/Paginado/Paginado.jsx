import React from "react";
import { useStyles } from './styles';

export default function Paginado({ pokemonsPerPage, allPokemons, paginado }) {
  const classes = useStyles();
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={classes.paginacion}>
      <ul className={classes.paginacionUl}>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li className={classes.paginacionLi} key={number}>
              <a className={classes.paginacionA} onClick={() => paginado(number)}>{number}</a>
            </li>
          ))}
      </ul>
    </nav>
  );
}
