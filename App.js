import React, { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';


//creating array outside component because it is permanent no need to change
const cardImages=[
  {"src": "/img/defuse.jpg", matched:false},
  {"src": "/img/explode.jpg", matched:false},
  {"src": "/img/shuffle.png", matched:false},
  {"src": "/img/catn.jpg", matched:false},
  {"src": "/img/job.jpg", matched:false}
]

function App() {
  //setting name
    const [text, setText] = useState('');
    function handleTextChange(event) {
    setText(event.target.value);
    }
    const [dval, setDval] = useState(0);
    //setting turns
   const[turns,setTurns]=useState(0) 
   const[cards, setCards] = useState([])
   const[choice,setchoice]=useState(null)   
  //shuffling cards
   const shuffleCards =() => {
    const shuffledCards = [...cardImages]
    .sort(() => Math.random()-0.5)
    .map((card) => ({...card, id:Math.random()}))
    setchoice(null)
    setCards(shuffledCards)
    setTurns(0)
   }
   
   const handleChoice =(card)=>{
    choice ? console.log("done") : setchoice(card)
   }

   const alertLose = () => {
    // show the alert
    alert('Bomb exploded you lose!');
  }

  const alertWin =( ) =>
{
  alert('you won!');
}
//comparing choice

useEffect(()=>{
if(choice){
  if(choice.src === '/img/catn.jpg' ){
    setCards(prevcards => {
      return prevcards.map(card =>{
        if(card.src === choice.src){
          console.log('match cat')
          return{...card, matched: true}  
        }else{
          return card
        }
      })
    })
    resetTurn()
  }
  //diffuse
  if(choice.src === '/img/defuse.jpg' ){
    setCards(prevcards => {
      return prevcards.map(card =>{
        if(card.src === '/img/defuse.jpg'){
          setDval(dval+1)
          console.log(' match diffuse')
          return{...card, matched: true}   
        }else{
          return card
        }
      })
    })
    resetTurn()
  }
  //job
  if(choice.src === '/img/job.jpg' ){
    setCards(prevcards => {
      return prevcards.map(card =>{
        if(card.src === choice.src){
          console.log("match job")
          return{...card, matched: true}  
        }else{
          return card
        }
      })
    })
    resetTurn()
  }
  //shuffle
  if(choice.src === '/img/shuffle.png' ){
    console.log("you pressed shuffle")
    setDval(0)
    
    shuffleCards()
    resetTurn()
  }
  //bomb
  if(choice.src === '/img/explode.jpg' ){
    if(dval===1){
      setCards(prevcards => {
        return prevcards.map(card =>{
          if(card.src === choice.src){
            setDval(0)
           
            return{...card, matched: true}  
          }else{
            return card
          }
        })
      })
      resetTurn()
     }else{
      alertLose()
     
      window.location.reload();
      
     }
  }
  else{
    resetTurn()
    console.log('not match') 
  }
}
  
},[choice])

//reset choices and increases turn
const resetTurn =() => {
  setchoice(null)
  setTurns(prevTurns => prevTurns + 1)
 
}

  return (
    <div className="App">
      <h1>Card Game</h1>
      <span>Diffuse:{dval}</span>
      <h3>Please Enter Your Name</h3>
      <input type="text" onChange={handleTextChange}></input>
      <button onClick={shuffleCards}>Start</button>

      <div className='card-grid'>
        {cards.map(card =>(
          <SingleCard 
          key={card.id} 
          card={card}
          handleChoice={handleChoice}
          flipped={card === choice || card.matched}>
          </SingleCard>
        ))}
      </div>
      
      <p>Your Name: {text}</p>
      <p>Turns: {Math.round(turns/2)}</p>
    </div>
  );
}

export default App;
