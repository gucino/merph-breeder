
from bs4 import BeautifulSoup
import subprocess
from datetime import datetime

def run_bash(bash_command):
    # Run the bash command
    try:
        result = subprocess.run(bash_command, shell=True, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        print("Output:", result.stdout)
    except subprocess.CalledProcessError as e:
        print("Error:", e.stderr)

def disable_editable_content(file_name):
    # Read the HTML file
    with open(file_name, 'r') as file:
        html_content = file.read()

    # Parse the HTML content using BeautifulSoup
    soup = BeautifulSoup(html_content, 'html.parser')

    # Find the <article> tag with contenteditable="true" and remove the attribute
    article_tag = soup.find('article', {'contenteditable': 'true'})
    if article_tag:
        del article_tag['contenteditable']

    # Find and remove the <button> tag with id="saveButton"
    save_button_tag = soup.find('button', {'id': 'saveButton'})
    if save_button_tag:
        save_button_tag.decompose()

    # Find and remove the <button> tag with onclick="addImage()"
    add_image_button_tag = soup.find('button', {'onclick': 'addImage()'})
    if add_image_button_tag:
        add_image_button_tag.decompose()

    # Find and remove the <button> tag with onclick="addImage()"
    add_image_button_tag = soup.find('input', {'id': 'imageName'})
    if add_image_button_tag:
        add_image_button_tag.decompose()

    # Find and remove the <button> tag with onclick="addImage()"
    add_image_button_tag = soup.find('label', {'for': 'imageName'})
    if add_image_button_tag:
        add_image_button_tag.decompose()
    # Find and remove the <button> tag with onclick="addImage()"
    add_image_button_tag = soup.find('div', {'id': 'imageContainer'})
    if add_image_button_tag:
        add_image_button_tag.decompose()
    # Find and remove the <button> tag with onclick="addImage()"
    add_image_button_tag = soup.find('div', {'id': 'imageContainer2'})
    if add_image_button_tag:
        add_image_button_tag.decompose()
    # Save the modified HTML content back to the file
    with open(file_name, 'w') as file:
        file.write(str(soup))

for file_name in ['index.html','index_breed.html','index_last.html']:
    print(f"disenable_editable: {file_name}")
    disable_editable_content(file_name)

    run_bash(f"git add {file_name}") 

# Commit
run_bash(f"git commit -m'modify content {datetime.now()}'")   

# Push
run_bash("git push")  
print(f"change update")