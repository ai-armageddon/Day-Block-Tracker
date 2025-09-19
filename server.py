import http.server
import socketserver
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Use PYTHON_PORT if available, otherwise fall back to PORT
PORT = int(os.getenv('PYTHON_PORT', os.getenv('PORT', '3912')))
DIRECTORY = os.getenv('SERVE_DIRECTORY', 'public')

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving at port {PORT}")
    print(f"Open http://localhost:{PORT} in your browser")
    httpd.serve_forever()
