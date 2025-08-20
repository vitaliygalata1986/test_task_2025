function Logo() {
  return (
    <a href="/">
      <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="logo" />
    </a>
  );
}

export default Logo;
