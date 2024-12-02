import os

def find_files(dir_path):
    file_paths = []
    for root, dirs, files in os.walk(dir_path):
        for file in files:
            if file.endswith(('.html', '.css', '.js')):
                file_paths.append(os.path.join(root, file))
    return file_paths

def convert_files_to_markdown(file_paths):
    markdown_content = '# Table of Contents\n\n'
    for file_path in file_paths:
        file_name = os.path.basename(file_path)
        markdown_content += f'- [{file_name}](#{file_name})\n'
    markdown_content += '\n'
    
    for file_path in file_paths:
        file_name = os.path.basename(file_path)
        markdown_content += f'\n\n# {file_name}\n\n'
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
            markdown_content += '```\n' + content + '\n```\n'
    return markdown_content

# 검색할 디렉토리 경로 설정 (현재 디렉토리로 설정)
path_to_search = '.'

# 파일 찾기
found_files = find_files(path_to_search)

# 마크다운으로 변환
markdown_output = convert_files_to_markdown(found_files)

# 결과를 파일로 저장
with open('output.md', 'w', encoding='utf-8') as f:
    f.write(markdown_output)
