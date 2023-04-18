import './index.css';

console.log('addis')
const appKey = 'xyUc6vOROrsRVucrRen9';
const url = 'https://api.tvmaze.com/search/shows?q=simpsons';
const likeUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appKey}/likes`;
const commentUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appKey}/comments`;
const commentList = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appKey}/comments?item_id=83`;
const movieContaier = document.querySelector('.movieContaier');
const movie = document.getElementsByClassName('movie');
const commentPopup = document.querySelector('.comment-popup');
const header = document.querySelector('.header');
const submitComment = document.querySelector('.submitComment');

// Get the like data from the surver.
const getLikes = async () => {
  const likeResponse = await fetch(likeUrl, {
    method: 'GET',
  });
  const responseInJason = await likeResponse.json();
  return responseInJason;
};

// Get the movie data from the surver.
const getMovies = async () => {
  const request = new Request(url);
  const response = await fetch(request);
  const bodyResponse = await response.json();
  return bodyResponse;
};

const populate = async () => {
  const returnMovies = await getMovies();
  const likeArray = await getLikes();
  console.log(likeArray);
  console.log(returnMovies);
  let likeCou = 0;
  console.log('rrr')
  movieContaier.innerHTML = '';
  for (let i = 0; i < returnMovies.length; i += 1) {
    for (let j = 0; j < likeArray.length; j += 1) {
      if (returnMovies[i].show.id == likeArray[j].item_id) {
        likeCou = likeArray[j].likes;
      }
    }
    movieContaier.innerHTML += `<div class="movie" id="${returnMovies[i].show.id}">
    <img class="picture" src="${returnMovies[i].show.image.original}" alt="">
    <div class="space-container">
        <h3 class="space">${returnMovies[i].show.name}</h3>
        <i class="fa-regular fa-heart"></i>
    </div>
    <span class="like-count">${likeCou} Likes</span>
    <button class="comments">Comments</button>
    <button class="reservation">Reservation</button>
</div>`;
  }
};

populate();

const likeUpdater = async (likeId) => {
  const rese = await fetch(likeUrl, {
    method: 'GET',
  });
  const resgett = await rese.json();
  for (let i = 0; i < movie.length; i += 1) {
    if (movie[i].id == likeId) {
      for (let j = 0; j < resgett.length; j += 1) {
        if (resgett[j].item_id == likeId) {
          movie[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.textContent = `${resgett[j].likes} Likes`;
        }
      }
    }
  }
};

const likePost = async (ide) => {
  const payloadObject = {
    item_id: ide,
  };
  payloadObject.likes = 0;
  const myRequest = new Request(likeUrl);
  const response = await fetch(likeUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payloadObject),
  });
  likeUpdater(ide);
};

movieContaier.addEventListener('click', (e) => {
  if (e.target.classList.contains('fa-heart')) {
    let id = e.target.parentElement.parentElement.id;
    let heartTarget = e.target.parentElement.nextSibling.nextSibling.textContent;
    likePost(id);
  }
  if (e.target.classList.contains('comments')) {
    const comentId = e.target.parentElement.id;
    if (commentPopup.classList.contains('active')) {
      commentPopup.classList.remove('active');
    }
    commentPopup.classList.add('active');
    header.classList.add('deactive');
    commentPopulator(comentId);
  }
})




















const commentPost = async (comment) => {
  const myRequest = new Request(commentUrl);
  const response = await fetch(commentUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment),
  });
  const rese = await fetch(commentList, {
    method: 'GET',
  });
  const resgett = await rese.json();
  console.log(resgett);
};

const getComment = async () => {
  const commentResponse = await fetch(commentList, {
    method: 'GET',
  });
  const commentJeson = await commentResponse.json();
  return commentJeson;
};

const commentPopulator = async (ides) => {
  const myComment = await getComment(); 
  const request = new Request(url);
  const response = await fetch(request);
  const bodyResponse = await response.json();
  for (let i = 0; i < bodyResponse.length; i += 1) {
    if (bodyResponse[i].show.id == ides) {
      commentPopup.innerHTML = `<img src="${bodyResponse[i].show.image.original}" alt="" class="comment-img">
      <h1 class="com-header">${bodyResponse[i].show.name}</h1>
      <div class="discription">
          <h2 class="detail">Language: ${bodyResponse[i].show.language}</h2>
          <h2 class="detail">Type: ${bodyResponse[i].show.type}</h2>
          <h2 class="detail">Premiered
          : ${bodyResponse[i].show.premiered}</h2>
          <h2 class="detail">Score: ${bodyResponse[i].score}</h2>
      </div>
      <h2 class="comment-count">Comments (2)</h2>
      <div class="timeand-comment-cont">
          <div class="time-com">03/11/2023</div>
          <div class="time-com">03/11/2023</div>
      </div>
      <div class="add-comment">
          <h2 class="com-header">Add a comment</h2>
          <input type="text" class="userName">
          <input type="text" class="userComment">
          <input type="submit" class="submitComment" id="${bodyResponse[i].show.id}">
      </div>`;
    }
  }
};

commentPopup.addEventListener('click', (e) => {
  let commentObject;
  if (e.target.classList.contains('submitComment')) {
    const ids = e.target.id;
    const userName = document.querySelector('.userName');
    const userComment = document.querySelector('.userComment');
    if (userName.value !== '' && userComment !== '') {
      commentObject = {
        item_id: ids,
        username: userName.value,
        comment: userComment.value,
      };
    }
    commentPost(commentObject);
  }
});