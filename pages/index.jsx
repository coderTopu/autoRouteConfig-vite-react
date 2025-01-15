import { Link } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            {/* 导航链接 */}
            <nav style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
            </nav>
        </div>
    );
};

export default Home;
