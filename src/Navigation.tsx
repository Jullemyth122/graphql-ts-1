import { Link } from 'react-router-dom'

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/accounts">Accounts</Link>
                </li>
                <li>
                    <Link to="/accounts/new">Create Account</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation