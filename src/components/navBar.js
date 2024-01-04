import { Link } from "react-router-dom";

const NavBar = () => {

  return (

    <div className="navbar">

      <div className="logo">
        LOGO
      </div>

      <div className="links">
        <div>
          &nbsp; <a href="#Home"><Link to="/">Home</Link></a>

        </div>
        <div className="linkAbout">
          &nbsp;<a href="#About">About</a>
        </div>
        <div>
          &nbsp;<a href="#Blog">Blog</a>
        </div>
        <div>
          <button> <Link to="/signIn">log out</Link></button>

        </div>
      </div>
    </div>
  );
}
export default NavBar;
