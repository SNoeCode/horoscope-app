#!/usr/bin/env python3
"""
Scrapes daily, monthly, and yearly horoscopes and updates ALL JSON files:
  - vite-project/public/horoscope.json  (frontend combined format)
  - server/horoscopes.json              (daily list format)
  - server/daily_horoscopes.json        (daily list format with type field)
  - server/monthly_horoscopes.json      (monthly list format)
  - server/yearly_horoscopes.json       (yearly list format)
"""

import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from server.horoscope import HoroscopeScraper


def save_json(path, data):
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"  [OK] Saved {path}")


def main():
    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    server_dir = os.path.join(project_root, 'server')
    public_dir = os.path.join(project_root, 'vite-project', 'public')

    print("=" * 60)
    print("Scraping Daily, Monthly, and Yearly Horoscopes")
    print("=" * 60)

    scraper = HoroscopeScraper(delay=1.0)
    signs = list(scraper.DAILY_URLS.keys())

    # Collect all scraped data
    combined = {}       # for public/horoscope.json
    daily_list = []     # for server/daily_horoscopes.json + horoscopes.json
    monthly_list = []   # for server/monthly_horoscopes.json
    yearly_list = []    # for server/yearly_horoscopes.json

    for sign in signs:
        print(f"\nScraping {sign.upper()}...")
        combined[sign] = {}

        # --- Daily ---
        daily = scraper.scrape_sign(sign, 'daily')
        if daily:
            combined[sign]['daily'] = {
                'date': daily.get('date', ''),
                'summary': daily.get('summary', ''),
                'ratings': daily.get('ratings', {}),
                'scraped_at': daily.get('scraped_at', '')
            }
            daily_list.append({
                'sign': sign.capitalize(),
                'type': 'daily',
                'date': daily.get('date', ''),
                'horoscope': daily.get('summary', ''),
                'ratings': daily.get('ratings', {}),
                'scraped_at': daily.get('scraped_at', '')
            })

        # --- Monthly ---
        monthly = scraper.scrape_sign(sign, 'monthly')
        if monthly:
            combined[sign]['monthly'] = {
                'period': monthly.get('period', ''),
                'summary': monthly.get('summary', ''),
                'scraped_at': monthly.get('scraped_at', '')
            }
            monthly_list.append({
                'sign': sign.capitalize(),
                'type': 'monthly',
                'period': monthly.get('period', ''),
                'horoscope': monthly.get('summary', ''),
                'scraped_at': monthly.get('scraped_at', '')
            })

        # --- Yearly ---
        yearly = scraper.scrape_sign(sign, 'yearly')
        if yearly:
            combined[sign]['yearly'] = {
                'year': yearly.get('year', ''),
                'overview': yearly.get('overview', ''),
                'summary': yearly.get('summary', ''),
                'scraped_at': yearly.get('scraped_at', '')
            }
            yearly_list.append({
                'sign': sign.capitalize(),
                'type': 'yearly',
                'year': yearly.get('year', ''),
                'overview': yearly.get('overview', ''),
                'horoscope': yearly.get('summary', ''),
                'scraped_at': yearly.get('scraped_at', '')
            })

    print(f"\n{'='*60}")
    print("Saving all JSON files...")

    # Frontend combined JSON
    save_json(os.path.join(public_dir, 'horoscope.json'), combined)

    # Server list JSONs
    save_json(os.path.join(server_dir, 'daily_horoscopes.json'), daily_list)
    save_json(os.path.join(server_dir, 'monthly_horoscopes.json'), monthly_list)
    save_json(os.path.join(server_dir, 'yearly_horoscopes.json'), yearly_list)

    # horoscopes.json = daily list without the 'type' field (legacy format)
    horoscopes_legacy = [
        {k: v for k, v in item.items() if k != 'type'}
        for item in daily_list
    ]
    save_json(os.path.join(server_dir, 'horoscopes.json'), horoscopes_legacy)

    print(f"\nDone! Updated {len(combined)} signs across 5 JSON files.")


if __name__ == "__main__":
    main()
