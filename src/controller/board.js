const db = require("../config/db")

exports.board = (req, res) => {
        db.query("INSERT INTO board (title, content) VALUES (?, ?);", [req.body.post_title, req.body.post_content], (err, result) => {
        if (err) return res.status(500).json("서버 오류")
        if (result && result.length > 0) {
            return res.status(200).json({ message: "글 작성 성공" })
        }
        else return res.status(400).json({ message: "글 작성 실패" })
    })
}
