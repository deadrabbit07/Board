document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    // console.log(id);
    let currentUserId = null;
    try {
        const userRes = await fetch('http://localhost:3000/me');
        const userData = await userRes.json();
        currentUserId = userData.user_id;
    } catch (err) {
        console.error("로그인 정보 불러오기 실패:", err);
    }

    fetch(`http://localhost:3000/check_my_post`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            board_id: id
        })

    }).then(async (res) => {
        const r = await res.json();
        const result = r[0];
        //console.log(result); -> id, title, content, date, date

        document.querySelector('.content').textContent = result.content;
        document.querySelector('.title').textContent = result.title;
        document.querySelector('.maker').textContent = result.maker;
        document.querySelector('.date').textContent = result.date;
        
        if (result.maker === currentUserId) {
            document.querySelector('.post_btn .update').style.display = 'inline-block';
            document.querySelector('.post_btn .delete').style.display = 'inline-block';
        }
        
    });
});