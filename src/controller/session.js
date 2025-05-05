const db = require("../config/db")
const crypto = require('crypto');

const hash = (value) => {
    return crypto.createHash('sha256').update(value).digest('hex');
}

exports.login = (req, res) => {
    if (req.session.user) return res.status(201)
    db.query("select * from user where id = ? and password = ?;", [req.body.user_id, req.body.user_pw], (err, result) => {
        if (err) return res.status(500).json("서버 오류")
        if (result && result.length > 0) {
            req.session.user = req.body.user_id;
            return res.status(200).json({ message: "로그인 성공" })
        }
        else return res.status(400).json({ message: "로그인 실패, 아이디 또는 비밀번호를 확인해주세요 !" })
    })
}

exports.logout = (req, res) => {
    if (req.session.user){
        req.session.destroy()
        return res.status(200).json()
    }
    else return res.status(201).json()
}