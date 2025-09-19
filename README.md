# Day Block Tracker

Visualize your day in 10-minute blocks. Track time, boost productivity, and master your schedule with a clean, intuitive interface.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/ai-armageddon/Day-Block-Tracker?style=social)](https://github.com/ai-armageddon/Day-Block-Tracker/stargazers)

## Features

- **Visual Time Tracking**: See your day divided into 100 blocks (10 minutes each)
- **Real-time Progress**: Watch your day unfold with smooth animations
- **Interactive Stopwatch**: Millisecond precision tracking
- **Modern UI**: Clean design with dark/light mode
- **Responsive**: Works on desktop and mobile devices
- **No Dependencies**: Built with vanilla JavaScript, HTML, and CSS

## Getting Started

### Prerequisites
- Node.js 14+ and npm
- Python 3.6+ (optional, for Python server)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Quick Start

#### Using Setup Script (Recommended)

1. Clone the repository
   ```bash
   git clone https://github.com/ai-armageddon/Day-Block-Tracker.git
   cd Day-Block-Tracker
   ```

2. Make the setup script executable and run it:
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

3. Start the application using one of these methods:
   - Node.js server (recommended):
     ```bash
     npm start
     ```
   - Python server (alternative):
     ```bash
     python3 server.py
     ```

4. Open `http://localhost:3912` in your browser

#### Manual Setup

If you prefer to set up manually:

1. Copy the environment file:
   ```bash
   cp .env.sample .env
   ```
   
2. Install dependencies:
   ```bash
   # Node.js dependencies
   npm install
   
   # Python dependencies (optional)
   pip3 install -r requirements.txt
   ```

3. Start the server of your choice (see above)

### Configuration

Create a `.env` file in the root directory (or copy from the sample):

```bash
cp .env.sample .env
```

Edit the `.env` file to change the default port or other settings:

```env
# Server Configuration
PORT=3912

# Set to 'production' in production
# NODE_ENV=development
```

## Development

### Local Setup
```bash
# Clone the repository
git clone https://github.com/ai-armageddon/Day-Block-Tracker.git
cd Day-Block-Tracker

# Install dependencies (if any)
npm install

# Start development server
npm start
```

## Project Structure

```
.
├── public/              # Static files
│   ├── index.html       # Main application
│   └── styles/          # CSS files
├── .env.sample          # Environment configuration template
├── server.js            # Express server
└── package.json         # Project configuration
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Project Link: [https://github.com/ai-armageddon/Day-Block-Tracker](https://github.com/ai-armageddon/Day-Block-Tracker)
