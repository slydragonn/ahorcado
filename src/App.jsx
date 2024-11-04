import { useEffect, useRef, useState } from 'react'
import './App.css'
import DrawPlayer from './components/DrawPlayer'
import QUESTIONS from './constants/questions'

function App() {
  const player1Ref = useRef(null);
  const player2Ref = useRef(null);
  const [turn, setTurn] = useState(1);
  const [questionPos, setQuestionPos] = useState(0)
  const [question, setQuestion] = useState(QUESTIONS[questionPos])
  const [answer, setAnswer] = useState([])
  const [errorsPlayer1, setErrorPlayer1] = useState(0)
  const [errorsPlayer2, setErrorPlayer2] = useState(0)
  const [points, setPoints] = useState({
    player1: 0,
    player2: 0
  })

  useEffect(() => {
    let arr = []
    for(let i = 0; i < question.answer.length; i++) {
      if(question.answer[i] !== " ") {
          arr.push(1)
      }
      else {
          arr.push(0)
      }
    }
    setAnswer(arr)
  }, [question.answer])

  useEffect(() => {
    setQuestion(QUESTIONS[questionPos])
  }, [questionPos])

  const findCharInAnswer = (playerType, char) => {
    const arr = question.answer.split('');
    const pos = [];
    const newAnswer = answer;

    console.log(char)

    arr.forEach((el, i) => {
        if(el.toUpperCase() === char.toUpperCase()) {
            pos.push(i)
        }
    })

    if(pos.length == 0) {
      if(playerType == 1) {
        player1Ref.current.value = ''
        if(errorsPlayer1 < 8) {
          setErrorPlayer1(count => count + 1)
        }
        setTurn(2)
      }
      else {
        player2Ref.current.value = ''
        if(errorsPlayer2 < 8) {
          setErrorPlayer2(count => count + 1)
        }
        setTurn(1)
      }
    }
    else {
      pos.forEach(i => {
        newAnswer[i] = char
      })
      setAnswer(() => ([...newAnswer]))

      if(playerType == 1) {
        player1Ref.current.value = ""
        if(answer.every(el => el != 1)) {
          setPoints(points => ({...points, player1: points.player1 + 1}))
          setQuestionPos(count => count + 1)
          setErrorPlayer1(0)
          setErrorPlayer2(0)
        }
      }
      else {
        player2Ref.current.value = ""
        if(answer.every(el => el != 1)) {
          setPoints(points => ({...points, player2: points.player2 + 1}))
          setQuestionPos(count => count + 1)
          setErrorPlayer1(0)
          setErrorPlayer2(0)
        }
      }
    }
  }

  return (
    <div className='flex flex-col w-full justify-center items-center gap-5'>
      <header>
        <span className='text-2xl font-bold'>Turno del: Equipo #{turn}</span>
        <p className='text-4xl my-3'>{'"' + question.question + '"'}</p>
        {/* Show Character Boxes */}
        <ul className='flex justify-center items-center gap-5'>
          {
            answer.map((el, i) => {
              if(el !== 0) {
                return <li key={i} className='flex justify-center items-center w-9 h-9 border border-black px-5 py-2 rounded text-2xl uppercase text-center'>{el == 1 ? " " : el}</li>
              }
              else {
                return <li key={i}>__</li>
              }
            })
          }
        </ul>
      </header>
      <main className='flex items-center justify-between w-[800px] gap-16'>
        {/*Player One */}
        <section className='flex flex-col w-48'>
          <span className='font-bold text-lg'>Puntos Equipo #1: {points.player1}</span>
          <DrawPlayer errors={errorsPlayer1}/>
          <div className='flex gap-2 justify-center items-center'>
            <input type='text' maxLength='1' ref={player1Ref} className='w-9 h-9 border border-black rounded my-1 text-center text-2xl'/>
            {
              turn == 1
              ? <button className='bg-green-800' onClick={() => findCharInAnswer(1, player1Ref.current.value)}>Enviar Letra</button>
              : <button disabled className='bg-red-800'>Esperar Turno</button>
            }
          </div>
        </section>
        {/*Player Two */}
        <section className='flex flex-col w-48'>
          <span className='font-bold text-lg'>Puntos Equipo #2: {points.player2}</span>
          <DrawPlayer errors={errorsPlayer2}/>
          <div className='flex gap-2 justify-center items-center'>
            <input type='text' maxLength='1' ref={player2Ref} className='w-9 h-9 border border-black rounded my-1 text-center text-2xl'/>
            {
              turn == 2
              ? <button className='bg-green-800' onClick={() => findCharInAnswer(2, player2Ref.current.value)}>Enviar Letra</button>
              : <button disabled className='bg-red-800'>Esperar Turno</button>
            }
          </div>
        </section>
      </main>
      <footer>
        <button onClick={() => {
          if(questionPos < 9) {
            setQuestionPos(count => count + 1)
          }
          setErrorPlayer1(0)
          setErrorPlayer2(0)
        }}>Siguiente Pregunta</button>
      </footer>
    </div>
  )
}

export default App
