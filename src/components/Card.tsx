import React from "react";
import { PokemonData } from "../type";
import styles from "./Card.module.css";

export const Card: React.FC<PokemonData> = ({ poke }) => {
  return (
    <div className={styles.card}>
      <img src={poke.sprites.front_default} alt={poke.name} />
      <h3 className="cardName">{poke.name}</h3>
      <p>タイプ</p>
      {poke.types.map((type, i) => {
        return (
          <div key={i}>
            <span className="typeName">{type.type.name}</span>
          </div>
        );
      })}

      <p className="title">おもさ: {poke.weight}</p>
      <p className="title">たかさ: {poke.height}</p>
      <p className="title">とくせい: {poke.abilities[0].ability.name}</p>
    </div>
  );
};
