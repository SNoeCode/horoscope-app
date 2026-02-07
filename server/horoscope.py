#!/usr/bin/env python3
"""
Cafe Astrology Horoscope Scraper
Scrapes daily horoscopes for all zodiac signs from cafeastrology.com
"""

import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime
from typing import Dict, List, Optional
import time
import re


class HoroscopeScraper:
    """Scraper for Cafe Astrology daily horoscopes"""
    
    BASE_URL = "https://cafeastrology.com"
    
    ZODIAC_SIGNS = {
        'aries': '/ariesdailyhoroscope.html',
        'taurus': '/taurusdailyhoroscope.html',
        'gemini': '/geminidailyhoroscope.html',
        'cancer': '/cancerdailyhoroscope.html',
        'leo': '/leodailyhoroscope.html',
        'virgo': '/virgodailyhoroscope.html',
        'libra': '/libradailyhoroscope.html',
        'scorpio': '/scorpiodailyhoroscope.html',
        'sagittarius': '/sagittariusdailyhoroscope.html',
        'capricorn': '/capricorndailyhoroscope.html',
        'aquarius': '/aquariusdailyhoroscope.html',
        'pisces': '/piscesdailyhoroscope.html'
    }
    
    def __init__(self, delay: float = 1.0):
        """
        Initialize the scraper
        
        Args:
            delay: Delay between requests in seconds (be respectful to the server)
        """
        self.delay = delay
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
    
    def fetch_page(self, url: str) -> Optional[BeautifulSoup]:
        """
        Fetch and parse a webpage
        
        Args:
            url: URL to fetch
            
        Returns:
            BeautifulSoup object or None if failed
        """
        try:
            response = self.session.get(url, timeout=10)
            response.raise_for_status()
            return BeautifulSoup(response.content, 'html.parser')
        except requests.RequestException as e:
            print(f"Error fetching {url}: {e}")
            return None
    
    def extract_horoscope(self, soup: BeautifulSoup, sign: str) -> Optional[Dict]:
        """
        Extract horoscope data from the page
        
        Args:
            soup: BeautifulSoup object of the page
            sign: Zodiac sign name
            
        Returns:
            Dictionary containing horoscope data
        """
        try:
            # Find the date
            date_text = None
            date_elements = soup.find_all(['h4', 'h3', 'p'])
            for elem in date_elements:
                text = elem.get_text(strip=True)
                # Look for date pattern like "January 30, 2026"
                if re.search(r'[A-Z][a-z]+ \d{1,2}, \d{4}', text):
                    date_text = text
                    break
            
            # Find the main horoscope text
            horoscope_text = None
            
            # Look for paragraphs with substantial text (horoscope content)
            paragraphs = soup.find_all('p')
            for p in paragraphs:
                text = p.get_text(strip=True)
                # Horoscopes are usually longer paragraphs starting with "The Moon" or "dear [Sign]"
                if len(text) > 100 and ('dear' in text.lower() or 'moon' in text.lower()):
                    horoscope_text = text
                    break
            
            # If we didn't find it, try looking in article or main content area
            if not horoscope_text:
                # Look for the main content
                for p in paragraphs:
                    text = p.get_text(strip=True)
                    if len(text) > 200:  # Horoscopes are typically long
                        horoscope_text = text
                        break
            
            # Extract ratings if available (Creativity, Love, Business)
            ratings = {}
            ratings_text = soup.find(string=re.compile(r'Creativity:.*Love:.*Business:'))
            if ratings_text:
                creativity_match = re.search(r'Creativity:\s*(\w+)', ratings_text)
                love_match = re.search(r'Love:\s*(\w+)', ratings_text)
                business_match = re.search(r'Business:\s*(\w+)', ratings_text)
                
                if creativity_match:
                    ratings['creativity'] = creativity_match.group(1)
                if love_match:
                    ratings['love'] = love_match.group(1)
                if business_match:
                    ratings['business'] = business_match.group(1)
            
            return {
                'sign': sign.capitalize(),
                'date': date_text or datetime.now().strftime('%B %d, %Y'),
                'horoscope': horoscope_text or "Horoscope text not found",
                'ratings': ratings,
                'scraped_at': datetime.now().isoformat()
            }
            
        except Exception as e:
            print(f"Error extracting horoscope for {sign}: {e}")
            return None
    
    def scrape_sign(self, sign: str) -> Optional[Dict]:
        """
        Scrape horoscope for a specific sign
        
        Args:
            sign: Zodiac sign name (lowercase)
            
        Returns:
            Dictionary containing horoscope data
        """
        if sign not in self.ZODIAC_SIGNS:
            print(f"Invalid sign: {sign}")
            return None
        
        url = self.BASE_URL + self.ZODIAC_SIGNS[sign]
        print(f"Scraping {sign.capitalize()}...")
        
        soup = self.fetch_page(url)
        if not soup:
            return None
        
        horoscope = self.extract_horoscope(soup, sign)
        
        # Be respectful - add delay between requests
        time.sleep(self.delay)
        
        return horoscope
    
    def scrape_all(self) -> List[Dict]:
        """
        Scrape horoscopes for all zodiac signs
        
        Returns:
            List of dictionaries containing horoscope data
        """
        horoscopes = []
        
        for sign in self.ZODIAC_SIGNS.keys():
            horoscope = self.scrape_sign(sign)
            if horoscope:
                horoscopes.append(horoscope)
        
        return horoscopes
    
    def save_to_json(self, horoscopes: List[Dict], filename: str = 'horoscopes.json'):
        """
        Save horoscopes to JSON file
        
        Args:
            horoscopes: List of horoscope dictionaries
            filename: Output filename
        """
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(horoscopes, f, indent=2, ensure_ascii=False)
        print(f"\nSaved {len(horoscopes)} horoscopes to {filename}")
    
    def save_to_csv(self, horoscopes: List[Dict], filename: str = 'horoscopes.csv'):
        """
        Save horoscopes to CSV file
        
        Args:
            horoscopes: List of horoscope dictionaries
            filename: Output filename
        """
        import csv
        
        with open(filename, 'w', newline='', encoding='utf-8') as f:
            if not horoscopes:
                return
            
            # Get all possible fields
            fieldnames = ['sign', 'date', 'horoscope', 'creativity', 'love', 'business', 'scraped_at']
            
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            
            for h in horoscopes:
                row = {
                    'sign': h['sign'],
                    'date': h['date'],
                    'horoscope': h['horoscope'],
                    'scraped_at': h['scraped_at']
                }
                # Add ratings if they exist
                if h.get('ratings'):
                    row['creativity'] = h['ratings'].get('creativity', '')
                    row['love'] = h['ratings'].get('love', '')
                    row['business'] = h['ratings'].get('business', '')
                
                writer.writerow(row)
        
        print(f"Saved {len(horoscopes)} horoscopes to {filename}")


