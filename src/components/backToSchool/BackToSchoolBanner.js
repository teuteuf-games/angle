import { useEffect, useRef, useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import "./index.css";
import dayjs from "dayjs";

const bannerText = [
  "Sharpen your pencils, sharpen your skills",
  "40% off all Teuteuf premium plans",
  "Remove ads & play the archive",
  "Code BACK2SCHOOL",
];

function loadClosed() {
  const stored = localStorage.getItem('back-to-school-banner-2025');
  return stored != null ? JSON.parse(stored) : false;
}

function saveClosed() {
  localStorage.setItem(
    'back-to-school-banner-2025',
    JSON.stringify(true)
  );
}


const BackToSchoolBanner = () => {
  const [closed, setClosed] = useState(loadClosed());
  const trackRef = useRef(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const PX_PER_SEC = 30;
    const setDuration = () => {
      const distance = el.scrollWidth / 2;
      const seconds = distance / PX_PER_SEC;
      el.style.setProperty("--marquee-duration", `${seconds}s`);
    };

    setDuration();
    const ro = new ResizeObserver(setDuration);
    ro.observe(el);
    const id = window.setTimeout(setDuration, 100);

    return () => {
      ro.disconnect();
      window.clearTimeout(id);
    };
  }, []);

  // appears from Sept 1 (local time) to Sept 14th 11:59 PM GMT +9:30 (when coupon expires in Stripe)
  if (
    dayjs().isBefore(dayjs("2025-09-01"), "day") ||
    Date.now() > 1757860199000 ||
    closed
  ) {
    return null;
  }

  const renderCopy = (prefix) =>
    bannerText.flatMap((v, i) => [
      <div key={`${prefix}-item-${i}`} className="flex items-center gap-6">
        <p>{v}</p>
        <div className="size-[6px] rounded-full bg-[#333333]" />
      </div>,
      <div key={`${prefix}-sp-${i}`} className="w-6 shrink-0" />,
    ]);

  return (
    <a
      className="flex w-full overflow-hidden bg-[#FFC74F] cursor-pointer"
      href="https://account.teuteuf.fr/premium-sign-up"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex w-full py-3 items-center text-lg lg:text-xl text-[#333333]">
        <div className="flex-1 overflow-hidden">
          <div
            ref={trackRef}
            className="whitespace-nowrap text-nowrap uppercase italic marquee-hover-pause"
          >
            <div className="inline-flex items-center will-change-transform marquee-inner">
              {renderCopy("a")}
              {renderCopy("b")}
            </div>
          </div>
        </div>

        <button
          aria-label="Close banner"
          className="shrink-0 px-2 hover:opacity-80"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setClosed(true);
            saveClosed();
          }}
        >
          <CloseRoundedIcon fontSize="small" />
        </button>
      </div>
    </a>
  );
};

export default BackToSchoolBanner;
