### Load raw html content

- Open [PCPartPicker](https://pcpartpicker.com/products/)
- Select the specific product 
- On each page
    - F12 / right-click and inspect
    - Copy entire html element
    - Save to ```./product_type/Pages/p<x>.html```
    - See example in ```./cpu```

### Extract URL

```cd``` to ```\src\crawler\PCPartPicker```

Run the command in terminal:

```
python -c "from util import extract_product_link; extract_product_link(product=<product type>)"
```