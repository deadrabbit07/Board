const db = require("../config/db");

exports.post = (req, res) => {
    const user_id = req.session.user; 
    const post_title = req.body.post_title; 
    const post_content = req.body.post_content;

    console.log(`user_id: ${user_id}, post_title: ${post_title}`); //로그인한 id랑 쓴 글의 title 서버에서 출력

    const currentDate = new Date().toISOString().slice(0, 10); // 현재 날짜를 'YYYY-MM-DD' 형식으로 가져오기

    db.query("INSERT INTO board (title, content, date, maker) VALUES (?, ?, ?, ?);", [post_title, post_content, currentDate, user_id], (err, result) => {
        if (err) {
            return res.status(500).json("서버 오류");
        } else {
            return res.status(200).json({ message: "글작성 성공" });
        }
    });
};

exports.board = (req, res) =>{  
    db.query("SELECT * from board;", (err, result) => {
        if (err){
            return res.status(500).json();
        }else{
            return res.status(200).json(result);
        }
    })
}