# Ubuntu Upload Server

A simple Express.js server to handle file uploads from your Next.js portfolio.

## Setup on Ubuntu

1. Install Node.js (if not already installed):
   ```
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. Navigate to the ubuntu-server directory:
   ```
   cd /path/to/ubuntu-server
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Run the server:
   ```
   npm start
   ```

The server will run on port 3001 by default.

## Configuration

- Uploads are saved to `./uploads` directory.
- CORS is enabled for cross-origin requests.
- Max file size is not limited (you can add limits if needed).

## Usage

The server exposes a POST endpoint at `/upload` that accepts multipart/form-data with a `file` field.

Example with curl:
```
curl -X POST -F "file=@example.txt" http://localhost:3001/upload
