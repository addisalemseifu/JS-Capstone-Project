import './index.css';
import Comment from './comment.js';
import Movie from './movie.js';
import Like from './like.js';

const movieContaier = document.querySelector('.movieContaier');

const commentPopup = document.querySelector('.comment-popup');
const header = document.querySelector('.header');

document.addEventListener('DOMContentLoaded', () => {
  Movie.populate();
});

movieContaier.addEventListener('click', (e) => {
  if (e.target.classList.contains('fa-heart')) {
    const getId = e.target.parentElement.parentElement.id;
    Like.likePost(getId);
  }
  if (e.target.classList.contains('comments')) {
    const comentId = e.target.parentElement.id;
    if (commentPopup.classList.contains('active')) {
      commentPopup.classList.remove('active');
    }
    commentPopup.classList.add('active');
    header.classList.add('deactive');
    Comment.commentPopulator(comentId);
  }
});

commentPopup.addEventListener('click', (e) => {
  let commentObject;
  let ids = 0;
  if (e.target.classList.contains('submitComment')) {
    ids = e.target.id;
    const userName = document.querySelector('.userName');
    const userComment = document.querySelector('.userComment');
    if (userName.value !== '' && userComment !== '') {
      commentObject = {
        "item_id": ids,
        username: userName.value,
        comment: userComment.value,
      };
      console.log(commentObject)
    }
    Comment.commentPost(commentObject, ids);
  }
});