from pathlib import Path
from bs4 import BeautifulSoup

def extract_product_link(product: str, target_path: str = None, target_name: str = None) -> int:
    
    def print_usage():
        print(f"\nUnknown type <{product}> to extract. Only the following types are allowed: <motherboard>, <cpu>, <cpu-cooler>, <gpu>, <storage>, <memory>, <power-supply>\n")
    
    # Extract url to each product detail from product list page 
    product = product.lower()
    path = f"../../../database/{product}"
    
    try:
        pages_directory = Path(f"{path}/Pages")
        page_htmls = list(pages_directory.glob("*.html"))
        
        # extract all URLs
        product_links = set()
        for page_html in page_htmls:
            with open(page_html, 'r', encoding='utf-8') as f:
                page_content = f.read()
            soup = BeautifulSoup(page_content, 'html.parser')
            # all desired URL are in format: "<a href="/product/....">"
            hrefs = soup.find_all('a', href = True)
            
            for href in hrefs:
                if href['href'].startswith('/product/'):
                    product_links.add(href['href'])
        
        # save extracted URLs
        if target_path is None:
            target_path = path
        if target_name is None:
            target_name = f"{product}_detail_url.txt"
        with open(f"{target_path}/{target_name}", 'w', encoding='utf-8') as f:
            for link in product_links:
                f.write(f"{link}\n")
        print(f"{len(product_links)} URLs are saved to {target_name}")
        return len(product_links)
    except:
        print_usage()
        return -1