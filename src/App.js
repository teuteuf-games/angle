import seedrandom from 'seedrandom';
import angleLogo from './angle_logo.svg';
import { ToastContainer, Flip } from "react-toastify";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import { Angle } from './components/Angle';
import { DateTime } from 'luxon';
import { Guesses } from './components/Guesses';
import { useState, useMemo, useEffect } from 'react';
import { useGuesses } from './hooks/useGuesses';
import { StatsModal } from './components/StatsModal';

const BigContainer = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  padding:10px;
  border-radius:10px;
  border-style: solid;
  margin-right: 0.5rem;
`;

const Button = styled.button`
  padding:10px;
  border-radius: 10px;
  border-width: 0px;
  font-family: "Boston-Regular";
  background-color: lightgrey;
  :active {
    background-color: darkgrey;
  }
`;

const InputArea = styled.div`
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  display: flex;
`;

const Logo = styled.img`
  height: 5rem;
  pointer-events: none;
  font-family: "Boston-Regular";
`;

const Attempts = styled.div`
  margin-bottom: 0.5rem;
  .span {
    font-weight: bold;
  }
`;

const getDayString = () => {
  return DateTime.now().toFormat("yyyy-MM-dd");
};

const MAX_GUESSES = 3;
function App() {

  const dayString = useMemo(getDayString, []);
  const [angle1, setAngle1] = useState(Math.floor(seedrandom.alea(dayString)()*2*Math.PI));
  const [angle2, setAngle2] = useState(Math.floor(seedrandom.alea(dayString+"otherrandomstring")()*2*Math.PI));
  const [guess, setGuess] = useState(0);  
  const [guesses, addGuess] = useGuesses(dayString);
  const [end, setEnd] = useState(false);
  const [win, setWin] = useState(false);

  const deltaAngle = useMemo(() => angle1 > angle2 ? angle1 - angle2 : 2*Math.PI - (angle2 - angle1), [angle1, angle2]);
  const answer = useMemo(() => Math.round((180/Math.PI)*deltaAngle, [deltaAngle]));

  useEffect(() => {
    if (Math.round(answer) === Math.round(guesses[guesses.length - 1]?.value)) {
      setWin(true);
      setEnd(true);
      return;
    }
    if (guesses.length >= MAX_GUESSES) {
      setEnd(true);
    }

  }, [guesses]);

  useEffect(() => {
    if (end) {
      if (win) toast(`🎉 ${answer}° 🎉`);
      else toast(`🤔 ${answer}° 🤔`);
    }
  },[end])

  const handleInput = (e) => {
    setGuess(e.target.value); 
  }

  const handleGuess = (e) => {
    if (Number(guess) < 0) return;
    addGuess({value: Math.round(Number(guess)), delta: Math.abs(Math.round(Number(guess)) - Math.round(answer))});
  }

  return (
    <BigContainer>
      <ToastContainer
        hideProgressBar
        position="top-center"
        transition={Flip}
        autoClose={false}
      />
      <Logo src={angleLogo} alt="logo" />            
      <StatsModal end={end}
              win={win}
              guesses={guesses}
              maxAttempts={MAX_GUESSES}
              dayString={dayString}
      >
      </StatsModal>
      <Angle angle1={angle1} angle2={angle2} delta={deltaAngle > Math.PI}></Angle>
      <InputArea>
        <Input type="number" pattern="\d*" onChange={handleInput} disabled={end}/>
        <Button onClick={handleGuess} disabled={end}>Guess!</Button>
      </InputArea>
      <Attempts>Attempts: <span>{guesses.length}/{MAX_GUESSES}</span></Attempts>
      <Guesses guesses={guesses} answer={answer}/>
    </BigContainer>
  );
}

export default App;
