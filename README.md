<div align=center>

<img src="./public/images/color-d.jpg" width="128" />

# DisTrack Website

A modern React web application for DisTrack, featuring user dashboards, leaderboards, showcase pages, and downloads downloads. Built with React, Tailwind CSS, and React Router.



| Name | Description | Version | Links
| --- | --- | --- | --- |
| VSCode Extension | Discord VSCode Leaderboard Tracker Extension | ![Latest Release](https://img.shields.io/github/v/release/JayNightmare/DisTrack-VSCode-Extension?label=Latest%20Release) | [GitHub](https://github.com/JayNightmare/DisTrack-VSCode-Extension), [Marketplace](https://marketplace.visualstudio.com/items?itemName=JayNightmare.dis-track) |
| Discord Bot | Discord Bot for tracking coding activity | ![Latest Release](https://img.shields.io/github/v/release/JayNightmare/DisTrack-Discord-Bot?label=Latest%20Release) | [GitHub](https://github.com/JayNightmare/DisTrack-Discord-Bot), [Invite](https://discord.com/oauth2/authorize?client_id=1305258645906526328) |
| Discord Manager | Discord bot which manages the Discord server | ![Latest Release](https://img.shields.io/github/v/release/JayNightmare/DisTrack-Discord-Bot-Management?label=Latest%20Release) | [GitHub](https://github.com/JayNightmare/DisTrack-Discord-Bot-Management)
| Website | Website for DisTrack | ![Latest Release](https://img.shields.io/github/v/release/JayNightmare/DisTrack-Website?label=Latest%20Release) | [GitHub](https://github.com/JayNightmare/DisTrack-Website), [Website](https://distrack.nexusgit.info/) |
| Backend Endpoints | API Endpoints for business logic | ![Latest Release](https://img.shields.io/github/v/release/JayNightmare/DisTrack-Backend-Endpoint-Server?label=Latest%20Release) | [GitHub](https://github.com/JayNightmare/DisTrack-Backend-Endpoint-Server)
| Frontend Endpoints | Bot Crawler Rich Embed logic | ![Latest Release](https://img.shields.io/github/v/release/JayNightmare/DisTrack-Frontend-Endpoint-Server?label=Latest%20Release) | [GitHub](https://github.com/JayNightmare/DisTrack-Frontend-Endpoint-Server)

</div>

## Features

- 🏠 **Home Page** - Clean landing page with navigation
- 📊 **Dashboard** - User statistics and data visualization
- 🏆 **Leaderboard** - User rankings and competitive stats
- 🎨 **Showcase** - Features highlights and demonstrations
- 🔗 **Extension** - Download page for extensions for platforms and IDE's
- 📞 **Contact** - Get in touch page

## Currently In Development

<div align=center>

| Feature | Status | Branch |
| :--- | :---: | ---: |
| User Authentication | Planned | feat-user-auth |
| Real-time Leaderboard Updates | Planned | feat-lead |
| Responsive Design | In Progress | feat-responsive |
| Dashboard Stats | Planned | feat-dashboard |
| Contact Info | Planned | patch-contact |

</div>


## Tech Stack

- **React** 19.1.0 - UI framework
- **React Router** 7.7.0 - Client-side routing
- **Tailwind CSS** 3.4.17 - Utility-first CSS framework
- **PostCSS** - CSS preprocessing with nesting support
- **Autoprefixer** - Automatic vendor prefixing

## Getting Started

To get started with this project, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/JayNightmare/distrack-website.git
   cd distrack-website
   ```

2. **Install dependencies**:
   Make sure you have [Node.js](https://nodejs.org/) installed. Then run:
   ```bash
   npm install
   ```

3. **Run the application**:
   Start the development server with:
   ```bash
   npm start
   ```
   This will open the application in your default web browser at `http://localhost:3000`.

## Project Structure

- `public/`: Contains the static files for the application.
  - `index.html`: The main HTML file.
  - `favicon.ico`: The favicon for the website.
  
- `src/`: Contains the source code for the application.
  - `App.js`: The main application component with routing.
  - `index.js`: The entry point for the React application.
  - `index.css`: Global styles with Tailwind CSS directives.
  - `components/`: React components.
    - `particles.js`: Interactive particle effect component.
  - `pages/`: Page components for different routes.
    - `contact.js`: Contact page component.
    - `dashboard.js`: User dashboard component.
    - `downloads.js`: Extension download page.
    - `leaderboard.js`: Leaderboard display component.
    - `showcase.js`: Feature showcase component.
  - `styles/`: CSS stylesheets.
    - `home.css`: Styles for the home page.
  - `util/`: Utility functions.
    - `mouse.js`: Mouse interaction utilities.

- `build/`: Production build output (generated).

## Configuration Files

- `tailwind.config.js`: Tailwind CSS configuration.
- `postcss.config.js`: PostCSS configuration with Tailwind and nesting support.
- `package.json`: Project dependencies and scripts.

## Scripts

- `npm start`: Starts the development server on http://localhost:3000.
- `npm run build`: Builds the app for production to the `build` folder.
- `npm test`: Runs the test suite.
- `npm run eject`: **One-way operation** - ejects from Create React App configuration.

## Development

This project uses:
- **Tailwind CSS** for styling with utility classes
- **PostCSS** with nesting support for enhanced CSS capabilities
- **React Router** for single-page application routing
- **Create React App** for development tooling and build process

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## License

This project is licensed under the CC0-1.0 License.

<div align=center>

| **Allowed** ✅ | **Not Allowed** ❌ |
| :---: | :---: |
| Commercial use | Liability |
| Distribution | Warranty |
| Modification | Trademark Use |
| Private use | Patent Use |

</div>
