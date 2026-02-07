#!/usr/bin/env python3
"""
Simple Flask API for Horoscope Scraper
Provides REST endpoints to access horoscope data

Install Flask first: pip install flask flask-cors

Usage:
    python api.py

Endpoints:
    GET /api/horoscope/<sign>        - Get horoscope for a specific sign
    GET /api/horoscopes              - Get all horoscopes
    GET /api/signs                   - List available signs
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
from horoscope import HoroscopeScraper
from datetime import datetime, timedelta
import json
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Cache settings
CACHE_FILE = 'horoscope_cache.json'
CACHE_DURATION = timedelta(hours=6)  # Cache for 6 hours

scraper = HoroscopeScraper(delay=1.0)


def load_cache():
    """Load cached horoscopes"""
    if os.path.exists(CACHE_FILE):
        try:
            with open(CACHE_FILE, 'r') as f:
                cache = json.load(f)
                cache_time = datetime.fromisoformat(cache['timestamp'])
                
                # Check if cache is still valid
                if datetime.now() - cache_time < CACHE_DURATION:
                    return cache['horoscopes']
        except Exception as e:
            print(f"Error loading cache: {e}")
    return None


def save_cache(horoscopes):
    """Save horoscopes to cache"""
    try:
        cache = {
            'timestamp': datetime.now().isoformat(),
            'horoscopes': horoscopes
        }
        with open(CACHE_FILE, 'w') as f:
            json.dump(cache, f, indent=2)
    except Exception as e:
        print(f"Error saving cache: {e}")


@app.route('/')
def home():
    """API home page with documentation"""
    return jsonify({
        'name': 'Horoscope API',
        'version': '1.0',
        'endpoints': {
            '/api/signs': 'List all available zodiac signs',
            '/api/horoscope/<sign>': 'Get horoscope for a specific sign',
            '/api/horoscopes': 'Get all horoscopes',
            '/api/clear-cache': 'Clear the cache'
        },
        'example': 'GET /api/horoscope/aries'
    })


@app.route('/api/signs')
def get_signs():
    """Get list of available zodiac signs"""
    return jsonify({
        'signs': list(scraper.ZODIAC_SIGNS.keys())
    })


@app.route('/api/horoscope/<sign>')
def get_horoscope(sign):
    """Get horoscope for a specific sign"""
    sign = sign.lower()
    
    if sign not in scraper.ZODIAC_SIGNS:
        return jsonify({
            'error': f'Invalid sign: {sign}',
            'available_signs': list(scraper.ZODIAC_SIGNS.keys())
        }), 400
    
    # Try to get from cache first
    cached = load_cache()
    if cached:
        for h in cached:
            if h['sign'].lower() == sign:
                return jsonify({
                    'data': h,
                    'cached': True
                })
    
    # Scrape fresh data
    horoscope = scraper.scrape_sign(sign)
    
    if horoscope:
        return jsonify({
            'data': horoscope,
            'cached': False
        })
    else:
        return jsonify({
            'error': f'Failed to fetch horoscope for {sign}'
        }), 500


@app.route('/api/horoscopes')
def get_all_horoscopes():
    """Get all horoscopes"""
    # Try to get from cache first
    cached = load_cache()
    if cached:
        return jsonify({
            'data': cached,
            'cached': True,
            'count': len(cached)
        })
    
    # Scrape fresh data
    horoscopes = scraper.scrape_all()
    
    if horoscopes:
        # Save to cache
        save_cache(horoscopes)
        
        return jsonify({
            'data': horoscopes,
            'cached': False,
            'count': len(horoscopes)
        })
    else:
        return jsonify({
            'error': 'Failed to fetch horoscopes'
        }), 500


@app.route('/api/clear-cache', methods=['POST'])
def clear_cache():
    """Clear the cache"""
    try:
        if os.path.exists(CACHE_FILE):
            os.remove(CACHE_FILE)
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


@app.route('/api/horoscopes/filter')
def filter_horoscopes():
    """Filter horoscopes by rating"""
    rating_type = request.args.get('rating_type', 'love')  # love, creativity, business
    rating_value = request.args.get('rating_value', 'Excellent')
    
    # Get all horoscopes
    cached = load_cache()
    if not cached:
        cached = scraper.scrape_all()
        if cached:
            save_cache(cached)
    
    if not cached:
        return jsonify({
            'error': 'Failed to fetch horoscopes'
        }), 500
    
    # Filter by rating
    filtered = [
        h for h in cached
        if h.get('ratings', {}).get(rating_type) == rating_value
    ]
    
    return jsonify({
        'data': filtered,
        'count': len(filtered),
        'filter': {
            'rating_type': rating_type,
            'rating_value': rating_value
        }
    })


if __name__ == '__main__':
    print("""
    ╔══════════════════════════════════════════════════════════╗
    ║              Horoscope API Server                        ║
    ╠══════════════════════════════════════════════════════════╣
    ║ API is running at: http://localhost:5000                 ║
    ║                                                          ║
    ║ Available Endpoints:                                     ║
    ║   GET  /api/signs                                        ║
    ║   GET  /api/horoscope/<sign>                             ║
    ║   GET  /api/horoscopes                                   ║
    ║   GET  /api/horoscopes/filter?rating_type=love&...       ║
    ║   POST /api/clear-cache                                  ║
    ║                                                          ║
    ║ Example:                                                 ║
    ║   http://localhost:5000/api/horoscope/aries              ║
    ╚══════════════════════════════════════════════════════════╝
    """)
    
    app.run(debug=True, host='0.0.0.0', port=5000)