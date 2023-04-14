import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="http://localhost:9292">Home</Link>
        </li>
        <li>
          <NavLink to="http://localhost:9292/blogs" activeClassName="active">
            All Blogs
          </NavLink>
        </li>
        <li>
          <NavLink to="http://localhost:9292/blogs/art" activeClassName="active">
            Art
          </NavLink>
        </li>
        <li>
          <NavLink to="http://localhost:9292/blogs/design" activeClassName="active">
            Design
          </NavLink>
        </li>
        <li>
          <NavLink to="http://localhost:9292/blogs/technology" activeClassName="active">
            Technology
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;