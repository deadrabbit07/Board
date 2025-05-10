const db = require("../config/db")

exports.post = (req, res) => {
    db.query("INSERT INTO board (title, content) VALUES (?, ?);", [req.body.post_title, req.body.post_content], (err, result) => {
        if (err) {
            return res.status(500).json("서버 오류")
        }else{
            return res.status(200).json({ message: "글작성 성공" })
        }
    })
}


