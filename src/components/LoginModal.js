import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const StyledBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: -webkit-fill-available;
  height: auto;
  max-width: 350px;
  min-width: 250px;
  max-height: 400px;
  overflow: auto;
  background-color: #fff;
  border: 2px solid #000;
  box-shadow: 24rem;
  padding: 2em;
  justify-content: flex-start;
  @media (prefers-color-scheme: dark) {
    background-color: #121212;
    color: white;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  font-size: 1.6rem;
  cursor: pointer;
`;

const StyledModal = styled(Modal)`
  /* overflow: auto; */
  @media (prefers-color-scheme: dark) {
    color: #000;
  }
`;

const CenterDiv = styled.div`
  display: ${(props) => props.display};
  flex-direction: ${(props) => props.flexDirection};
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const LoginIcon = styled(AccountCircleIcon)`
  color: #df6247;
`;

const SocialA = styled.a`
  padding: 4px;
  background-color: ${(props) => props.color || '#000'};
  color: #fff;
  width: 208px;
  display: flex;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
`;

const InnerDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #fff;
  border-radius: 4px;
  padding: 6px;
`;

const LoginText = styled.div`
  flex: 1;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
`;

const BigButton = styled.a`
  cursor: pointer;
  color: #000;
  text-decoration: none;
  padding: 10px;
  border-radius: 10px;
  border-width: 0px;
  font-family: 'Boston-Regular';
  background-color: lightgrey;
  :active,
  :hover {
    background-color: darkgrey;
  }
  margin-right: 10px;
`;

function SocialLink(props) {
  // TODO : Local: :3000 and localhost-3001
  const href = window.location.origin.includes('localhost')
    ? `http://localhost:3000/auth/${props.platform}?referer=localhost-3001`
    : `https://auth.teuteuf.fr/auth/${props.platform}?referer=angle`;
  return (
    <SocialA href={href} color={props.color}>
      <InnerDiv>
        <img
          src={'/images/' + props.image}
          alt={props.name}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </InnerDiv>
      <LoginText>Login with {props.name}</LoginText>
    </SocialA>
  );
}

export function LoginModal(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="flex justify-center items-center">
      <Button onClick={handleOpen}>
        {!props.user?.photoURL && <LoginIcon />}
        {props.user?.photoURL && (
          <img
            src={props.user.photoURL}
            alt={props.user.firstName}
            style={{
              borderRadius: '100%',
              width: '24px',
              height: '24px',
            }}
          />
        )}
      </Button>
      <StyledModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ zIndex: 10000 }}
      >
        <StyledBox>
          <Box>
            <IconButton
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            sx={{ marginBottom: '1rem' }}
          >
            Account
          </Typography>
          {props.user && (
            <>
              <Typography component="p">
                Hi {props.user.firstName} 👋
              </Typography>
              <br />
              <Typography component="p">
                We now store your stats after each game. This not only
                safeguards your progress but also enables seamless gameplay
                across multiple devices.
              </Typography>
              <Typography component="p">
                <a href="https://account.teuteuf.fr" target="_blank">
                  Learn more
                </a>
              </Typography>
              <br />
              <BigButton
                onClick={() => {
                  props.logout();
                  return false;
                }}
              >
                Sign out
              </BigButton>
              <BigButton href="https://account.teuteuf.fr" target="_blank">
                Manage account
              </BigButton>
            </>
          )}
          {!props.user && (
            <>
              <Typography component="p">
                Sign up for a Teuteuf Games account or log in to start saving
                your gaming statistics and playing across multiple devices. Want
                to know all the benefits?{' '}
                <a href="https://account.teuteuf.fr" target="_blank">
                  Discover more here.
                </a>
              </Typography>
              <br />
              <CenterDiv display="flex" flexDirection="column">
                <SocialLink name="X" platform="twitter" image="X.svg" />
                <SocialLink
                  name="Google"
                  platform="google"
                  image="google.png"
                  color="#4285f4"
                />
                <SocialLink name="Apple" platform="apple" image="apple.png" />
              </CenterDiv>
            </>
          )}
          <div className="text-start text-xs py-3 mt-5">
            <p>
              You can change your privacy settings by clicking the following
              button:{' '}
              <button
                className="underline cursor-pointer"
                onClick={() => window.adconsent && window.adconsent('showGUI')}
              >
                Manage Consent
              </button>
            </p>
          </div>
        </StyledBox>
      </StyledModal>
    </div>
  );
}
