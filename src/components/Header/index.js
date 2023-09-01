import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsFillBagFill} from 'react-icons/bs'
import {AiOutlineHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav-header">
      <ul className="header-ul-container">
        <li className="logo-container">
          <Link to="/" className="link">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="logo"
            />
          </Link>
        </li>
        <li className="home-jobs-container">
          <Link to="/" className="link">
            <AiOutlineHome className="home-jobs-btn" />
            <h1 className="nav-text">Home</h1>
          </Link>
          <Link className="link" to="/jobs">
            <BsFillBagFill className="home-jobs-btn" />
            <h1 className="nav-text">Jobs</h1>
          </Link>
        </li>
        <li>
          <FiLogOut className="home-icon" onClick={onLogout} />
          <button type="button" className="logout" onClick={onLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)

/* import {BsBagCheck} from 'react-icons/bs'
<Link to="/jobs">
              <BsBagCheck size="30" />
            </Link> 
            
<div className="nav-content">
        <div className="nav-bar-mobile-logo-container">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="logo"
            />
          </Link>
          <div>
            <Link to="/">
              <AiOutlineHome size="30" />
            </Link>

            <button type="button" className="logout" onClick={onLogout}>
              <FiLogOut size="30" />
            </button>
          </div>
        </div>
        <div className="nav-bar-large-container">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="logo"
            />
          </Link>
          <div>
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/jobs" className="nav-link">
              Jobs
            </Link>
          </div>
          <button type="button" className="logout-button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div> */
