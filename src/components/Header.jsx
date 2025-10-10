import logo from "../assets/logo.svg";

function Header() {
  return (
    <header className="flex justify-between bg-transparent w-screen items-center px-12 py-12 absolute top-0 left-0">
      <img src={logo} alt="" className="h-15" />
      <nav>
        <ul className="flex space-x-8 text-first-frost montserrat-semibold">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Business Mode</a>
          </li>
          <li>
            <a href="#">About Us</a>
          </li>
          <li>
            <a href="#">Categories</a>
          </li>
          <li>
            <a href="#">Nearby</a>
          </li>
          <li>
            <a href="#">Bookmark</a>
          </li>
        </ul>
      </nav>
      <button className="w-35 h-14 bg-ivy rounded-2xl montserrat-regular text-first-frost">
        Login
      </button>
    </header>
  );
}

export default Header;
