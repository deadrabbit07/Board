-- 데이터베이스 생성
CREATE DATABASE IF NOT EXISTS board;

-- 유저 생성 및 모든 권한 부여
CREATE USER IF NOT EXISTS 'admin'@'%' IDENTIFIED BY '12345project';
GRANT ALL PRIVILEGES ON board.* TO 'admin'@'%';

-- 권한 변경 사항 즉시 반영
FLUSH PRIVILEGES;

-- 테이블 생성
USE board;

-- 사용자 테이블
CREATE TABLE IF NOT EXISTS user (
  id VARCHAR(20) PRIMARY KEY, 
  password VARCHAR(255) NOT NULL
);

-- 게시판 테이블
CREATE TABLE board (
  title VARCHAR(20),
  content VARCHAR(1000),
  date DATE,
  maker VARCHAR(20)
);


SELECT NOW();
