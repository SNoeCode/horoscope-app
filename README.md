# Astrology Horoscope Scraper

A Python web scraper for extracting daily horoscopes from[ Astrology](https://cafeastrology.com/sundailyhoroscopes.html).

## Features

* Scrapes daily horoscopes for all 12 zodiac signs
* Extracts horoscope text, date, and ratings (Creativity, Love, Business)
* Saves data to JSON or CSV format
* Respectful scraping with configurable delays between requests
* Error handling and retry logic
* Clean, well-documented code

## Installation

1. Install Python 3.7 or higher
2. Install dependencies:

```bash
pip install -r requirements.txt
```

Or install manually:

```bash
pip install requests beautifulsoup4 lxml
```

## Usage

### Basic Usage

Run the scraper to get all horoscopes:

```bash
python horoscope_scraper.py
```

This will:

* Scrape horoscopes for all 12 zodiac signs
* Save results to `horoscopes.json` and `horoscopes.csv`
* Print a summary to the console

### Using as a Module

```python
from horoscope_scraper import HoroscopeScraper

# Create scraper instance
scraper = HoroscopeScraper(delay=1.0)

# Scrape a single sign
aries = scraper.scrape_sign('aries')
print(aries)

# Scrape all signs
all_horoscopes = scraper.scrape_all()

# Save to JSON
scraper.save_to_json(all_horoscopes, 'my_horoscopes.json')

# Save to CSV
scraper.save_to_csv(all_horoscopes, 'my_horoscopes.csv')
```

### Available Zodiac Signs

* aries
* taurus
* gemini
* cancer
* leo
* virgo
* libra
* scorpio
* sagittarius
* capricorn
* aquarius
* pisces

## Output Format

### JSON Format

```json
[
  {
    "sign": "Aries",
    "date": "January 30, 2026",
    "horoscope": "The Moon spends another day in your home and family sector...",
    "ratings": {
      "creativity": "Excellent",
      "love": "Excellent",
      "business": "Fair"
    },
    "scraped_at": "2026-01-30T12:00:00.000000"
  }
]
```

### CSV Format

| sign  | date             | horoscope          | creativity | love      | business | scraped_at          |
| ----- | ---------------- | ------------------ | ---------- | --------- | -------- | ------------------- |
| Aries | January 30, 2026 | The Moon spends... | Excellent  | Excellent | Fair     | 2026-01-30T12:00:00 |

## Configuration

### Delay Between Requests

To be respectful to the server, the scraper includes a delay between requests:

```python
# Default: 1 second delay
scraper = HoroscopeScraper(delay=1.0)

# Faster (use with caution)
scraper = HoroscopeScraper(delay=0.5)

# Slower (more respectful)
scraper = HoroscopeScraper(delay=2.0)
```

## Best Practices

1. **Be Respectful** : Don't scrape too frequently. The default 1-second delay is reasonable.
2. **Cache Results** : Save the results and reuse them instead of scraping repeatedly.
3. **Error Handling** : The scraper handles errors gracefully, but check your internet connection if you encounter issues.
4. **Terms of Service** : Make sure your use complies with Cafe Astrology's terms of service.

## Example Output

```
Cafe Astrology Horoscope Scraper
==================================================

Example 1: Scraping single sign (Aries)
Scraping Aries...

Sign: Aries
Date: January 30, 2026
Horoscope: The Moon spends another day in your home and family sector, dear Aries...
Ratings: {'creativity': 'Excellent', 'love': 'Excellent', 'business': 'Fair'}

==================================================
Example 2: Scraping all signs
==================================================
Scraping Aries...
Scraping Taurus...
Scraping Gemini...
...

Saved 12 horoscopes to horoscopes.json
Saved 12 horoscopes to horoscopes.csv

Successfully scraped 12 horoscopes

Summary:
  Aries: 1234 characters
  Taurus: 1156 characters
  ...
```

## Troubleshooting

### Import Errors

Make sure all dependencies are installed:

```bash
pip install -r requirements.txt
```

### Connection Errors

* Check your internet connection
* The website might be temporarily unavailable
* Try increasing the delay between requests

### Missing Data

* The website structure may have changed
* Check the error messages for details
* The scraper includes fallback methods to find content

## Advanced Usage

### Custom Data Processing

```python
scraper = HoroscopeScraper()
horoscopes = scraper.scrape_all()

# Filter by sign
aries_horoscopes = [h for h in horoscopes if h['sign'] == 'Aries']

# Get signs with excellent love ratings
love_excellent = [
    h for h in horoscopes 
    if h.get('ratings', {}).get('love') == 'Excellent'
]

# Create custom output
for h in horoscopes:
    print(f"{h['sign']}: {h['horoscope'][:100]}...")
```

### Integration with Other Tools

```python

# 🐳 Docker Setup for Horoscope & Numerology App

Complete Docker containerization for your React + Vite frontend with Python horoscope scraper backend.

## 🎯 What's Included

- **Frontend Container**: React + Vite app with Nginx
- **Backend Container**: Python Flask API with horoscope scraper
- **Development Mode**: Hot reload for both frontend and backend
- **Production Mode**: Optimized builds with Nginx reverse proxy
- **CI/CD Pipeline**: GitHub Actions workflow
- **Management Scripts**: Easy Docker management

## 📦 Quick Start

### Prerequisites

- Docker 20.10+ and Docker Compose 2.0+
- Git

### 1. Clone and Setup

```bash
# Clone your repository
git clone <your-repo-url>
cd <your-repo>

# Create environment file
cp .env.example .env

# Edit .env with your settings (optional)
nano .env
```

### 2. Run in Development Mode

```bash
# Using docker-compose
docker-compose -f docker-compose.dev.yml up

# OR using the management script
chmod +x docker-manager.sh
./docker-manager.sh start-dev
```

**Access:**

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

### 3. Run in Production Mode

```bash
# Using docker-compose
docker-compose up -d --build

# OR using the management script
./docker-manager.sh start-prod
```

**Access:**

- Frontend: http://localhost
- Backend API: http://localhost:5000

## 🏗️ Project Structure

```
your-project/
├── frontend/                    # React application
│   ├── src/
│   │   ├── componets/
│   │   │   ├── Navbar/
│   │   │   ├── Home/
│   │   │   ├── Learn/
│   │   │   ├── NumCalculator/
│   │   │   ├── GetSign/
│   │   │   ├── Footer/
│   │   │   └── LifePath/
│   │   └── App.jsx
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── Dockerfile.frontend          # Frontend image definition
├── Dockerfile.backend           # Backend image definition
├── docker-compose.yml           # Production orchestration
├── docker-compose.dev.yml       # Development orchestration
├── nginx.conf                   # Nginx configuration
├── .dockerignore               # Files to exclude from images
│
├── horoscope_scraper.py        # Horoscope scraper
├── api.py                      # Flask REST API
├── requirements-backend.txt    # Python dependencies
│
├── docker-manager.sh           # Management script
├── .env.example               # Environment template
├── DOCKER_GUIDE.md            # Detailed documentation
└── README.md                  # This file
```

## 🚀 Docker Management Script

The `docker-manager.sh` script simplifies Docker operations:

```bash
# Make executable (first time only)
chmod +x docker-manager.sh

# Start production
./docker-manager.sh start-prod

# Start development
./docker-manager.sh start-dev

# Stop all services
./docker-manager.sh stop

# View logs
./docker-manager.sh logs
./docker-manager.sh logs backend
./docker-manager.sh logs frontend

# Check status
./docker-manager.sh status

# Access container shell
./docker-manager.sh shell frontend
./docker-manager.sh shell backend

# Rebuild images
./docker-manager.sh build

# Clean everything
./docker-manager.sh clean

# See all commands
./docker-manager.sh help
```

## 🔧 Configuration

### Environment Variables

Edit `.env` file to configure:

```env
# Backend
FLASK_ENV=production
CACHE_DURATION_HOURS=6
SCRAPER_DELAY=1.0

# Frontend
VITE_API_URL=http://localhost:5000
VITE_APP_NAME="Astrology App"
```

### Custom Ports

Edit `docker-compose.yml`:

```yaml
services:
  frontend:
    ports:
      - "8080:80"  # Change from 80 to 8080
  backend:
    ports:
      - "3001:5000"  # Change from 5000 to 3001
```

## 🔍 API Endpoints

The backend provides the following endpoints:

```
GET  /                          - API info
GET  /api/signs                 - List all zodiac signs
GET  /api/horoscope/<sign>      - Get horoscope for a sign
GET  /api/horoscopes            - Get all horoscopes
GET  /api/horoscopes/filter     - Filter by rating
POST /api/clear-cache           - Clear the cache
```

### Example API Calls

```bash
# Get all signs
curl http://localhost:5000/api/signs

# Get Aries horoscope
curl http://localhost:5000/api/horoscope/aries

# Get all horoscopes
curl http://localhost:5000/api/horoscopes

# Filter by love rating
curl "http://localhost:5000/api/horoscopes/filter?rating_type=love&rating_value=Excellent"
```

## 🐛 Troubleshooting

### Issue: Port already in use

```bash
# Find what's using the port
lsof -i :80
lsof -i :5000

# Stop the process or change port in docker-compose.yml
```

### Issue: Frontend can't reach backend

**In Development:**

```javascript
// frontend/vite.config.js
proxy: {
  '/api': {
    target: 'http://localhost:5000',  // Use localhost
    changeOrigin: true
  }
}
```

**In Production:**
The nginx.conf already handles this with reverse proxy.

### Issue: Changes not reflecting

```bash
# Development mode should auto-reload, but if not:
docker-compose -f docker-compose.dev.yml down
docker-compose -f docker-compose.dev.yml up --build

# For production:
docker-compose down
docker-compose up -d --build
```

### Issue: Container exits immediately

```bash
# Check logs
docker-compose logs backend
docker-compose logs frontend

# Check specific container
docker logs <container-id>
```

### Issue: Module not found errors

```bash
# Rebuild without cache
docker-compose build --no-cache
docker-compose up -d
```

## 📊 Monitoring

### View Container Status

```bash
docker-compose ps
```

### Resource Usage

```bash
docker stats
```

### View Logs

```bash
# All logs
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend

# Last 100 lines
docker-compose logs --tail=100 backend
```

## 🔄 Development Workflow

1. **Make changes** to your code
2. **See changes instantly** (hot reload is enabled)
3. **Test** in the browser
4. **Commit** when satisfied

### Backend Changes

Changes to Python files automatically reload the Flask server.

### Frontend Changes

Changes to React components automatically rebuild and reload in browser.

## 🚢 Deployment

### Deploy to VPS/Server

```bash
# SSH into your server
ssh user@your-server.com

# Clone repository
git clone <your-repo>
cd <your-repo>

# Copy and configure environment
cp .env.example .env
nano .env

# Start production
docker-compose up -d --build

# Check status
docker-compose ps
```

### Deploy with GitHub Actions

The included `.github/workflows/docker-ci.yml` automates:

- Building Docker images
- Running tests
- Pushing to container registry
- Deploying to production

**Setup:**

1. Add secrets to GitHub repository:

   - `DEPLOY_KEY`: SSH key for server
   - `DEPLOY_HOST`: Server IP/domain
   - `DEPLOY_USER`: SSH username
2. Push to main branch:

   ```bash
   git push origin main
   ```
3. GitHub Actions will automatically deploy!

## 🔐 Security Best Practices

1. **Don't commit `.env` file**

   ```bash
   # Add to .gitignore
   echo ".env" >> .gitignore
   ```
2. **Use secrets for sensitive data**

   - Store API keys in `.env`
   - Use Docker secrets in production
3. **Update dependencies regularly**

   ```bash
   # Frontend
   cd frontend && npm update

   # Backend
   pip install --upgrade -r requirements-backend.txt
   ```
4. **Don't expose backend port in production**

   ```yaml
   # Comment out in docker-compose.yml
   # backend:
   #   ports:
   #     - "5000:5000"
   ```

## 📚 Additional Resources

- [Docker Guide](DOCKER_GUIDE.md) - Comprehensive documentation
- [Horoscope Scraper README](README.md) - Scraper documentation
- [Quick Start](QUICKSTART.md) - Quick reference

## 🆘 Getting Help

1. Check the logs: `./docker-manager.sh logs`
2. Review [DOCKER_GUIDE.md](DOCKER_GUIDE.md)
3. Search issues in repository
4. Create new issue with logs and error messages

## 📝 License

[Your License Here]

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test with Docker
5. Submit pull request

---

**Happy Coding! 🌟**

Made with ❤️ using Docker 🐳import pandas as pd

# Convert to pandas DataFrame

scraper = HoroscopeScraper()
horoscopes = scraper.scrape_all()
df = pd.DataFrame(horoscopes)

# Analyze ratings

print(df['ratings'].value_counts())

# Export to Excel

df.to_excel('horoscopes.xlsx', index=False)

```

```

## License

This scraper is provided for educational purposes. Please respect Cafe Astrology's terms of service and copyright when using this tool.

## Disclaimer

This tool is not affiliated with Cafe Astrology. Please use responsibly and in accordance with the website's terms of service. Don't abuse the scraper by making excessive requests.
