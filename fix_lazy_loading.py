import re

# Read the HTML file
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Placeholder 1x1 transparent GIF
placeholder = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

# Pattern to find hidden-project images with src
# Matches: <img src="g/X.jpg" OR src="img/X.jpg" inside hidden-project divs
pattern = r'(<div class="project-card hidden-project">.*?<img) src="((?:g|img)/\d+\.jpg)"'

# Replace with data-src and placeholder
def replace_func(match):
    prefix = match.group(1)
    image_path = match.group(2)
    return f'{prefix} data-src="{image_path}" src="{placeholder}"'

# Replace all occurrences
content_new = re.sub(pattern, replace_func, content, flags=re.DOTALL)

# Count replacements
count = len(re.findall(pattern, content, flags=re.DOTALL))

# Write back
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content_new)

print(f"✅ Fixed {count} hidden project images to lazy load")
print("Images will now only load when 'View All' is clicked!")
