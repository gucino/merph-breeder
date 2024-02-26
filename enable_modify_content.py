import subprocess
from datetime import datetime
from bs4 import BeautifulSoup, Comment


def run_bash(bash_command):
    # Run the bash command
    try:
        result = subprocess.run(bash_command, shell=True, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        print("Output:", result.stdout)
    except subprocess.CalledProcessError as e:
        print("Error:", e.stderr)


# Git pull
# run_bash("git pull") 

# enable_editable
def enable_editable(file_name):

    # Read the HTML file
    with open(file_name, 'r') as file:
        html_content = file.read()

    # Parse the HTML content using BeautifulSoup
    soup = BeautifulSoup(html_content, 'html.parser')

    # Find the <article> tag and check if contenteditable attribute already exists
    article_tag = soup.find('article')
    if article_tag and 'contenteditable' not in article_tag.attrs:
        article_tag['contenteditable'] = 'true'

    # Find the <!-- image --> comment
    image_comment = soup.find(text=lambda text: isinstance(text, Comment) and 'image' in text)
    
    # Check if new_html_content already exists in the HTML file
    new_content_already_exists = soup.find('label', {'for': 'imageName'})

    if not new_content_already_exists:
        
        # Create the new HTML content to be added after the <!-- image --> comment
        new_html_content = '''
        <label for="imageName">Image Name:</label>
        <input id="imageName" placeholder="Enter image name" type="text">
        <button onclick="addImage()">Add Image</button>
        <div id="imageContainer"><br></div>
        '''

        # Convert the new HTML content to BeautifulSoup object
        new_content_soup = BeautifulSoup(new_html_content, 'html.parser')

        # Insert the new content after the <!-- image --> comment
        if image_comment and image_comment.parent:
            image_comment.parent.insert_after(new_content_soup)

    # Create a new <button> tag and add it after the <article> element if it doesn't exist
    header_tag = soup.find('header')
    save_button_tag = soup.find('button', {'id': 'saveButton'})
    if not save_button_tag:
        save_button_tag = soup.new_tag('button', id='saveButton')
        save_button_tag.string = 'Save'
        
        if header_tag:
            header_tag.insert_before(save_button_tag)

    # Save the modified HTML content back to the file
    with open(file_name, 'w') as file:
        file.write(str(soup))

for file_name in ['index.html','index_breed.html','index_last.html']:
    print(f"enable_editable: {file_name}")
    enable_editable(file_name)
