import angleLogo from './angle_logo.svg';
import styled from 'styled-components';
import { Angle } from './components/Angle';
import { Guesses } from './components/Guesses';
import { useState, useMemo, useEffect } from 'react';

const BigContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-size: 4rem;
`;

const Input = styled.input`
  padding:10px;
  border-radius:10px;
  margin-right: 0.5rem;
`;

const Button = styled.button`
  padding:10px;
  border-radius: 10px;
  border-width: 0px;
  background-color: lightgrey;
  :active {
    background-color: darkgrey;
  }
`;

const InputArea = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
`;

const Logo = styled.img`
  height: 6rem;
  pointer-events: none;
`;

const MAX_GUESSES = 3;
function App() {

  const [angle1, setAngle1] = useState(Math.random()*2*Math.PI);
  const [angle2, setAngle2] = useState(Math.random()*2*Math.PI);
  const [guess, setGuess] = useState(0);
  const [guesses, setGuesses] = useState([]);
  const [end, setEnd] = useState(false);
  const [win, setWin] = useState(false);

  const deltaAngle = useMemo(() => angle1 > angle2 ? angle1 - angle2 : 2*Math.PI - (angle2 - angle1), [angle1, angle2]);
  const answer = useMemo(() => Math.round((180/Math.PI)*deltaAngle, [deltaAngle]));

  useEffect(() => {
    if (Math.round(answer) === Math.round(guesses[guesses.length - 1])) {
      console.log("Correct!");
      setWin(true);
      setEnd(true);
      return;
    }
    if (guesses.length >= MAX_GUESSES) {
      console.log("max guesses");
      setEnd(true);
    }

  }, [guesses]);

  console.log(Math.round(answer))
  const handleInput = (e) => {
    setGuess(e.target.value); 
  }

  const handleGuess = (e) => {
    setGuesses(guesses => [...guesses, Number(guess)])
  }

  return (
    <BigContainer>
      <Logo src={angleLogo} alt="logo" />
      <Angle angle1={angle1} angle2={angle2} delta={deltaAngle > Math.PI}></Angle>
      <InputArea>
        <Input type="number" onChange={handleInput} disabled={end}/>
        <Button onClick={handleGuess} disabled={end}>Guess!</Button>
      </InputArea>
      <Guesses guesses={guesses} answer={answer}/>
    </BigContainer>
  );
}

export default App;
