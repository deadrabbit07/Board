const db = require("../config/db");

exports.post = (req, res) => {
    const user_id = req.session.user; 
    const post_title = req.body.post_title; 
    const post_content = req.body.post_content;

    db.query(
        "INSERT INTO board (title, content, date, maker) VALUES (?, ?, CURDATE(), ?);",
        [post_title, post_content, user_id],
        (err, result) => {
            if (err) {
                return res.status(500).json("서버 오류");
            } else {
                return res.status(200).json({ message: "글작성 성공" });
            }
        }
    );
};

exports.board = (req, res) => {
    db.query(
        "SELECT title, content, DATE_FORMAT(date, '%Y-%m-%d') AS date, maker FROM board;",
        (err, result) => {
            if (err) {
                return res.status(500).json("서버 오류");
            } else {
                return res.status(200).json(result);
            }
        }
    );
};
