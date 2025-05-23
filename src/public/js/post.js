document.querySelector("#btn2").addEventListener("click", () => {
    const title = document.querySelector(".title").value
    const content = document.querySelector(".content").value

    // console.log(title)
    // console.log(content)

    fetch(`http://localhost:3000/post_make`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            post_title: title,
            post_content: content
        })
    }).then(response => {
        if (response.status === 200){
            alert("글작성 성공")
            window.location.href = 'board.html'   
        } 
        else if (response.status === 500) alert("서버 오류")
    })
})
document.addEventListener("DOMContentLoaded", async () => {
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