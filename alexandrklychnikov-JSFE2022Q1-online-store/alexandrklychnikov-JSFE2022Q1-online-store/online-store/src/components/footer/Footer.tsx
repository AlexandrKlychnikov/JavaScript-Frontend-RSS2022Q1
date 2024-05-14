import './footer.css';

function Footer() {
  const rssLogo = '/images/rs_school_js.svg';
  const githubLogo = '/images/github_PNG20.png';

  return (
    <footer className="footer">
      &copy;2022
      <a href="https://github.com/AlexandrKlychnikov/">
        <img
          alt="github-logo"
          className="github-logo"
          src={process.env.PUBLIC_URL + githubLogo}
        />
      </a>
      <a href="https://rs.school/js/">
        <img
          alt="rss-logo"
          className="rss-logo"
          src={process.env.PUBLIC_URL + rssLogo}
        />
      </a>
    </footer>
  );
}

export default Footer;
