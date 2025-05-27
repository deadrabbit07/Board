# 게시판 프로젝트

NodeJS, MySQL, Docker, AWS를 활용한 게시판 프로젝트입니다.


## 📌 프로젝트 개요

### 🔹 개요
- NodeJS와 MySQL을 사용한 게시판 구현
- Docker를 이용한 컨테이너화 및 AWS 배포

### 🔹 배경
- 팀원들의 포트폴리오를 보완하고 실력을 향상시키기 위해 진행


## ⚙️ 프로젝트 초기 구성

### 🔸 DB 세팅
1. 데이터베이스 생성 및 권한 부여
2. 테이블 생성

### 🔸 Docker 구성
- **MySQL 컨테이너**
  - `init.sql`을 사용하여 초기 세팅
  - 15초 대기 후 Node 작동
  - `app-network`에 연결

- **Node 컨테이너**
  - 3000 포트로 서버 오픈
  - `app-network`에 연결

- **Network**
  - 두 컨테이너를 상호 연결

### 🔸 라우터 구성
- `express`, `session`, `list` 모듈 참조
- GET/POST 요청에 따른 응답 처리
- `exports`로 server에 적용


## 🔐 로그인 / 회원가입 기능

### 🔹 주요 파일
- `public/board.html`, `login.html`, `register.html`
- 관련된 CSS 및 JS 파일들 포함

### 🔹 작동 방식
- 로그인 페이지로 이동, 아이디/비밀번호 입력 및 서버 전송
- 회원가입 시 JSON 형태로 POST 요청

### 🔹 서버 구성
- `route/route.js`  
  - `/register`, `/login`, `/logout` 라우팅
- `controller/session.js`  
  - ID 중복 확인 → 저장 → 세션 생성
  - 로그인 정보 확인
  - 로그아웃 세션 삭제


## ✍ 글 작성 / 목록 기능

### 🔹 주요 파일
- `board.html`, `post.html`, 관련 JS/CSS

### 🔹 작동 방식
- 글 작성 버튼 클릭 → 글 입력 후 POST 요청
- UUID로 게시글 ID 생성
- DB에 제목, 내용, 작성자 등 저장

### 🔹 서버 구성
- `route/route.js`에서 `/post_make` 요청 처리
- `controller/board.js`에서 게시글 저장 처리


## 📖 게시글 확인 기능

### 🔹 작동 방식
- 게시글 제목 클릭 → `/check_my_post.html?id=xxx`로 이동
- 게시글 정보 및 작성자, 날짜 조회

### 🔹 서버 구성
- 조회수 증가
- 해당 게시글의 상세 정보 반환


## ✏ 글 수정 / 삭제 기능

### 🔹 작동 방식
- 로그인 사용자와 작성자가 일치할 경우 수정/삭제 버튼 표시
- 수정: `update.html` 페이지에서 수정 후 서버에 전송
- 삭제: 확인 후 삭제 요청

### 🔹 서버 구성
- `controller/board.js`에서 수정/삭제 처리
- 작성자 확인 로직 포함
- `route/route.js`에서 관련 라우팅 처리


## 🔓 로그아웃 기능

### 🔹 작동 방식
- 세션 삭제로 로그아웃 처리
- 세션이 없어도 정상 응답 처리

### 🔹 서버 구성
- `/logout` 요청 처리 시 `session.logout` 실행


