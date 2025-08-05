import React from "react";
import {
    MobileSidebar,
    MobileNavList,
    MobileNavItem,
    MobileNavLink,
    MobileOverlay,
    MobileLogoutButton,
} from "../styles/m-nb-style";
import { useAuth } from "../contexts/AuthContext";

const MobileNavbar = ({ isMobileMenuOpen, closeMobileMenu }) => {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        closeMobileMenu();
    };

    return (
        <>
            {/* Mobile Sidebar Menu */}
            {isMobileMenuOpen && <MobileOverlay onClick={closeMobileMenu} />}
            <MobileSidebar
                $isOpen={isMobileMenuOpen}
                className="mobile-sidebar"
            >
                <MobileNavList>
                    <MobileNavItem>
                        <MobileNavLink to="/" onClick={closeMobileMenu}>
                            Home
                        </MobileNavLink>
                    </MobileNavItem>
                    <MobileNavItem>
                        <MobileNavLink to="/faq" onClick={closeMobileMenu}>
                            FAQ
                        </MobileNavLink>
                    </MobileNavItem>
                    <MobileNavItem>
                        <MobileNavLink
                            to="/leaderboard"
                            onClick={closeMobileMenu}
                        >
                            Leaderboard
                        </MobileNavLink>
                    </MobileNavItem>
                    <MobileNavItem>
                        <MobileNavLink
                            to="/downloads"
                            onClick={closeMobileMenu}
                        >
                            Download
                        </MobileNavLink>
                    </MobileNavItem>
                    <MobileNavItem>
                        <MobileNavLink to="/contact" onClick={closeMobileMenu}>
                            Contact
                        </MobileNavLink>
                    </MobileNavItem>
                    {user ? (
                        <MobileNavItem>
                            <MobileLogoutButton onClick={handleLogout}>
                                Logout
                            </MobileLogoutButton>
                        </MobileNavItem>
                    ) : (
                        <MobileNavItem>
                            <MobileNavLink
                                to="/login"
                                onClick={closeMobileMenu}
                            >
                                Login
                            </MobileNavLink>
                        </MobileNavItem>
                    )}
                </MobileNavList>
            </MobileSidebar>
        </>
    );
};

export default MobileNavbar;
