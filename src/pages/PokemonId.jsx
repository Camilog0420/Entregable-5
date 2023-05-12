import { useEffect, useState } from 'react'
import Header from '../components/pokedex/Header'
import { useParams } from 'react-router-dom'
import axios from 'axios'

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

const colorsByType = {
  grass: "bg-[#85C9C5]",
  fire: "bg-[#E6901E]",
  water: "bg-[#1479FB]",
  bug: "bg-[#4AB648]",
  normal: "bg-[#735259]",
  ice: "bg-[#64CBF5]",
  fighting: "bg-[#E95B36]",
  electric: "bg-[#8E94FE]",
  rock: "bg-[#B9B9BA]",
  ground: "bg-[#9C6614]",
  steel: "bg-[#9BB7AD]",
  dark: "bg-[#4F4F4F]",
  dragon: "bg-[#8DD6E0]",
  poison: "bg-[#A564E3]",
  ghost: "bg-[#454AA8]",
  fairy: "bg-[#C23867]",
};

const PokemonId = () => {
  const [pokemon, setPokemon] = useState()

  const {id} = useParams()

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`

    axios.get(URL)
    .then((res) => setPokemon(res.data))
    .catch((err) => console.log(err))
  }, [])

  const getPercentStatBar = (stat_base) => {
    const percent = Math.floor((stat_base * 100)/255)
    return `${percent}%`
  }


  return (
    <section>
      <Header />

      <section className='px-2 py-16'> 

        <article className='max-w-[800px] mx-auto shadow-lg p-4'>
         
          <section className={`bg-gradient-to-b ${
          backgroundByType[pokemon?.types[0].type.name]
        } relative h-[150px]`}>

            <div className='w-[200px] mx-auto absolute left-1/2 -translate-x-1/2 -top-14'>
              <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
            </div>

          </section>


          <section className='w-[600px] mx-auto'>
            <div className='text-center p-6'>
              <h3 className='border border-black w-[50px] mx-auto'>#{pokemon?.id}</h3>
            </div>

            <div className='grid grid-cols-[1fr_auto_1fr] items-center gap-2'>
              <hr />
              <h2 className='capitaliza font-semibold text-3xl'>{pokemon?.name}</h2>
              <hr />
            </div>

            <div className='flex justify-center gap-6 text-center'>
              <div>
                <h5>Weight</h5>
                <span>{pokemon?.weight}</span>
              </div>
              <div>
                <h5>Height</h5>
                <span>{pokemon?.height}</span>
              </div>
            </div>

            <section className='grid sm:grid-cols-2 gap-4'>
              {/* Tipos */}
              <section className='text-center'>
                <h3>Types</h3>

                <section className='grid grid-cols-2 gap-4 mt-2'>
                  {
                    pokemon?.types.map((type) => (
                      <article key={type.type.name} className={`p-2 px-8 border-[1px] text-white border-gray-300 capitalize ${colorsByType[type.type.name]
                      }`}>{type.type.name}</article>
                    ))
                  }
                </section>
              </section >
              {/* Habilidades */}
              <section className='text-center'>
                
                <h3>Abilities</h3>

                <section className='grid grid-cols-2 gap-4 mt-2'>
                  {
                    pokemon?.abilities.map((ability) => (
                      <article key={ability.ability.name} className='p-2 px-8 border-[1px] border-gray-300 capitalize'>{ability.ability.name}</article>
                    ))
                  }
                </section>
              </section>

            </section>

          </section>


          <section className='w-[600px] mx-auto'>
            <h3 className=''>Stats</h3>

            <section>
              {
                pokemon?.stats.map(stat => (
                  <article key={stat.stat.name}>
                    <section className='flex justify-between'>
                      <h5 className='capitalize'>{stat.stat.name}</h5>

                      <span>{stat.base_stat}/255</span>
                    </section>

                    <div className='bg-gray-100 h-5 rounded-sm'>
                      <div style={{"width": getPercentStatBar(stat.base_stat)}} className={`h-full bg-yellow-500 bg-gradient-to-r from-[#FCD676] to-[#E6901E]`}></div>
                    </div>
                  </article>
                ))
              }
            </section>
          </section>
        </article>

      </section>
    </section>
  )
}

export default PokemonId