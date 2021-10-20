import React, { useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';

const Menu = ({ menu }) => {
    return (
        <div className="menu item">{menu.title}</div>
    );
};

export default Menu;
