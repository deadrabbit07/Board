document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    // console.log(id);

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
    
    });
});