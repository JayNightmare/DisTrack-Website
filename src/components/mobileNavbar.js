import React from "react";
import {
    MobileSidebar,
    MobileNavList,
    MobileNavItem,
    MobileNavLink,
    MobileOverlay,
    MobileLogoutButton,
} from "../styles/m-nb-style";

const MobileNavbar = ({ isMobileMenuOpen, closeMobileMenu }) => {
    const handleLogout = () => {
        // Handle logout logic here
        console.log("User logged out");
        closeMobileMenu();
    };

    // For now, we'll use a mock user state. You can replace this with actual user state later
    const user = null; // Set to null for now, or replace with actual user state

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
                    {user && (
                        <MobileNavItem>
                            <MobileLogoutButton onClick={handleLogout}>
                                Logout
                            </MobileLogoutButton>
                        </MobileNavItem>
                    )}
                </MobileNavList>
            </MobileSidebar>
        </>
    );
};

export default MobileNavbar;
