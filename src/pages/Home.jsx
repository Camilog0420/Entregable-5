import React from 'react'
import Footer from '../components/Footer'
import { setNameTrainer } from '../store/slices/nameTrainer.slice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(setNameTrainer(e.target.nameTrainer.value))
    navigate("/pokedex")
  }

  return (
    <section className='min-h-screen grid grid-rows-[1fr_auto]'>
      {/*parte superior*/ }
      <section className='grid justify-center flex-col min-h-max items-center text-center px-2'>
        <article>
          <div>
            <img src="/images/pokedex.png" alt="" />
          </div>
          <h2 className='text-[#FE1936] font-semibold text-6xl '>Hello trainer!</h2>
          <p className='text-2xl pb-10'>Give me your name to start!:</p>
          <form onSubmit={handleSubmit}>
            <input className='box-border shadow outline-none text-center text-lg pr-48 py-5 ' id='nameTrainer' type="text" placeholder='Your name...'/>
            <button className='bg-[#D93F3F] text-white py-5 px-10 font-medium' >Comenzar</button>
          </form>
        </article>
      </section>

      {/*footer*/}
      <Footer />
    </section>
  )
}

export default Home