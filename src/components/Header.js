import { Link } from "react-router-dom";

const Header = ({isAdmin, balance}) => {
  return (
    <header id="header" className="header-style-1">
      <div className="container">
        <div className="row clearfix">
          <div className="header-clear clearfix">
            <div className="header-content-left clearfix">
              {" "}
              {/* LOGO START
                          ============================================= */}
              <div className="logo">
                <Link to="/">
                  <h2 style={{ color: "white" }}>BUUKER</h2>
                </Link>
              </div>
              {/* LOGO END */}
            </div>
            <div className="header-content-center clearfix">
              {/* NAVIGATION START============================================= */}
              <nav className="main-nav">
                {/* Mobile menu toggle button (hamburger/x icon) */}
                <input id="main-menu-state" type="checkbox" />
                <label
                  className="main-menu-btn sub-menu-trigger"
                  htmlFor="main-menu-state"
                >
                  <span className="main-menu-btn-icon" /> Toggle main menu
                  visibility
                </label>
                {/* Sample menu definition */}
                <ul id="main-menu" className="sm sm-clean">
                  <li className="menu-item">
                    <Link to="/" className="menu-link">
                      Home
                    </Link>
                  </li>
                  {isAdmin && <li className="menu-item">
                    <Link to="/admin" className="menu-link">
                      Admin
                    </Link>
                  </li>}
                  <li className="menu-item">
                    <a className="menu-link">
                      {balance}cUSD
                    </a>
                  </li>
                </ul>
              </nav>
              {/* NAVIGATION END */}
            </div>
            <div className="header-content-right">
              <div className="header-info head-item clearfix">
                <div className="info-wrap"></div>
              </div>
            </div>
            {/* /search */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
