document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    let currentUserId = null;
    try {
        const userRes = await fetch('http://localhost:3000/me');
        const userData = await userRes.json();
        currentUserId = userData.user_id;
    } catch (err) {
        console.error("로그인 정보 불러오기 실패:", err);
    }
    if(currentUserId) {
        document.querySelector('.login_header').textContent = currentUserId;
    }
    else{
        document.querySelector('.register_header').style.display = 'none';
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
    document.querySelector('.post_btn .update').addEventListener("click", () => {
        window.location.href = `./update.html?id=${id}`;
    });
    document.querySelector('.post_btn .delete').addEventListener("click", async () => {
        const confirmDelete = confirm("정말 삭제하시겠습니까?");
        if (!confirmDelete) return;
    
        const response = await fetch("http://localhost:3000/delete_post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ board_id: id })
        });
    
        const result = await response.json();
    
        if (response.ok) {
            alert("게시글이 삭제되었습니다.");
            window.location.href = "./board.html";
        } else {
            alert(`삭제 실패: ${result.message}`);
        }
    });
    
});

document.querySelector('.register_header').addEventListener("click", () => {
    window.location.href = "./board.html";
});
document.querySelector('.login_header').addEventListener("click", async () => {
    let currentUserId = null;
    try {
        const userRes = await fetch('http://localhost:3000/me');
        const userData = await userRes.json();
        currentUserId = userData.user_id;
    } catch (err) {
        console.error("로그인 정보 불러오기 실패:", err);
    }
    if(!currentUserId){
        window.location.href = "./login.html"
    }
})