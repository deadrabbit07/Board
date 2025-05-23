document.querySelector(".btn1").addEventListener("click", () => {
  const id = document.querySelector(".login_input1").value;
  const pw = document.querySelector(".login_input2").value;

  fetch(`http://localhost:3000/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: id,
      user_pw: pw,
    }),
  }).then((response) => {
    if (response.status === 200) {
      alert("회원가입 성공");
      window.location.href = 'board.html'
    }
    else if (response.status === 500) alert("서버 오류");
    else if (response.status === 400) alert("회원가입 실패");
    else if (response.status === 201) alert("이미 회원가입 되어있습니다.");
    else if (response.status === 202) alert("이미 아이디가 존재합니다");
  });
});
document.addEventListener("DOMContentLoaded", async () => {
  document.querySelector('.register_header').addEventListener("click", () => {
    window.location.href = "./board.html";
});
document.querySelector('.login_header').addEventListener("click", () => {
    window.location.href = "./login.html"
})
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
})