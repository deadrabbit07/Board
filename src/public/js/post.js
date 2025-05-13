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

