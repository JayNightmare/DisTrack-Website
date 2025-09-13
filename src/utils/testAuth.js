// Test utility to simulate authentication for debugging
export const testLogin = () => {
    const testUser = {
        id: "373097473553727488",
        userId: "373097473553727488",
        discordId: "373097473553727488",
        username: "jaynightmare",
        displayName: "JayNightmare",
        bio: "This is a test user for Distrack.",
        avatarUrl: "https://avatar.iran.liara.run/public",
        socials: {},
        email: "test@example.com",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    localStorage.setItem("distrack_user", JSON.stringify(testUser));
    console.log("Test user saved to localStorage:", testUser);

    // Refresh the page to trigger the auth context effect
    window.location.reload();
};

export const testLogout = () => {
    localStorage.removeItem("distrack_user");
    console.log("Test user removed from localStorage");
    window.location.reload();
};

// Make these available globally for testing
window.testLogin = testLogin;
window.testLogout = testLogout;
