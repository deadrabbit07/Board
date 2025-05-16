const db = require("../config/db");

const { v4: uuidv4 } = require('uuid');

exports.post = (req, res) => {
    const user_id = req.session.user;
    const post_title = req.body.post_title;
    const post_content = req.body.post_content;

    const post_id = uuidv4();  // UUID 생성

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
        "SELECT id, title, content, DATE_FORMAT(date, '%Y-%m-%d') AS date, maker FROM board;",
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
    db.query(
        "SELECT id, title, content, DATE_FORMAT(date, '%Y-%m-%d') AS date, maker FROM board where id = ?;",
        req.body.board_id,
        (err, result) => {
            if (err) {
                return res.status(500).json("서버 오류");
            } else {
                return res.status(200).json(result);
            }
        }
    );
};
