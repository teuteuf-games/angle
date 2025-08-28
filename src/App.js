import seedrandom from 'seedrandom';
import { ToastContainer, Flip } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import { Angle } from './components/Angle';
import { DateTime } from 'luxon';
import { Guesses } from './components/Guesses';
import { useState, useMemo, useEffect } from 'react';
import { useGuesses } from './hooks/useGuesses';
import { StatsModal } from './components/StatsModal';
import { MAX_GUESSES } from './constants';
import AdSpace from './components/AdSpace';
import { HowToModal } from './components/HowToModal';
import { LoginModal } from './components/LoginModal';
import { SocialLinks } from './components/SocialLinks';
import useUser from './hooks/useUser';
import AccountsUpdateComponent from './components/AccountsUpdateComponent';
import { checkForConsent } from './ads';
import BackToSchoolBanner from './components/backToSchool/BackToSchoolBanner';

const Main = styled.div`
  flex: 1 0 auto;
  text-align: center;
`;

const SidebarAd = styled.div`
  display: block;
  position: absolute;
  z-index: 0;
  padding-top: 20px;
  padding-right: 20px;
  transform: translateX(-100%);
`;

const BigContainer = styled.div`
  display: flex;
  text-align: center;
  overflow: auto;
  height: 100%;
  width: 100%;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  @media (prefers-color-scheme: dark) {
    background-color: #121212;
  }
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 10px;
  border-style: solid;
  border-width: 1px;
  border-color: black;
  margin-right: 0.5rem;
  @media (prefers-color-scheme: dark) {
    background-color: #1f2023;
    color: #dadada;
  }
`;

const Button = styled.button`
  padding: 10px;
  border-radius: 10px;
  border-width: 0px;
  font-family: 'Boston-Regular';
  background-color: lightgrey;
  :active {
    background-color: darkgrey;
  }
  @media (prefers-color-scheme: dark) {
    background-color: #1f2023;
    color: #dadada;
  }
`;

const InputArea = styled.div`
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  display: flex;
`;

const LogoContainer = styled.a`
  margin-top: 12px;
  margin-bottom: 12px;
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  text-decoration: none;
`;

const Logo = styled.img`
  height: 2.5rem;
`;

const LogoText = styled.p`
  font-size: 2.5rem;
  font-family: 'Boston-Regular';
  color: #df6247;
  margin: 0;
`;

const Attempts = styled.div`
  margin-bottom: 0.5rem;
  .span {
    font-weight: bold;
  }
  @media (prefers-color-scheme: dark) {
    color: #fff;
  }
`;

const AdContainer = styled.div`
  width: 100%;
  margin-top: auto;
  bottom: 0px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const getDayString = () => {
  return DateTime.now().toFormat('yyyy-MM-dd');
};

const DEV_MODE = false;
function App() {
  const dayString = useMemo(getDayString, []);
  const [angle1, setAngle1] = useState(
    (DEV_MODE ? Math.random() : seedrandom.alea(dayString)()) * 2 * Math.PI
  );
  const [angle2, setAngle2] = useState(
    (DEV_MODE
      ? Math.random()
      : seedrandom.alea(dayString + 'otherrandomstring')()) *
      2 *
      Math.PI
  );
  const [guess, setGuess] = useState('');
  const [guesses, addGuess] = useGuesses(dayString);
  const [end, setEnd] = useState(false);
  const [win, setWin] = useState(false);
  const { user, setData, logout } = useUser();

  useEffect(() => {
    checkForConsent();
  }, []);

  const deltaAngle = useMemo(
    () =>
      angle1 >= angle2 ? angle1 - angle2 : 2 * Math.PI - (angle2 - angle1),
    [angle1, angle2]
  );
  const answer = useMemo(() =>
    Math.round((180 / Math.PI) * deltaAngle, [deltaAngle])
  );

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
  }, [end]);

  const handleInput = (e) => {
    setGuess(e.target.value);
  };

  const handleGuess = (e) => {
    if (Number(guess) < 0 || Number(guess) > 360) {
      toast('Valid angles: 0° - 360°', { autoClose: 2000 });
      return;
    }
    addGuess({
      value: Math.round(Number(guess)),
      delta: Math.round(Number(guess)) - Math.round(answer),
    });
    setGuess('');
    try {
      const guesses = JSON.parse(localStorage.getItem('guesses'));
      setData('guesses', guesses);
    } catch (e) {}
  };

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      handleGuess();
    }
  };

  return (
    <>
      {!user?.premiumGames?.includes('angle') && (
        <>
          <div id="adngin-top_banner-0"></div>
          <div id="adngin-video-0"></div>
          <div id="adngin-adhesion-0"></div>
        </>
      )}
      <Main>
        <BigContainer>
          <AccountsUpdateComponent />
          <ToastContainer
            hideProgressBar
            position="top-center"
            transition={Flip}
            autoClose={false}
          />
          <BackToSchoolBanner />
          <LogoContainer href={'/'}>
            <Logo src={'/images/angle.svg'} alt="logo" />
            <LogoText>ANGLE</LogoText>
          </LogoContainer>
          <IconContainer>
            <HowToModal />
            <StatsModal
              end={end}
              win={win}
              guesses={guesses}
              maxAttempts={MAX_GUESSES}
              dayString={dayString}
            ></StatsModal>
            <LoginModal user={user} logout={logout} />
          </IconContainer>
          <Angle
            angle1={angle1}
            angle2={angle2}
            largeArc={deltaAngle > Math.PI}
          ></Angle>
          <InputArea>
            <Input
              autoFocus
              type="number"
              pattern="\d*"
              onChange={handleInput}
              onKeyDown={handleEnter}
              disabled={end}
              value={guess}
            />
            <Button onClick={handleGuess} disabled={end}>
              Guess!
            </Button>
          </InputArea>
          <Attempts>
            Attempts:{' '}
            <span>
              {guesses.length}/{MAX_GUESSES}
            </span>
          </Attempts>
          <Guesses guesses={guesses} answer={answer} />
          {!user?.premiumGames?.includes('angle') && (
            <SidebarAd>
              <div id="adngin-sidebar_left-0"></div>
            </SidebarAd>
          )}
          <AdContainer>
            <SocialLinks />
            <div style={{ textAlign: 'center' }}>
              <a href="/privacy-policy/" style={{ color: '#df6347' }}>
                Privacy Policy
              </a>{' '}
              -{' '}
              <div
                id="ccpa"
                style={{
                  textAlign: 'center',
                  cursor: 'pointer',
                  display: 'none',
                }}
              >
                Do not share my Personal Information.
              </div>
            </div>
            <AdSpace />
          </AdContainer>
        </BigContainer>
      </Main>
    </>
  );
}

export default App;
