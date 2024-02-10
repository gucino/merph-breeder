import subprocess
from datetime import datetime


def run_bash(bash_command):
    # Run the bash command
    try:
        result = subprocess.run(bash_command, shell=True, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        print("Output:", result.stdout)
    except subprocess.CalledProcessError as e:
        print("Error:", e.stderr)

# Git pull
run_bash("git pull")     
        
# Run modify collection
run_bash("python get_image.py")

# Open html
try:
    subprocess.run(["open", "index_collection.html"], check=True)
except subprocess.CalledProcessError as e:
    print("Error opening HTML file:", e)

# Git push
user_input = input('confirm change [y/n]?')
while user_input not in ['y','n','Y','N']:
    user_input = input('confirm change [y/n]? ')
if user_input == 'y':

    # Add only in collection folder
    run_bash("git add collection/*")    

    # HTML collection
    run_bash("git add index_collection.html")    

    # Commit
    run_bash(f"git commit -m'change from back office {datetime.now()}'")   
    
    # Push
    run_bash("git push")  

    # Git push
    print(f"change update")
else:
    print('no change commit')