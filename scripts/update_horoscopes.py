#!/usr/bin/env python3
"""
Scrapes daily, monthly, and yearly horoscopes and converts to frontend JSON format.
Run this script to update vite-project/public/horoscope.json with fresh data.
"""

import json
import os
import sys

# Add parent directory so we can import the scraper
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from server.horoscope import HoroscopeScraper


def main():
    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    output_path = os.path.join(project_root, 'vite-project', 'public', 'horoscope.json')

    print("=" * 60)
    print("Scraping Daily, Monthly, and Yearly Horoscopes")
    print("=" * 60)

    # Create scraper instance
    scraper = HoroscopeScraper(delay=1.0)

    # Scrape all types for all signs
    combined_horoscopes = {}
    signs = list(scraper.DAILY_URLS.keys())

    for sign in signs:
        print(f"\n{'='*60}")
        print(f"Scraping all types for {sign.upper()}")
        print(f"{'='*60}")

        combined_horoscopes[sign] = {}

        # Scrape daily
        print(f"  Scraping daily horoscope for {sign.capitalize()}...")
        daily = scraper.scrape_sign(sign, 'daily')
        if daily:
            combined_horoscopes[sign]['daily'] = {
                'date': daily.get('date', ''),
                'summary': daily.get('summary', ''),
                'ratings': daily.get('ratings', {}),
                'scraped_at': daily.get('scraped_at', '')
            }

        # Scrape monthly
        print(f"  Scraping monthly horoscope for {sign.capitalize()}...")
        monthly = scraper.scrape_sign(sign, 'monthly')
        if monthly:
            combined_horoscopes[sign]['monthly'] = {
                'period': monthly.get('period', ''),
                'summary': monthly.get('summary', ''),
                'scraped_at': monthly.get('scraped_at', '')
            }

        # Scrape yearly
        print(f"  Scraping yearly horoscope for {sign.capitalize()}...")
        yearly = scraper.scrape_sign(sign, 'yearly')
        if yearly:
            combined_horoscopes[sign]['yearly'] = {
                'year': yearly.get('year', ''),
                'overview': yearly.get('overview', ''),
                'summary': yearly.get('summary', ''),
                'scraped_at': yearly.get('scraped_at', '')
            }

    # Save to JSON
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(combined_horoscopes, f, indent=2, ensure_ascii=False)

    print(f"\n{'='*60}")
    print(f"Successfully scraped horoscopes for {len(combined_horoscopes)} signs")
    print(f"Each sign includes: daily, monthly, and yearly horoscopes")
    print(f"Saved to {output_path}")
    print(f"{'='*60}")
    print("\nDone! Horoscopes updated.")


if __name__ == "__main__":
    main()
