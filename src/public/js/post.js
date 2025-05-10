document.querySelector(".post_btn").addEventListener("click", () => {
    const title = document.querySelector(".title").value
    const content = document.querySelector(".content").value
  
    fetch(`http://localhost:3000/post`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            post_title: title,
            post_content: content
        })
    }).then(response => {
        if (response.status === 200) alert("글작성 성공")
        else if (response.status === 500) alert("서버 오류")
        else if (response.status === 400) alert("글작성 실패")
        // else if (response.status === 201) alert("이미  되어있습니다.")
    })
  })