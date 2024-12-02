import os

# 현재 디렉토리 경로 가져오기
current_directory = os.getcwd()

# 모든 하위 디렉토리 포함하기 위한 파일 목록 생성
files = []
for root, dirs, filenames in os.walk(current_directory):
    for filename in filenames:
        if filename.endswith(('.html', '.js', '.css')):
            files.append(os.path.join(root, filename))

# 결과를 저장할 파일명
output_file = 'd2ng_current_source.md'

# 파일 내용을 합치기
with open(output_file, 'w', encoding='utf-8') as outfile:
    for filename in files:
        with open(filename, 'r', encoding='utf-8') as infile:
            outfile.write(f"// Contents of {filename}\n")
            outfile.write(infile.read())
            outfile.write("\n\n")

print(f"모든 파일의 내용이 {output_file}에 저장되었습니다.")
