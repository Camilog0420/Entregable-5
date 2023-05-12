import { useSelector } from "react-redux";
import Header from "../components/pokedex/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "../components/pokedex/PokemonCard";

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonName, setPokemonName] = useState("")
  console.log(pokemonName)
  const [types, setTypes] = useState([])
  const [currentType, setCurrentType] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const nameTrainer = useSelector((store) => store.nameTrainer);

  const handleSubmit = (e) => {
    e.preventDefault()
    setPokemonName(e.target.pokemonName.value)
  }

  const pokemonsByName = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(pokemonName.toLowerCase()))

  const pagination = () => {
    //cantidad de pokemons por pagina
    const POKEMONS_PER_PAGE = 12

    //Pokemons que se van a ver por pagina
    const sliceStart = (currentPage - 1) * POKEMONS_PER_PAGE
    const sliceEnd = sliceStart + POKEMONS_PER_PAGE
    const pokemonsInPage = pokemonsByName.slice(sliceStart, sliceEnd)

    //Ultima pagina
    const lastPage = Math.ceil(pokemonsByName.length / POKEMONS_PER_PAGE) || 1

    //Bloque acutal
    const PAGES_PER_BLOCK = 5
    const actualBlock = Math.ceil(currentPage / PAGES_PER_BLOCK)

    //Paginas que se muestran en el bloque actual
    const pagesInBlock = []
    const minPage = (actualBlock - 1) * PAGES_PER_BLOCK + 1
    const maxPage = actualBlock * PAGES_PER_BLOCK
    for (let i = minPage; i <= maxPage; i++) {
      if (i <= lastPage) {
        pagesInBlock.push(i)
      }  
    }

    return {pokemonsInPage, lastPage, pagesInBlock}
  }

  const {lastPage, pagesInBlock, pokemonsInPage} = pagination()

  const handleClickPreviousPage = () => {
    const newCurrentPage = currentPage - 1
    if (newCurrentPage >= 1) {
       setCurrentPage(newCurrentPage)
      }
    }

  const handleClickNextPage = () => {
    const newCurrentPage = currentPage + 1
    if (newCurrentPage <= lastPage) {
       setCurrentPage(newCurrentPage)
    }
  }

  useEffect(() => {
    if (!currentType) {
      const URL = "https://pokeapi.co/api/v2/pokemon?limit=1281";
      
      axios
        .get(URL)
        .then((res) => setPokemons(res.data.results))
        .catch((err) => console.log(err));
    }

  }, [currentType]);

  useEffect(() => {
    const URL = "https://pokeapi.co/api/v2/type"

    axios
      .get(URL)
      .then((res) => {
        const newTypes = res.data.results.map(type => type.name)
        setTypes(newTypes);
      })
      .catch((err) => console.log(err));
    
  }, [])

  useEffect(() => {
    if (currentType) { 
      const URL = `https://pokeapi.co/api/v2/type/${currentType}/` 
      
      axios
      .get(URL)
      .then((res) => {
        const pokemonsByType = res.data.pokemon.map(pokemon => pokemon.pokemon)
        setPokemons(pokemonsByType)
      })
      .catch((err) => console.log(err))
    }
  }, [currentType])

  useEffect(() => {
    setCurrentPage(1)
  }, [pokemonName, currentType])

  return (
    <section className="min-h-screen">
      <Header />

      {/*seccion de filtros y saludo */}
      <section className="gap-4 items-center p-10  px-2">
        <h3 className="text-lg text-center pb-20">
          <span className="font-bold text-red-500 text-2xl">Welcome {nameTrainer}</span>, you can find your favorite pokemon
          here
        </h3>

        <form onSubmit={handleSubmit} className="flex justify-around">
          <div>
            <input id="pokemonName" className='box-border shadow-md outline-none text-center text-lg pr-48 py-5' type="text" placeholder="Search your pokemon" />
            <button className='bg-[#D93F3F] text-white py-5 px-10 font-medium'>Search</button>
          </div>

          <select onChange={(e) => setCurrentType(e.target.value)} className="outline-none px-10 shadow-md">
            <option value="">All</option>
            {
              types.map((type) => (<option className="capitalize" value={type} key={type}>{type}</option>))
            }
          </select>
        </form>
      </section>

      {/* Paginación */}

      <ul className="flex gap-3 justify-center py-4 px-2 flex-wrap">
        <li onClick={() => setCurrentPage(1)} className=" p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer">{"<<"}</li>
        <li onClick={handleClickPreviousPage} className=" p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer">{"<"}</li>
        {
          pagesInBlock.map(numberPage => <li onClick={() => setCurrentPage(numberPage)} className={` p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer ${numberPage === currentPage && "bg-blue-400"}`} key={numberPage}>{numberPage}</li>)
        }
        <li onClick={handleClickNextPage} className=" p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer">{">"}</li>
        <li onClick={() => setCurrentPage(lastPage)} className=" p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer">{">>"}</li>
      </ul>

      {/* Seccion lista de pokemons */}
      <section className="px-4 grid gap-6 grid-cols-[repeat(auto-fill,_minmax(270px,_350px))] justify-center max-w-[1800px] mx-auto">
        {pokemonsInPage.map((pokemon) => (
          <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />
        ))}
      </section>
    </section>
  );
};

export default Pokedex;
