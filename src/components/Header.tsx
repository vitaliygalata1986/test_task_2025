import Button from './Button/Button';
import Logo from './Logo';

function Header() {
  return (
    <header className="m-auto max-w-[1170px] px-4 md:px-8 lg:px-[60px] xl:px-0 py-[13px] flex justify-between items-center">
      <Logo />
      <div className="flex justify-between items-center gap-2.5">
        <Button>Users</Button>
        <Button>Sign up</Button>
      </div>
    </header>
  );
}

export default Header;

