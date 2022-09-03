import json
import os

text_content = []

def read_md_content(code_cat, code, file_path):
	global text_content

	print(f'Processing request {code} in category {code_cat} ')

	with open(file_path,'r', encoding='UTF-8') as file:
		counter = 0
		name = ''
		desc = ''
		content = ''

		for line in file.readlines():
			if counter == 0:
				name = line.strip()[4:]
			elif counter == 2:
				desc = line.strip()[5:]
			elif counter > 2:
				content += line
			
			counter += 1

		text_content.append({
			"name": name,
			"desc": desc,
			"content": content
		})


current_directory = os.path.join('.','content')

for root, dirs, files in os.walk(current_directory):
	for content_dir in dirs:
		for root, dirs, files in os.walk(os.path.join(current_directory, content_dir)):
			for file in files:
				file_path = os.path.join(current_directory, content_dir, file)

				read_md_content(content_dir, str(file).split('.')[0], file_path)

	break


output = open('json_data.js', 'w', encoding='UTF-8')
output.write(f"var json_data = {json.dumps(text_content)}")
output.close()