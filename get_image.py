import os
import pandas as pd
import numpy as np

# Determine path test
folder_path = "collection"
html_file_path = "index_collection.html"
mapping_df = pd.read_csv('collection/info.csv')
 
# Get a list of all jpg files in the collection folder
image_files = [f for f in os.listdir(folder_path) if f.lower().endswith(".jpg")]

# Generate HTML code
new_html_code = ""
for i in range(len(mapping_df)):
    
    # Get info
    image_file = f"image/{mapping_df.Path.values[i]}"
    title = mapping_df.Title.values[i]
    code = mapping_df.Code.values[i]
    sex = mapping_df.Sex.values[i]
    hatch = mapping_df.Hatched.values[i]
    remark = mapping_df.Remark.values[i]
    
    if np.isnan(remark):
        remark = ''
    price = mapping_df.Price.values[i]
        
    # HTML code
    # new_html_code += '<div class="animated-paragraph">\n'
    new_html_code += '<div class="product-item">\n'
    new_html_code += f'<img src="{folder_path}/{image_file}" class="product-image" >\n'
    new_html_code += f'<h3 class="product-title">{title}</h3>\n'
    # new_html_code += f'<p class="product-description">{description}</p>\n'
    new_html_code += f"""
                        <ul>
                            <li>code: {code}</li>
                            <li>sex: {sex}</li>
                            <li>hatch: {hatch}</li>
                            <li>remark: {remark}</li>
                            <li>price: {price} Baht</li>
                        </ul>
                        """
    new_html_code += '</div>\n'
    # new_html_code += '</div>\n'
    
# Read existing HTML content
with open(html_file_path, "r") as html_file:
    existing_html_content = html_file.read()

# Find the positions of <!-- START_SECTION --> and <!-- END_SECTION -->
start_section = existing_html_content.find('<!-- START_SECTION -->')
end_section = existing_html_content.find('<!-- END_SECTION -->')

# Delete everything between <!-- START_SECTION --> and <!-- END_SECTION -->
if start_section != -1 and end_section != -1:
    modified_html_content = (
        existing_html_content[:start_section + len('<!-- START_SECTION -->')]
        + new_html_code
        + existing_html_content[end_section:]
    )
else:
    # If either <!-- START_SECTION --> or <!-- END_SECTION --> is not found, do nothing
    modified_html_content = existing_html_content

# Write the modified HTML content back to the file
with open(html_file_path, "w") as html_file:
    html_file.write(modified_html_content)

print(f"HTML file '{html_file_path}' modified successfully.")
