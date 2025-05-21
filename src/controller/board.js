const db = require("../config/db");

const { v4: uuidv4 } = require('uuid');

exports.post = (req, res) => {
    const user_id = req.session.user;
    const post_title = req.body.post_title;
    const post_content = req.body.post_content;

    const post_id = uuidv4();  // UUID 생성 36가지의 문자열로 되어있는 랜던값을 지정

    db.query(
        "INSERT INTO board (id, title, content, date, maker) VALUES (?, ?, ?, CURDATE(), ?);",
        [post_id, post_title, post_content, user_id],
        (err, result) => {
            if (err) {
                return res.status(500).json("서버 오류");
            } else {
                return res.status(200).json({ message: "글작성 성공", id: post_id }); 
            }
        }
    );
};


exports.board = (req, res) => {
    db.query(
        "SELECT id, title, content, DATE_FORMAT(date, '%Y-%m-%d') AS date, maker, views FROM board;",
        (err, result) => {
            if (err) {
                return res.status(500).json("서버 오류");
            } else {
                return res.status(200).json(result);
            }
        }
    );
};


exports.check_my_post = (req, res) => {
    const boardId = req.body.board_id;

    // 1. 조회수 증가
    db.query(
        "UPDATE board SET views = views + 1 WHERE id = ?",
        [boardId],
        (err1) => {
            if (err1) {
                console.error("조회수 증가 실패:", err1);
                return res.status(500).json("서버 오류");
            }

            // 2. 게시글 정보 조회
            db.query(
                "SELECT id, title, content, DATE_FORMAT(date, '%Y-%m-%d') AS date, maker, views FROM board WHERE id = ?;",
                [boardId],
                (err2, result) => {
                    if (err2) {
                        console.error("DB 오류:", err2); 
                        return res.status(500).json("서버 오류");
                    } else {
                        return res.status(200).json(result);
                    }
                }
            );
        }
    );
};



exports.update_post = (req, res) => {
    const { board_id, title, content } = req.body;
    const userId = req.session.user;

    if (!userId) return res.status(401).json({ message: "로그인 필요" });

    db.query("SELECT maker FROM board WHERE id = ?", [board_id], (err, rows) => {
        if (err || rows.length === 0) return res.status(400).json({ message: "게시글이 없습니다" });
        if (rows[0].maker !== userId) return res.status(403).json({ message: "수정 권한 없음" });

        db.query("UPDATE board SET title = ?, content = ? WHERE id = ?", [title, content, board_id], (err2) => {
            if (err2) return res.status(500).json({ message: "DB 오류" });
            res.status(200).json({ message: "수정 완료" });
        });
    });
};
exports.delete_post = (req, res) => {
    const board_id = req.body.board_id;
    
        // 삭제 실행
        db.query("DELETE FROM board WHERE id = ?", [board_id], (err) => {
            if (err) return res.status(500).json({ message: "삭제 실패" });
            return res.status(200).json({ message: "삭제 완료" });
        });
    };

