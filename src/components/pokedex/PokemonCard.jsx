import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

{/* Colores de borde */}
const borderByType = {
  grass: "border-[#B1DBBC]",
  fire: "border-[#E6901E]",
  water: "border-[#1479FB]",
  bug: "border-[#4AB648]",
  normal: "border-[#735259]",
  ice: "border-[#64CBF5]",
  fighting: "border-[#E95B36]",
  electric: "border-[#8E94FE]",
  rock: "border-[#B9B9BA]",
  ground: "border-[#9C6614]",
  steel: "border-[#9BB7AD]",
  dark: "border-[#4F4F4F]",
  dragon: "border-[#8DD6E0]",
  poison: "border-[#A564E3]",
  ghost: "border-[#454AA8]",
  fairy: "border-[#C23867]",
};

{/* Colores de fondo */}
const backgroundByType = {
  grass: "from-[#7EC6C5] to-[#CAE099]",
  fire: "from-[#F96D6F] to-[#E8AE1B]",
  water: "from-[#1479FB] to-[#82B2F1]",
  bug: "from-[#3BB039] to-[#AAFFA8]",
  fighting: "from-[#96402A] to-[#CB735D]",
  electric: "from-[#0C1395] to-[#7075D9]",
  ice: "from-[#6FBEDF] to-[#BDEBFE]",
  normal: "from-[#735259] to-[#7C3F4C]",
  rock: "from-[#7E7E7E] to-[#B9B9BA]",
  ground: "from-[#654008] to-[#D69638]",
  steel: "from-[#5E736C] to-[#A8A8A8]",
  dark: "from-[#030706] to-[#5A5E5D]",
  dragon: "from-[#478A93] to-[#A2BEC1]",
  poison: "from-[#5B3184] to-[#CE9BFF]",
  ghost: "from-[#323569] to-[#787DDA]",
  fairy: "from-[#971B45] to-[#C23867]",
  
};

{/* Colores de stats */}
const statsColorByType = {
  grass: "text-[#416460]",
  fire: "text-[#E6901E]",
  water: "text-[#1479FB]",
  bug: "text-[#4AB648]",
  normal: "text-[#735259]",
  fire: "text-[#E6901E]",
  fighting: "text-[#E95B36]",
  electric: "text-[#8E94FE]",
  rock: "text-[#B9B9BA]",
  ground: "text-[#9C6614]",
  steel: "text-[#9BB7AD]",
  dark: "text-[#4F4F4F]",
  dragon: "text-[#8DD6E0]",
  poison: "text-[#CE9BFF]",
  ghost: "text-[#454AA8]",
  ice: "text-[#64CBF5]",
  fairy: "text-[#C23867]",
};

const PokemonCard = ({ pokemonUrl }) => {
  const [pokemon, setPokemon] = useState();

  const types = pokemon?.types
    .slice(0, 2)
    .map((type) => type.type.name)
    .join(" / ");

  useEffect(() => {
    axios
      .get(pokemonUrl)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Link to={`/pokedex/${pokemon?.id}`}
      className={`text-center border-8 rounded-md ${
        borderByType[pokemon?.types[0].type.name]
      }`}
    >
      {/* Fondo superior */}
      <section
        className={`bg-gradient-to-b ${
          backgroundByType[pokemon?.types[0].type.name]
        } relative h-[150px]`}
      >
        <div className="absolute -bottom-102 w-[200px] left-1/2 -translate-x-1/2">
          <img
            src={pokemon?.sprites.other["official-artwork"].front_default}
            alt=""
          />
        </div>
      </section>

      {/* Seccion inferior */}
      <section>
        <h3 className={`mt-12 font-bold text-2xl ${
        statsColorByType[pokemon?.types[0].type.name]
      }`}>{pokemon?.name}</h3>
        <h4>{types}</h4>
        <span>Type</span>

        <hr />

        <section className="grid grid-cols-3 gap-2 p-2">
          {pokemon?.stats.map((stat) => (
            <div key={stat.stat.name}>
              <h5>{stat.stat.name}</h5>
              <span className={`font-bold ${
        statsColorByType[pokemon?.types[0].type.name]
      }`}>{stat.base_stat}</span>
            </div>
          ))}
        </section>
      </section>
    </Link>
  );
};

export default PokemonCard;