def main():
    """Main function to demonstrate usage"""
    print("Cafe Astrology Horoscope Scraper")
    print("=" * 50)
    
    # Create scraper instance
    scraper = HoroscopeScraper(delay=1.0)
    
    # Example 1: Scrape a single sign
    print("\nExample 1: Scraping single sign (Aries)")
    aries_horoscope = scraper.scrape_sign('aries')
    if aries_horoscope:
        print(f"\nSign: {aries_horoscope['sign']}")
        print(f"Date: {aries_horoscope['date']}")
        print(f"Horoscope: {aries_horoscope['horoscope'][:200]}...")
        if aries_horoscope.get('ratings'):
            print(f"Ratings: {aries_horoscope['ratings']}")
    
    # Example 2: Scrape all signs
    print("\n" + "=" * 50)
    print("Example 2: Scraping all signs")
    print("=" * 50)
    all_horoscopes = scraper.scrape_all()
    
    # Save to files
    if all_horoscopes:
        scraper.save_to_json(all_horoscopes, 'horoscopes.json')
        scraper.save_to_csv(all_horoscopes, 'horoscopes.csv')
        
        # Print summary
        print(f"\nSuccessfully scraped {len(all_horoscopes)} horoscopes")
        print("\nSummary:")
        for h in all_horoscopes:
            print(f"  {h['sign']}: {len(h['horoscope'])} characters")


if __name__ == "__main__":
    main()