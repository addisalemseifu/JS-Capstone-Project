const url = 'https://api.tvmaze.com/search/shows?q=simpsons';
const appKey = 'xyUc6vOROrsRVucrRen9';
const commentUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appKey}/comments`;
// const commentList = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appKey}/comments?item_id=83`;
const commentPopup = document.querySelector('.comment-popup');
export default class Comment {
    static commentPost = async (comment, id) => {
      // const myRequest = new Request(commentUrl);
      await fetch(commentUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment),
      });
      Comment.commentPopulator(id);
    }

    static commentPopulator = async (ides) => {
      const commentList = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appKey}/comments?item_id=${ides}`;
      const rese = await fetch(commentList, {
        method: 'GET',
      });
      const resgett = await rese.json();
      const request = new Request(url);
      const response = await fetch(request);
      const bodyResponse = await response.json();
      for (let i = 0; i < bodyResponse.length; i += 1) {
        if (bodyResponse[i].show.id == ides) {
          commentPopup.innerHTML = `<img src="${bodyResponse[i].show.image.original}" alt="" class="comment-img">
          <h1 class="com-header">${bodyResponse[i].show.name}</h1>
          <div class="discription">
              <h4 class="detail">Language: ${bodyResponse[i].show.language}</h4>
              <h4 class="detail">Type: ${bodyResponse[i].show.type}</h4>
              <h4 class="detail">Premiered
              : ${bodyResponse[i].show.premiered}</h4>
              <h4 class="detail">Score: ${bodyResponse[i].score}</h4>
          </div>
          <h2 class="comment-count">Comments (${resgett.length})</h2>
          <div class="timeand-comment-cont">
          </div>
          <div class="add-comment">
              <h2 class="com-header">Add a comment</h2>
              <input type="text" class="userName" placeholder="User Name">
              <textarea type="text" class="userComment" cols="20" rows="7" placeholder="Enter your message..."></textarea>
              <input type="submit" class="submitComment" id="${bodyResponse[i].show.id}">
          </div>`;
        }
      }
      const commentCon = document.querySelector('.timeand-comment-cont');
      for (let i = 0; i < resgett.length; i += 1) {
        const div = document.createElement('div');
        div.classList.add('time-com');
        div.textContent = `${Date.now()}${resgett[i].username}: ${resgett[i].comment}`;
        commentCon.appendChild(div);
      }
    }
}