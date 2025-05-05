const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: '12345project',
    database: 'board',
});

db.connect((err) => {
    if (err) {
        console.error('❌ 연결 실패:', err.message);
    } else {
        console.log('✅ 연결 성공!');
    }
});

module.exports = db;