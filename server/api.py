#!/usr/bin/env python3
"""
Enhanced Flask API for Horoscope Scraper
Provides REST endpoints for daily, monthly, and yearly horoscopes

Install Flask first: pip install flask flask-cors

Usage:
    python api_enhanced.py

Endpoints:
    GET /api/horoscope/<sign>?type=daily        - Get daily horoscope
    GET /api/horoscope/<sign>?type=monthly      - Get monthly horoscope
    GET /api/horoscope/<sign>?type=yearly       - Get yearly horoscope
    GET /api/horoscope/<sign>/all               - Get all types for a sign
    GET /api/horoscopes?type=daily              - Get all daily horoscopes
    GET /api/horoscopes?type=monthly            - Get all monthly horoscopes
    GET /api/horoscopes?type=yearly             - Get all yearly horoscopes
    GET /api/signs                              - List available signs
    POST /api/clear-cache                       - Clear the cache
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
from horoscope import HoroscopeScraper
from datetime import datetime, timedelta
import json
from typing import Optional, Dict, Any, List, Union
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Cache settings
CACHE_DIR = 'cache'
CACHE_DURATION = timedelta(hours=6)  # Cache for 6 hours

scraper = HoroscopeScraper(delay=1.0)

# Ensure cache directory exists
os.makedirs(CACHE_DIR, exist_ok=True)


def get_cache_filename(cache_key: str) -> str:
    """Generate cache filename for a given key"""
    return os.path.join(CACHE_DIR, f"{cache_key}.json")


def load_cache(cache_key: str) -> Optional[Union[dict, List]]:
    """Load cached data if it exists and is valid"""
    cache_file = get_cache_filename(cache_key)
    
    if os.path.exists(cache_file):
        try:
            with open(cache_file, 'r') as f:
                cache = json.load(f)
                cache_time = datetime.fromisoformat(cache['timestamp'])
                
                # Check if cache is still valid
                if datetime.now() - cache_time < CACHE_DURATION:
                    return cache.get('data')
        except Exception as e:
            print(f"Error loading cache: {e}")
    
    return None


def save_cache(cache_key: str, data: Union[dict, List]) -> None:
    """Save data to cache"""
    cache_file = get_cache_filename(cache_key)
    
    try:
        cache = {
            'timestamp': datetime.now().isoformat(),
            'data': data
        }
        with open(cache_file, 'w') as f:
            json.dump(cache, f, indent=2)
    except Exception as e:
        print(f"Error saving cache: {e}")


@app.route('/')
def home():
    """API home page with documentation"""
    return jsonify({
        'name': 'Enhanced Horoscope API',
        'version': '2.0',
        'features': [
            'Daily horoscopes',
            'Monthly horoscopes',
            'Yearly horoscopes',
            'Caching system',
            'All zodiac signs'
        ],
        'endpoints': {
            '/api/signs': 'List all available zodiac signs',
            '/api/horoscope/<sign>?type=<type>': 'Get horoscope for a sign (type: daily/monthly/yearly)',
            '/api/horoscope/<sign>/all': 'Get all horoscope types for a sign',
            '/api/horoscopes?type=<type>': 'Get all horoscopes of a type',
            '/api/clear-cache': 'Clear all cached data (POST)'
        },
        'examples': {
            'daily': '/api/horoscope/aries?type=daily',
            'monthly': '/api/horoscope/aries?type=monthly',
            'yearly': '/api/horoscope/aries?type=yearly',
            'all_types': '/api/horoscope/aries/all',
            'all_daily': '/api/horoscopes?type=daily'
        }
    })


@app.route('/api/signs')
def get_signs():
    """Get list of available zodiac signs"""
    return jsonify({
        'signs': list(scraper.DAILY_URLS.keys()),
        'count': len(scraper.DAILY_URLS)
    })


@app.route('/api/horoscope/<sign>')
def get_horoscope(sign):
    """
    Get horoscope for a specific sign
    Query params: type (daily/monthly/yearly, default: daily)
    """
    sign = sign.lower()
    horoscope_type = request.args.get('type', 'daily').lower()
    
    # Validate sign
    if sign not in scraper.DAILY_URLS:
        return jsonify({
            'error': f'Invalid sign: {sign}',
            'available_signs': list(scraper.DAILY_URLS.keys())
        }), 400
    
    # Validate type
    if horoscope_type not in ['daily', 'monthly', 'yearly']:
        return jsonify({
            'error': f'Invalid type: {horoscope_type}',
            'valid_types': ['daily', 'monthly', 'yearly']
        }), 400
    
    # Try to get from cache
    cache_key = f"{sign}_{horoscope_type}"
    cached_data = load_cache(cache_key)
    
    if cached_data:
        return jsonify({
            'data': cached_data,
            'cached': True,
            'type': horoscope_type
        })
    
    # Scrape fresh data
    horoscope = scraper.scrape_sign(sign, horoscope_type)
    
    if horoscope:
        # Save to cache
        save_cache(cache_key, horoscope)
        
        return jsonify({
            'data': horoscope,
            'cached': False,
            'type': horoscope_type
        })
    else:
        return jsonify({
            'error': f'Failed to fetch {horoscope_type} horoscope for {sign}'
        }), 500


@app.route('/api/horoscope/<sign>/all')
def get_all_types(sign):
    """Get all horoscope types (daily, monthly, yearly) for a specific sign"""
    sign = sign.lower()
    
    # Validate sign
    if sign not in scraper.DAILY_URLS:
        return jsonify({
            'error': f'Invalid sign: {sign}',
            'available_signs': list(scraper.DAILY_URLS.keys())
        }), 400
    
    # Try to get from cache
    cache_key = f"{sign}_all"
    cached_data = load_cache(cache_key)
    
    if cached_data:
        return jsonify({
            'data': cached_data,
            'cached': True
        })
    
    # Scrape all types
    all_types = scraper.scrape_all_types(sign)
    
    if all_types:
        # Save to cache
        save_cache(cache_key, all_types)
        
        return jsonify({
            'data': all_types,
            'cached': False
        })
    else:
        return jsonify({
            'error': f'Failed to fetch horoscopes for {sign}'
        }), 500


@app.route('/api/horoscopes')
def get_all_horoscopes():
    """
    Get all horoscopes of a specific type
    Query params: type (daily/monthly/yearly, default: daily)
    """
    horoscope_type = request.args.get('type', 'daily').lower()
    
    # Validate type
    if horoscope_type not in ['daily', 'monthly', 'yearly']:
        return jsonify({
            'error': f'Invalid type: {horoscope_type}',
            'valid_types': ['daily', 'monthly', 'yearly']
        }), 400
    
    # Try to get from cache
    cache_key = f"all_{horoscope_type}"
    cached_data = load_cache(cache_key)
    
    if cached_data:
        return jsonify({
            'data': cached_data,
            'cached': True,
            'type': horoscope_type,
            'count': len(cached_data)
        })
    
    # Scrape fresh data
    horoscopes = scraper.scrape_all(horoscope_type)
    
    if horoscopes:
        # Save to cache
        save_cache(cache_key, horoscopes)
        
        return jsonify({
            'data': horoscopes,
            'cached': False,
            'type': horoscope_type,
            'count': len(horoscopes)
        })
    else:
        return jsonify({
            'error': f'Failed to fetch {horoscope_type} horoscopes'
        }), 500


@app.route('/api/clear-cache', methods=['POST'])
def clear_cache():
    """Clear all cached data"""
    try:
        # Remove all cache files
        if os.path.exists(CACHE_DIR):
            for filename in os.listdir(CACHE_DIR):
                file_path = os.path.join(CACHE_DIR, filename)
                if os.path.isfile(file_path):
                    os.remove(file_path)
            
            return jsonify({
                'message': 'Cache cleared successfully'
            })
        else:
            return jsonify({
                'message': 'No cache to clear'
            })
    except Exception as e:
        return jsonify({
            'error': f'Failed to clear cache: {str(e)}'
        }), 500


@app.route('/api/cache-status')
def cache_status():
    """Get cache status information"""
    try:
        cache_files = []
        total_size = 0
        
        if os.path.exists(CACHE_DIR):
            for filename in os.listdir(CACHE_DIR):
                file_path = os.path.join(CACHE_DIR, filename)
                if os.path.isfile(file_path):
                    file_size = os.path.getsize(file_path)
                    total_size += file_size
                    
                    # Get file modification time
                    mtime = datetime.fromtimestamp(os.path.getmtime(file_path))
                    age = datetime.now() - mtime
                    
                    cache_files.append({
                        'filename': filename,
                        'size_kb': round(file_size / 1024, 2),
                        'age_hours': round(age.total_seconds() / 3600, 2),
                        'expires_in_hours': round((CACHE_DURATION.total_seconds() - age.total_seconds()) / 3600, 2)
                    })
        
        return jsonify({
            'cache_dir': CACHE_DIR,
            'total_files': len(cache_files),
            'total_size_kb': round(total_size / 1024, 2),
            'cache_duration_hours': CACHE_DURATION.total_seconds() / 3600,
            'files': cache_files
        })
    except Exception as e:
        return jsonify({
            'error': f'Failed to get cache status: {str(e)}'
        }), 500


if __name__ == '__main__':
    print("""
    ╔══════════════════════════════════════════════════════════╗
    ║         Enhanced Horoscope API Server v2.0              ║
    ╠══════════════════════════════════════════════════════════╣
    ║ API is running at: http://localhost:5000                 ║
    ║                                                          ║
    ║ Available Endpoints:                                     ║
    ║   GET  /api/signs                                        ║
    ║   GET  /api/horoscope/<sign>?type=daily                  ║
    ║   GET  /api/horoscope/<sign>?type=monthly                ║
    ║   GET  /api/horoscope/<sign>?type=yearly                 ║
    ║   GET  /api/horoscope/<sign>/all                         ║
    ║   GET  /api/horoscopes?type=daily                        ║
    ║   GET  /api/horoscopes?type=monthly                      ║
    ║   GET  /api/horoscopes?type=yearly                       ║
    ║   GET  /api/cache-status                                 ║
    ║   POST /api/clear-cache                                  ║
    ║                                                          ║
    ║ Examples:                                                ║
    ║   http://localhost:5000/api/horoscope/aries?type=daily   ║
    ║   http://localhost:5000/api/horoscope/leo/all            ║
    ║   http://localhost:5000/api/horoscopes?type=monthly      ║
    ╚══════════════════════════════════════════════════════════╝
    """)
    
    app.run(debug=True, host='0.0.0.0', port=5000)