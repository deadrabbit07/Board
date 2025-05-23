document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const boardId = urlParams.get("id");

  // 로그인한 사용자 정보
  try {
      const userRes = await fetch("http://localhost:3000/me");
      const userData = await userRes.json();
      currentUserId = userData.user_id;
  } catch (err) {
      alert("로그인 정보 불러오기 실패");
      return;
  }
  if(currentUserId) {
    document.querySelector('.login_header').textContent = currentUserId;
}
else{
    document.querySelector('.register_header').style.display = 'none';
}
 
  // 게시글 정보 가져오기
  const postRes = await fetch("http://localhost:3000/check_my_post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ board_id: boardId }),
  });

  const data = await postRes.json();
  const post = data[0];


  // 글 정보 세팅
  document.querySelector(".title").value = post.title;
  document.querySelector(".content").value = post.content;
  document.querySelector(".maker").textContent = post.maker;
  document.querySelector(".date").textContent = post.date;

  

  // 수정 완료 버튼
  const submitBtn = document.querySelectorAll(".post_btn .btn")[1];
  submitBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      const title = document.querySelector(".title").value;
      const content = document.querySelector(".content").value;

      const updateRes = await fetch("http://localhost:3000/update_post", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
              board_id: boardId,
              title,
              content
          }),
      });

      if (updateRes.status === 200) {
          alert("수정 완료!");
          window.location.href = `/check_my_post.html?id=${boardId}`;
      } else {
          const msg = await updateRes.json();
          alert("수정 실패: " + msg.message);
      }

  });
});
