#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Setting up Day Block Tracker${NC}"

# Check for required commands
command -v node >/dev/null 2>&1 || { 
    echo -e "${YELLOW}Node.js is not installed. Please install Node.js and try again.${NC}" >&2
    exit 1 
}

# Create .env from .env.sample if it doesn't exist
if [ ! -f ".env" ]; then
    if [ -f ".env.sample" ]; then
        cp .env.sample .env
        echo -e "${GREEN}Created .env file from .env.sample${NC}"
    else
        echo -e "${YELLOW}Warning: .env.sample not found. Creating a basic .env file.${NC}"
        echo "PORT=3912" > .env
        echo "NODE_ENV=development" >> .env
    fi
else
    echo -e "${YELLOW}.env file already exists.${NC}"
fi

# Install Node.js dependencies
if [ -f "package.json" ]; then
    echo -e "\n${GREEN}Installing Node.js dependencies...${NC}"
    npm install
else
    echo -e "${YELLOW}package.json not found. Skipping npm install.${NC}"
fi

# Check for Python and install Python dependencies if needed
if command -v python3 --version >/dev/null 2>&1; then
    if [ -f "requirements.txt" ]; then
        echo -e "\n${GREEN}Installing Python dependencies...${NC}"
        pip3 install -r requirements.txt
    fi
else
    echo -e "${YELLOW}Python 3 is not installed. Python server will not be available.${NC}"
fi

echo -e "\n${GREEN}✅ Setup complete!${NC}"
echo -e "\nTo start the application, run one of the following commands:"
echo -e "\n${YELLOW}Node.js server:${NC}"
echo "  npm start"
echo -e "\n${YELLOW}Python server (if installed):${NC}"
echo "  python3 server.py"
echo -e "\nThe application will be available at ${YELLOW}http://localhost:3912${NC}"
