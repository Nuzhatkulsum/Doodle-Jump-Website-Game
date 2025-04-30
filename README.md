# Doodle Jump Game

## Project Description
A web-based implementation of the classic Doodle Jump game where players control a ninja character jumping from platform to platform, trying to reach new heights and achieve high scores. The game features endless vertical scrolling, score tracking, and a leaderboard system.

## Live Demo
Play the game here: [Doodle Jump Ninja](https://doodle-jump-ninja.windsurf.build)

## Video: is in files only



## Technologies Used
- **Frontend**:
  - HTML5 Canvas for game rendering
  - Vanilla JavaScript for game logic
  - CSS3 for styling

- **Backend**:
  - Node.js
  - Express.js for server implementation
  - RESTful API for leaderboard functionality

- **Deployment**:
  - Netlify for hosting

## Features
- Smooth platform-to-platform jumping mechanics
- Responsive controls using arrow keys
- Real-time score tracking
- High score system with local storage
- Online leaderboard
- Ninja character with directional animations
- Restart functionality

## Screenshots
![image](https://github.com/user-attachments/assets/ccef0694-738a-44fc-94b1-432cbb37c371)
![image](https://github.com/user-attachments/assets/a5874e3c-22ce-4a62-8508-0475748f5517)
*Game Interface with Ninja Character*

![image](https://github.com/user-attachments/assets/b9dd8003-13cb-4f7a-aafa-9d8ca52d1921)
*Game Over Screen with Leaderboard*

## How to Deploy on Netlify

1. **Prepare Your Repository**
   - Ensure all code is committed to your GitHub repository
   - Verify the presence of required files:
     - `netlify.toml`
     - `package.json`
     - `.gitignore`

2. **Deploy to Netlify**
   - Sign up/Login to [Netlify](https://www.netlify.com)
   - Click "New site from Git"
   - Select your GitHub repository
   - Configure build settings:
     - Build command: `npm install`
     - Publish directory: `.`
   - Click "Deploy site"

3. **Configure Domain**
   - Once deployed, Netlify will provide a random subdomain
   - You can set up a custom domain in site settings

4. **Verify Deployment**
   - Check if the site is live
   - Test all functionality
   - Verify leaderboard API connectivity

## Local Development
1. Clone the repository
```bash
git clone <repository-url>
cd doodle-jump
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
node server.js
```

4. Open `http://localhost:3000` in your browser

## Game Controls
- **←** Move Left
- **→** Move Right
- Use the Restart button to quickly start a new game

## Contributing
Feel free to fork this repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
