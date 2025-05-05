# 1. Node 이미지를 기반으로 사용 (버전은 필요에 따라 변경 가능)
FROM node:18

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. package.json과 package-lock.json 복사
COPY package*.json ./

# 4. 의존성 설치
RUN npm install

# 5. 프로젝트 전체 복사
COPY . .

# 6. 환경 변수 포트 노출
EXPOSE 3000
EXPOSE 3306

# 7. 서버 실행 명령어
CMD ["npm","run","dev"]
