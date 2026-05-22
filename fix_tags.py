
import re

with open(r'z:\Cousin kaIAN\akasis-gallery\src\App.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
for i, line in enumerate(lines):
    # If a line starts with initial={{ and the previous line doesn't end with a tag or start one
    if re.match(r'^\s+initial={{', line):
        prev_line = lines[i-1].strip() if i > 0 else ""
        # If the previous line looks like it's NOT starting a tag
        # e.g. it's a comment or a closing tag or a property list start
        if prev_line.endswith('>') or prev_line.endswith(')') or prev_line.endswith('{') or prev_line == "" or prev_line.startswith('{/*'):
             indent = re.match(r'^(\s+)', line).group(1)
             new_lines.append(f"{indent}<motion.div\n")
    new_lines.append(line)

with open(r'z:\Cousin kaIAN\akasis-gallery\src\App.tsx', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
