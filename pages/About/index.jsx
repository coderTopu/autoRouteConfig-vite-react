import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function About() {
    return (
        <div>
            <Link to="/About/about-manager">Go to About Manager</Link> <br />
            <Link to="/About/about-user">Go to About User</Link>
            {/* 渲染子路由 */}
            <Outlet />
        </div>
    );
}

export default About;
