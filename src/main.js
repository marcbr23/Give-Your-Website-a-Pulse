import './style.css';

const API_KEY = import.meta.env.VITE_NASA_API_KEY;

document.querySelector("#app").innerHTML = "<p>Loading...</p>";

fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
  .then(response => response.json()).then(data => {

      let media
      if (data.media_type === "image") {
        media = `<img class="media" src="${data.url}" />`;
      }
      else if (data.media_type === "video"){
        media = `<video class="media" src="${data.url}" controls></video>`;
      }

      else {
        media = `<iframe class="media" src="${data.url}"></iframe>`
      }
      
      document.querySelector("#app").innerHTML = `
      <h1>${data.title}</h1>
      ${media}
      <p>${data.explanation}</p>`
      
  })
  .catch(err => {
    document.querySelector("#app").innerHTML = `<p>Error: ${err.message}</p>`;
  });


