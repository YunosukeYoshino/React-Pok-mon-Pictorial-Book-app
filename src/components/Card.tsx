import React from "react";

export const Card = ({ poke }) => {
  return (
    <div className="card">
      <div className="cardImg">
        <img src={poke.sprites.front_default} alt={poke.name} />
      </div>
      <h3 className="cardName">{poke.name}</h3>
      <div className="cardTypes">
        <p>タイプ</p>
        {poke.types.map((type) => {
          return (
            <div>
              <span className="typeName">{type.type.name}</span>
            </div>
          );
        })}
      </div>
      <div className="cardInfo">
        <div className="cardData">
          <p className="title">重さ: {poke.weight}</p>
        </div>
        <div className="cardData">
          <p className="title">高さ: {poke.height}</p>
        </div>
        <div className="cardData">
          <p className="title">特性: {poke.abilities[0].ability.name}</p>
        </div>
      </div>
    </div>
  );
};
