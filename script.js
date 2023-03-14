let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

// função para pegar os dados da API
let getMovie = () => {
  let movieName = movieNameRef.value;
  let url = `https://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

  //   quando o campo do input estiver vazio
  if (movieName.length <= 0) {
    result.innerHTML = `<h3 class='msg'>Pesquise um Filme ou Série</h3>`;
  }

  // quando o input tiver conteúdo
  else {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // o filme existe no banco de dados
        if (data.Response == "True") {
          result.innerHTML = `
          <div class='info'>
            <img src="${data.Poster}" class='poster'>
            <div>
              <h2>${data.Title}</h2>
              <div class='rating'>  
                <img src='./assets/star-icon.svg'>
                <h4>${data.imdbRating}</h4>
              </div>
              <div class='details'>
                 <span>${data.Rated}</span>
                 <span>${data.Year}</span>
                 <span>${data.Runtime}</span>
              </div>
              <div class='genre'>
                   <div>${data.Genre.split(",").join("</div><div>")}
                  </div>
              </div>
            </div>
          </div>
            <h3>Plot:</h3>
            <p>${data.Plot}</p>
            <h3>Cast:</h3>
            <p>${data.Actors}</p>
          `;
        }

        // o filme NÃO existe no banco de dados
        else {
          result.innerHTML = `<h3 class='msg'>${data.Error}</h3>`;
        }
      });

    // quando o Error acontecer
    try {
    } catch (error) {
      result.innerHTML = `<h3 class='msg'>Ocorreu um erro</h3`;
    }
  }
};

//Usando o botão "Enter" no teclado para fazer a pesquisa
movieNameRef.addEventListener("keyup", ({ key }) => {
  if (key === "Enter") {
    return getMovie();
  }
});

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);
