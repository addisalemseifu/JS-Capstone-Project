const appKey = 'xyUc6vOROrsRVucrRen9';
const likeUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appKey}/likes`;
const movie = document.getElementsByClassName('movie');
export default class Like {
    static getLikes = async () => {
      const likeResponse = await fetch(likeUrl, {
        method: 'GET',
      });
      const responseInJason = await likeResponse.json();
      return responseInJason;
    }

    static likeUpdater = async (likeId) => {
      const rese = await fetch(likeUrl, {
        method: 'GET',
      });
      const resgett = await rese.json();
      for (let i = 0; i < movie.length; i += 1) {
        if (Number(movie[i].id) === Number(likeId)) {
          for (let j = 0; j < resgett.length; j += 1) {
            if (Number(resgett[j].item_id) === Number(likeId)) {
              movie[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.textContent = `${resgett[j].likes} Likes`;
            }
          }
        }
      }
    }

    static likePost = async (ide) => {
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
      Like.likeUpdater(ide);
    }
}