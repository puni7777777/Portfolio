# File Upload Server

A simple Express.js server to handle file uploads from your Next.js portfolio. Can be deployed on any Linux machine (Ubuntu, CentOS, etc.) or cloud instances (AWS EC2, DigitalOcean, etc.).

## Setup on Linux Machine

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
- HTTP server runs on port 3001, HTTPS on port 3443 (if certificates are available).

## HTTPS Setup

### Option 1: Self-Signed Certificates (For Testing)

1. Create the SSL directory:
   ```
   mkdir ssl
   cd ssl
   ```

2. Generate self-signed certificate:
   ```
   openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
   ```

3. Fill in the certificate details (you can use defaults for testing).

4. The server will automatically detect the certificates and enable HTTPS.

**Note:** Self-signed certificates will show security warnings in browsers. Click "Advanced" and "Proceed to site" for testing.

### Option 2: Let's Encrypt (For Production)

1. Install Certbot:
   ```
   sudo apt update
   sudo apt install certbot
   ```

2. Get certificate (replace `yourdomain.com` with your actual domain):
   ```
   sudo certbot certonly --standalone -d yourdomain.com
   ```

3. Copy certificates to ssl directory:
   ```
   sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem ssl/key.pem
   sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem ssl/cert.pem
   ```

4. Set proper permissions:
   ```
   sudo chown $(whoami) ssl/*.pem
   ```

5. Set up auto-renewal:
   ```
   sudo crontab -e
   ```
   Add this line:
   ```
   0 12 * * * /usr/bin/certbot renew --quiet && cp /etc/letsencrypt/live/yourdomain.com/privkey.pem /path/to/ubuntu-server/ssl/key.pem && cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem /path/to/ubuntu-server/ssl/cert.pem && chown $(whoami) /path/to/ubuntu-server/ssl/*.pem
   ```

### Using HTTPS

Once HTTPS is enabled, update your Vercel environment variable:
- **UBUNTU_SERVER_URL**: `https://yourdomain.com:3443` (or your server's HTTPS URL)

## Usage

The server exposes the following endpoints:

### Single File Upload
- **Endpoint:** `POST /upload`
- **Content-Type:** `multipart/form-data`
- **Field:** `file`

Example with curl:
```
curl -X POST -F "file=@example.txt" http://localhost:3001/upload
```

### Batch File Upload
- **Endpoint:** `POST /batchupload`
- **Content-Type:** `multipart/form-data`
- **Field:** `files` (multiple files allowed)

Example with curl:
```
curl -X POST -F "files=@file1.txt" -F "files=@file2.jpg" http://localhost:3001/batchupload
```

## Making the Server Internet Accessible

To allow your Vercel-hosted website to upload files, you need to make this server accessible from the internet. Here are the options:

### Option 1: Port Forwarding
1. Find your local IP: `ip addr show | grep "inet "`
2. Configure port forwarding on your router (forward port 3001 to your Ubuntu machine)
3. Find your public IP at [whatismyipaddress.com](https://whatismyipaddress.com)
4. Set `UBUNTU_SERVER_URL=http://YOUR_PUBLIC_IP:3001` in Vercel environment variables

### Option 2: Ngrok (for testing)
1. Install ngrok: `wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.tgz && tar xvf ngrok-v3-stable-linux-amd64.tgz && sudo mv ngrok /usr/local/bin/`
2. Run: `ngrok http 3001`
3. Use the provided URL in Vercel environment variables

### Option 3: Cloud Hosting
Deploy to AWS EC2, DigitalOcean, or similar for production use.
