document.querySelector(".btn1").addEventListener("click", () => {
  const id = document.querySelector(".login_input1").value
  const pw = document.querySelector(".login_input2").value

  fetch(`http://localhost:3000/check`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          user_id: id,
          user_pw: pw
      })
  }).then(response => {
      if (response.status === 200) alert("로그인 성공")
      else if (response.status === 500) alert("서버 오류")
      else if (response.status === 400) alert("로그인 실패")
      else if (response.status === 201) alert("이미 로그인 되어있습니다.")
  })
})