export function loadAds(isPremium) {
  // set active ad units
  setActiveAdUnits(isPremium);

  // load ad script
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://cdn.snigelweb.com/adengine/angle.wtf/loader.js';
  script.type = 'text/javascript';
  script.setAttribute('data-cfasync', 'false');
  document.body.appendChild(script);
  return script;
}

function getActiveAdUnits() {
  let breakpoint = 'xsmall';

  const w = window.innerWidth;

  breakpoint = w >= 768 ? 'small' : breakpoint;
  breakpoint = w >= 960 ? 'medium' : breakpoint;
  breakpoint = w >= 1280 ? 'large' : breakpoint;
  breakpoint = w >= 1400 ? 'xlarge' : breakpoint;

  let activeUnits = [];

  switch (breakpoint.toLowerCase()) {
    case 'xsmall': // Small Mobile
    case 'small': // Portrait Tablet / Large Mobile
      window.activeUnits = ['adhesion', 'top_banner']; // Mobile Ad Units
      break;
    default:
    case 'medium':
    case 'xlarge':
    case 'large':
      window.activeUnits = ['sidebar_left', 'video', 'adhesion'];
      break;
  }

  window.snigelPubConf = {
    adengine: {
      activeAdUnits: activeUnits,
    },
  };
  return activeUnits;
}

function setActiveAdUnits(isPremium) {
  if (isPremium) {
    window.snigelPubConf = {
      adengine: {
        activeAdUnits: [''],
      },
    };
    return;
  }

  const activeUnits = getActiveAdUnits();

  window.snigelPubConf = {
    adengine: {
      activeAdUnits: activeUnits,
    },
  };
}
