import styled from 'styled-components';

const TikTokImg = styled.img`
  height: 34px;
  width: 34px;
  @media (prefers-color-scheme: dark) {
    filter: invert(100%);
  }
`;

export function SocialLinks() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
        marginTop: 24,
      }}
    >
      <a
        href="https://www.facebook.com/teuteufgames/"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src="/facebook.png"
          alt="facebook"
          style={{ width: 36, height: 36 }}
        />
      </a>
      <a
        href="https://www.tiktok.com/@teuteufgames"
        target="_blank"
        rel="noreferrer"
      >
        <TikTokImg src="/tiktok.svg" alt="tiktok" />
      </a>
      <a
        href="https://www.instagram.com/teuteufgames"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src="/instagram.png"
          alt="instagram"
          style={{ width: 31, height: 31 }}
        />
      </a>
    </div>
  );
}
