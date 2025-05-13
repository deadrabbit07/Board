const db = require("../config/db")

exports.post = (req, res) => {
    const user_id = req.session.user; 
    const post_title = req.body.post_title; 
    const post_content = req.body.post_content;

    console.log(`user_id: ${user_id}, post_title: ${post_title}`); //로그인한 id랑 쓴 글의 title 서버에서 출력

     db.query("INSERT INTO board (title, content, maker) VALUES (?, ?, ?);", [post_title, post_content, user_id], (err, result) => {
        if (err) {
            return res.status(500).json("서버 오류");
        } else {
            return res.status(200).json({ message: "글작성 성공" });
        }
    });
};  