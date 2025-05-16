document.addEventListener("DOMContentLoaded", () => {
    fetch(`http://localhost:3000/board`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(async (res) => {
        const result = await res.json();
        // console.log(result);

        result.forEach((post, index) => {
            const post_num = document.createElement('td');
            post_num.classList.add('post_num');
            post_num.textContent = (index + 1).toString(); // 게시글 번호

            const post_title = document.createElement('td');
            post_title.classList.add('post_title');

            const link = document.createElement('a');
            link.href = `/check_my_post.html?id=${result[index].id}`;  
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
            post_views.textContent = '조회수';

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
