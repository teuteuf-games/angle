import styled from 'styled-components';

const GuessLine = styled.div`
  display: grid;
  grid-template-columns: repeat(6, minmax(30px, 2.5rem));
  margin: 0px 2px 2px 2px;
  margin-bottom: ${(props) => props.marginBottom};
`;
const AngleGuess = styled.div`
  display: flex;
  position: relative;
  background-color: #dddddd;
  border-radius: 3px;
  grid-column: 1 / span 2;
  margin-right: 2px;
  align-items: center;
  justify-content: center;
  @media (prefers-color-scheme: dark) {
    background-color: #1f2023;
    color: #dadada;
  }
`;

const ArrowBox = styled.div`
  display: flex;
  padding: 0.25rem;
  position: relative;
  background-color: #dddddd;
  border-radius: 3px;
  grid-column: 3 / span 1;
  margin-right: 2px;
  align-items: center;
  justify-content: center;
  @media (prefers-color-scheme: dark) {
    background-color: #1f2023;
    color: #dadada;
  }
`;

const Hint = styled.div`
  display: flex;
  padding: 0.25rem;
  position: relative;
  background-color: #dddddd;
  border-radius: 3px;
  grid-column: 4 / span 3;
  align-items: center;
  justify-content: center;
  @media (prefers-color-scheme: dark) {
    background-color: #1f2023;
    color: #dadada;
  }
`;

const temperature = (guess, answer) => {
  const diff = Math.abs(answer - guess);
  if (diff === 0) {
    return '🎉🎉🎉';
  }
  if (diff < 5) {
    return 'Boiling!🔥';
  } else if (diff < 10) {
    return 'Hot!';
  } else if (diff < 20) {
    return 'Getting Hot';
  } else if (diff < 50) {
    return 'Warm';
  } else if (diff < 100) {
    return 'Cold!';
  } else {
    return 'Freezing!🥶';
  }
};

export function Guesses({ guesses, answer }) {
  return guesses.map((guess, index) => (
    <GuessLine key={index}>
      <AngleGuess>{guess.value}°</AngleGuess>
      {answer === guess.value ? (
        <ArrowBox>🥳</ArrowBox>
      ) : (
        <ArrowBox>{answer > guess.value ? '⬆️' : '⬇️'}</ArrowBox>
      )}
      <Hint>{temperature(guess.value, answer)}</Hint>
    </GuessLine>
  ));
}
