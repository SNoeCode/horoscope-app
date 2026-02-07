#!/usr/bin/env python3
"""
Scrapes daily horoscopes and converts CSV data to frontend JSON format.
Run this script to update vite-project/public/horoscope.json with fresh data.
"""

import csv
import json
import os
import sys

# Add parent directory so we can import the scraper
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'server'))

from horoscope import HoroscopeScraper


def csv_to_frontend_json(csv_path: str, output_path: str):
    """
    Convert horoscopes.csv to the JSON format the frontend Horoscope component expects.

    Expected frontend format:
    {
      "aries": {
        "daily": {
          "date": "February 07, 2026",
          "summary": "horoscope text...",
          "ratings": { "creativity": "Good", "love": "Good", "business": "Fair" }
        }
      },
      ...
    }
    """
    horoscopes = {}

    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            sign = row['sign'].strip().lower()
            horoscopes[sign] = {
                "daily": {
                    "date": row.get('date', '').strip(),
                    "summary": row.get('horoscope', '').strip(),
                    "ratings": {
                        "creativity": row.get('creativity', '').strip(),
                        "love": row.get('love', '').strip(),
                        "business": row.get('business', '').strip()
                    }
                }
            }

    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(horoscopes, f, indent=2, ensure_ascii=False)

    print(f"Converted {len(horoscopes)} signs to {output_path}")


def main():
    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    server_dir = os.path.join(project_root, 'server')
    csv_path = os.path.join(server_dir, 'horoscopes.csv')
    output_path = os.path.join(project_root, 'vite-project', 'public', 'horoscope.json')

    # Step 1: Run the scraper to get fresh data
    print("=" * 50)
    print("Step 1: Scraping fresh horoscope data...")
    print("=" * 50)

    scraper = HoroscopeScraper(delay=1.0)
    horoscopes = scraper.scrape_all()

    if not horoscopes:
        print("ERROR: No horoscopes scraped. Aborting.")
        sys.exit(1)

    scraper.save_to_csv(horoscopes, csv_path)
    print(f"Saved CSV to {csv_path}")

    # Step 2: Convert CSV to frontend JSON
    print("\n" + "=" * 50)
    print("Step 2: Converting CSV to frontend JSON...")
    print("=" * 50)

    csv_to_frontend_json(csv_path, output_path)
    print(f"Frontend JSON updated at {output_path}")
    print(f"\nDone! {len(horoscopes)} horoscopes updated.")


if __name__ == "__main__":
    main()
