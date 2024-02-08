import './header.scss'
import '../../styles/component/_button.scss'

const Header = () => {
  return (
    <div>
        <nav className='header'>
            <div className="header__logo">
                <h3>Task Manager</h3>
            </div>
            <div className="header__buttons">
                <button className='button'>Sign In</button>
                <button className='button'>Sign Out</button>
            </div>
        </nav>
    </div>
  )
}

export default Header