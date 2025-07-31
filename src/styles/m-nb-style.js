import styled from "styled-components";
import { Link } from "react-router-dom";

export const LogoutButton = styled.button`
    background: #ff4d4f;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 0.3rem 0.8rem;
    font-weight: 500;
    cursor: pointer;
    &:hover {
        background: #d9363e;
    }
`;

// Mobile Navigation Styles
export const HamburgerButton = styled.button`
    display: none;
    flex-direction: column;
    justify-content: space-around;
    width: 30px;
    height: 30px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 100;

    @media (max-width: 768px) {
        display: flex;
    }

    span {
        width: 100%;
        height: 3px;
        background: ${(props) => (props.$isOpen ? "#61dafb" : "#fff")};
        border-radius: 10px;
        transition: all 0.3s linear;
        transform-origin: 1px;

        &:first-child {
            transform: ${(props) =>
                props.$isOpen ? "rotate(45deg)" : "rotate(0)"};
        }

        &:nth-child(2) {
            opacity: ${(props) => (props.$isOpen ? "0" : "1")};
            transform: ${(props) =>
                props.$isOpen ? "translateX(20px)" : "translateX(0)"};
        }

        &:nth-child(3) {
            transform: ${(props) =>
                props.$isOpen ? "rotate(-45deg)" : "rotate(0)"};
        }
    }
`;

export const MobileOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    display: none;

    @media (max-width: 550px) {
        display: block;
    }
`;

export const MobileSidebar = styled.div`
    position: fixed;
    top: 0;
    right: ${(props) => (props.$isOpen ? "0" : "-300px")};
    width: 280px;
    height: 100vh;
    background: #111;
    z-index: 1000;
    transition: right 0.3s ease-in-out;
    border-left: 1px solid #333;
    display: none;

    @media (max-width: 550px) {
        display: block;
    }
`;

export const MobileNavList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 80px 0 0 0;
    display: flex;
    flex-direction: column;
`;

export const MobileNavItem = styled.li`
    border-bottom: 1px solid #333;
`;

export const MobileNavLink = styled(Link)`
    color: #fff;
    text-decoration: none;
    font-weight: 500;
    display: block;
    padding: 1rem 2rem;
    transition: all 0.3s ease;

    &:hover {
        color: #61dafb;
        background: #1a1a1a;
    }
`;

export const MobileLogoutButton = styled.button`
    background: #ff4d4f;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 0.75rem 2rem;
    font-weight: 500;
    cursor: pointer;
    width: calc(100% - 4rem);
    margin: 1rem 2rem;
    transition: background 0.3s ease;

    &:hover {
        background: #d9363e;
    }
`;
