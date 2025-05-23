document.addEventListener("DOMContentLoaded", async () => {
    let currentUserId = null;
    try {
        const userRes = await fetch('http://localhost:3000/me');
        const userData = await userRes.json();
        currentUserId = userData.user_id;
    } catch (err) {
        console.error("로그인 정보 불러오기 실패:", err);
    }

    fetch(`http://localhost:3000/board`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(async (res) => {
        const result = await res.json();

    if(currentUserId) {
        document.querySelector('.login_header').textContent = currentUserId;
    }
    else{
        document.querySelector('.register_header').style.display = 'none';
    }
        
    result.forEach((post, index) => {
    const post_num = document.createElement('td');
    post_num.classList.add('post_num');
    post_num.textContent = (index + 1).toString();

    const post_title = document.createElement('td');
    post_title.classList.add('post_title');

    const link = document.createElement('a');
    link.href = `/check_my_post.html?id=${post.id}`;
    link.textContent = post.title;
    post_title.appendChild(link);

    const maker = document.createElement('td');
    maker.classList.add('maker');
    maker.textContent = post.maker;

    const post_date = document.createElement('td');
    post_date.classList.add('post_date');
    post_date.textContent = post.date;

    const post_views = document.createElement('td');
    post_views.classList.add('post_views');
    post_views.textContent = post.views; 
    
    const tr = document.createElement('tr');
    tr.classList.add('post');
    tr.appendChild(post_num);
    tr.appendChild(post_title);
    tr.appendChild(maker);
    tr.appendChild(post_date);
    tr.appendChild(post_views);

    document.querySelector('.posts').appendChild(tr);
});


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