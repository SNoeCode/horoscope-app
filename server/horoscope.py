"""
Cafe Astrology Horoscope Scraper - Enhanced Version
Scrapes daily, monthly, and yearly horoscopes for all zodiac signs from cafeastrology.com
"""

import os
import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime
from typing import Dict, List, Optional
import time
import re


class HoroscopeScraper:
    """Enhanced scraper for Cafe Astrology horoscopes (daily, monthly, yearly)"""
    
    BASE_URL = "https://cafeastrology.com"
    
    # Daily horoscope URLs
    DAILY_URLS = {
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
    
    # Monthly horoscope URLs
    MONTHLY_URLS = {
        'aries': '/monthlyarieshoroscope.html',
        'taurus': '/monthlytaurushoroscope.html',
        'gemini': '/monthlygeminihoroscope.html',
        'cancer': '/monthlycancerhoroscope.html',
        'leo': '/monthlyleohoroscope.html',
        'virgo': '/monthlyvirgohoroscope.html',
        'libra': '/monthlylibrahoroscope.html',
        'scorpio': '/monthlyscorpiohoroscope.html',
        'sagittarius': '/monthlysagittariushoroscope.html',
        'capricorn': '/monthlycapricornhoroscope.html',
        'aquarius': '/monthlyaquariushoroscope.html',
        'pisces': '/monthlypisceshoroscope.html'
    }
    
    # Yearly horoscope URLs (2026)
    YEARLY_URLS = {
        'aries': '/2026-aries-horoscope-summary.html',
        'taurus': '/2026-taurus-horoscope-summary.html',
        'gemini': '/2026-gemini-horoscope-summary.html',
        'cancer': '/2026-cancer-horoscope-summary.html',
        'leo': '/2026-leo-horoscope-summary.html',
        'virgo': '/2026-virgo-horoscope-summary.html',
        'libra': '/2026-libra-horoscope-summary.html',
        'scorpio': '/2026-scorpio-horoscope-summary.html',
        'sagittarius': '/2026-sagittarius-horoscope-summary.html',
        'capricorn': '/2026-capricorn-horoscope-summary.html',
        'aquarius': '/2026-aquarius-horoscope-summary.html',
        'pisces': '/2026-pisces-horoscope-summary.html'
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
    
    def extract_daily_horoscope(self, soup: BeautifulSoup, sign: str) -> Optional[Dict]:
        """
        Extract daily horoscope data from the page
        
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
                'date': date_text or datetime.now().strftime('%B %d, %Y'),
                'summary': horoscope_text or "Horoscope text not found",
                'ratings': ratings,
                'scraped_at': datetime.now().isoformat()
            }
            
        except Exception as e:
            print(f"Error extracting daily horoscope for {sign}: {e}")
            return None
    
    def extract_monthly_horoscope(self, soup: BeautifulSoup, sign: str) -> Optional[Dict]:
        """
        Extract monthly horoscope data from the page
        
        Args:
            soup: BeautifulSoup object of the page
            sign: Zodiac sign name
            
        Returns:
            Dictionary containing monthly horoscope data
        """
        try:
            # Extract month/year
            month_year = None
            headings = soup.find_all(['h1', 'h2', 'h3'])
            for h in headings:
                text = h.get_text(strip=True)
                # Look for pattern like "February 2026" or "Aries February 2026"
                month_match = re.search(r'([A-Z][a-z]+\s+\d{4})', text)
                if month_match:
                    month_year = month_match.group(1)
                    break
            
            # Collect all substantial paragraphs (monthly horoscopes are longer)
            paragraphs = soup.find_all('p')
            horoscope_sections = []
            
            for p in paragraphs:
                text = p.get_text(strip=True)
                # Monthly horoscopes have longer paragraphs
                if len(text) > 150 and not text.startswith('See also'):
                    # Filter out navigation and unrelated content
                    if not any(skip in text.lower() for skip in ['click here', 'subscribe', 'advertisement', 'copyright']):
                        horoscope_sections.append(text)
            
            # Take the first few substantial sections (usually the main horoscope content)
            horoscope_text = '\n\n'.join(horoscope_sections[:5]) if horoscope_sections else "Monthly horoscope not found"
            
            return {
                'period': month_year or datetime.now().strftime('%B %Y'),
                'summary': horoscope_text,
                'scraped_at': datetime.now().isoformat()
            }
            
        except Exception as e:
            print(f"Error extracting monthly horoscope for {sign}: {e}")
            return None
    
    def extract_yearly_horoscope(self, soup: BeautifulSoup, sign: str) -> Optional[Dict]:
        """
        Extract yearly horoscope data from the page
        
        Args:
            soup: BeautifulSoup object of the page
            sign: Zodiac sign name
            
        Returns:
            Dictionary containing yearly horoscope data
        """
        try:
            # Extract year
            year = None
            headings = soup.find_all(['h1', 'h2', 'h3'])
            for h in headings:
                text = h.get_text(strip=True)
                # Look for year pattern
                year_match = re.search(r'(\d{4})', text)
                if year_match:
                    year = year_match.group(1)
                    break
            
            # Collect all substantial paragraphs (yearly horoscopes are very long)
            paragraphs = soup.find_all('p')
            horoscope_sections = []
            
            for p in paragraphs:
                text = p.get_text(strip=True)
                # Yearly horoscopes have many long paragraphs
                if len(text) > 200:
                    # Filter out navigation and unrelated content
                    if not any(skip in text.lower() for skip in ['click here', 'subscribe', 'advertisement', 'copyright', 'see also:']):
                        horoscope_sections.append(text)
            
            # Take the main horoscope sections (usually the first 10-15 paragraphs)
            horoscope_text = '\n\n'.join(horoscope_sections[:10]) if horoscope_sections else "Yearly horoscope not found"
            
            # Look for overview section
            overview = None
            for p in paragraphs[:5]:  # Overview is usually near the top
                text = p.get_text(strip=True)
                if len(text) > 300:
                    overview = text
                    break
            
            return {
                'year': year or '2026',
                'overview': overview or horoscope_sections[0] if horoscope_sections else "Overview not found",
                'summary': horoscope_text,
                'scraped_at': datetime.now().isoformat()
            }
            
        except Exception as e:
            print(f"Error extracting yearly horoscope for {sign}: {e}")
            return None
    
    def scrape_sign(self, sign: str, horoscope_type: str = 'daily') -> Optional[Dict]:
        """
        Scrape horoscope for a specific sign and type
        
        Args:
            sign: Zodiac sign name (lowercase)
            horoscope_type: Type of horoscope ('daily', 'monthly', 'yearly')
            
        Returns:
            Dictionary containing horoscope data
        """
        # Select the appropriate URL mapping
        if horoscope_type == 'daily':
            url_map = self.DAILY_URLS
            extract_func = self.extract_daily_horoscope
        elif horoscope_type == 'monthly':
            url_map = self.MONTHLY_URLS
            extract_func = self.extract_monthly_horoscope
        elif horoscope_type == 'yearly':
            url_map = self.YEARLY_URLS
            extract_func = self.extract_yearly_horoscope
        else:
            print(f"Invalid horoscope type: {horoscope_type}")
            return None
        
        if sign not in url_map:
            print(f"Invalid sign: {sign}")
            return None
        
        url = self.BASE_URL + url_map[sign]
        print(f"  Scraping {horoscope_type} horoscope for {sign.capitalize()}...")
        
        soup = self.fetch_page(url)
        if not soup:
            return None
        
        horoscope = extract_func(soup, sign)
        
        # Be respectful - add delay between requests
        time.sleep(self.delay)
        
        return horoscope
    
    def scrape_all_combined(self) -> Dict:
        """
        Scrape all horoscope types for all signs and combine into single structure
        
        Returns:
            Dictionary with structure: {sign: {daily: {...}, monthly: {...}, yearly: {...}}}
        """
        combined = {}
        
        signs = list(self.DAILY_URLS.keys())
        
        for sign in signs:
            print(f"\n{'='*60}")
            print(f"Scraping all types for {sign.upper()}")
            print(f"{'='*60}")
            
            combined[sign] = {}
            
            # Scrape daily
            daily = self.scrape_sign(sign, 'daily')
            if daily:
                combined[sign]['daily'] = daily

            # Scrape monthly
            monthly = self.scrape_sign(sign, 'monthly')
            if monthly:
                combined[sign]['monthly'] = monthly
            
            # Scrape yearly
            yearly = self.scrape_sign(sign, 'yearly')
            if yearly:
                combined[sign]['yearly'] = yearly
            
            combined[sign]['scraped_at'] = datetime.now().isoformat()
        
        return combined
    
    def save_combined_to_json(self, combined_data: Dict, filename: str = 'horoscope.json'):
        """
        Save combined horoscope data to JSON file
        
        Args:
            combined_data: Dictionary with all horoscope types
            filename: Output filename
        """
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(combined_data, f, indent=2, ensure_ascii=False)
        print(f"\n{'='*60}")
        print(f"[OK] Saved combined horoscopes to {filename}")
        print(f"{'='*60}")


def main():
    """Main function to scrape all horoscopes and save to horoscope.json"""
    print("=" * 60)
    print("Enhanced Cafe Astrology Horoscope Scraper")
    print("Scraping Daily, Monthly, and Yearly Horoscopes")
    print("=" * 60)

    # Create scraper instance
    scraper = HoroscopeScraper(delay=1.0)

    # Scrape all types for all signs into single horoscope.json
    print("\nScraping ALL horoscope types for ALL signs...")
    print("This will take a few minutes...\n")

    combined_horoscopes = scraper.scrape_all_combined()

    if combined_horoscopes:
        # Save directly to vite public folder
        script_dir = os.path.dirname(os.path.abspath(__file__))
        project_root = os.path.dirname(script_dir)
        output_path = os.path.join(project_root, 'vite-project', 'public', 'horoscope.json')
        scraper.save_combined_to_json(combined_horoscopes, output_path)

        print(f"\n[OK] Successfully scraped horoscopes for {len(combined_horoscopes)} signs")
        print(f"[OK] Each sign includes: daily, monthly, and yearly horoscopes")
        print(f"[OK] Saved to {output_path}")
    else:
        print("\n[FAIL] Failed to scrape horoscopes")


if __name__ == "__main__":
    main()