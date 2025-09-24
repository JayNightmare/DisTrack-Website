import React, { useState } from "react";
import {
    MobileSidebar,
    MobileNavList,
    MobileNavItem,
    MobileNavLink,
    MobileOverlay,
    MobileLogoutButton,
} from "../styles/m-nb-style";
import UserSearchModal from "./UserSearchModal";
import { useAuth } from "../contexts/AuthContext";

const MobileNavbar = ({ isMobileMenuOpen, closeMobileMenu }) => {
    const { user, logout } = useAuth();
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

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
                        <button
                            onClick={() => {
                                setIsSearchModalOpen(true);
                                closeMobileMenu();
                            }}
                            className="w-full text-left px-4 py-2 text-white hover:bg-zinc-800 transition-colors"
                        >
                            Search Users
                        </button>
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

            {/* User Search Modal */}
            <UserSearchModal
                isOpen={isSearchModalOpen}
                onClose={() => setIsSearchModalOpen(false)}
            />
        </>
    );
};

export default MobileNavbar;
