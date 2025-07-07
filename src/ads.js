export function loadAds(isPremium) {
  // set active ad units
  setActiveAdUnits(isPremium);

  // load ad script
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://cdn.snigelweb.com/adengine/angle.wtf/loader.js';
  script.type = 'text/javascript';
  script.setAttribute('data-cfasync', 'false');

  if (!document.querySelector(`script[src*="adengine/angle.wtf/loader.js"]`)) {
    document.body.appendChild(script);
  }
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
      activeUnits = ['adhesion', 'top_banner']; // Mobile Ad Units
      break;
    default:
    case 'medium':
    case 'xlarge':
    case 'large':
      activeUnits = ['sidebar_left', 'video', 'adhesion'];
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

/**
 * Check for consent through Snigel, then set GA consent
 */
export const checkForConsent = () => {
  initializeCookielessAnalytics();

  window.addEventListener('adnginLoaderReady', function () {
    window.__tcfapi('addEventListener', 2, (tcData, success) => {
      if (success && tcData?.eventStatus === 'tcloaded') {
        window.adconsent &&
          window.adconsent('getConsent', null, function (consent, success) {
            if (success) {
              if (consent.fullConsent) {
                // Load cookie scripts here
                console.log('########### yas consent');
                window.gtag &&
                  window.gtag("consent", "update", {
                    ad_storage: "granted",
                    analytics_storage: "granted",
                  });
              } else {
                // Otherwise, block all cookie-deploying scripts
                console.log('########### naur consent');
              }
            }
          });
      }
    });
  });
};

/**
 * Initializes GA in cookieless mode, once consent is set we can add cookies
 */
const initializeCookielessAnalytics = () => {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function (...args) {
    window.dataLayer?.push(args);
  };

  // start with denied consent
  window.gtag("consent", "default", {
    ad_storage: "denied",
    analytics_storage: "denied",
  });

  const currentID = 'G-WDL5SFD2WC';

  if (!document.querySelector(`script[src*="gtag/js?id=${currentID}"]`)) {
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${currentID}`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.gtag('js', new Date());
      window.gtag('config', currentID);
    };
  }
  return;
};
