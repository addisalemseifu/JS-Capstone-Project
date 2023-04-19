import Like from './like.js';

const url = 'https://api.tvmaze.com/search/shows?q=simpsons';
const movieContaier = document.querySelector('.movieContaier');
export default class Movie {
    static getMovies = async () => {
      const request = new Request(url);
      const response = await fetch(request);
      const bodyResponse = await response.json();
      return bodyResponse;
    }

      static populate = async () => {
        const returnMovies = await Movie.getMovies();
        const likeArray = await Like.getLikes();
        let likeCou = 0;
        movieContaier.innerHTML = '';
        for (let i = 0; i < returnMovies.length; i += 1) {
          for (let j = 0; j < likeArray.length; j += 1) {
            if (returnMovies[i].show.id === Number(likeArray[j].item_id)) {
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
</div>`;
        }
      }
}