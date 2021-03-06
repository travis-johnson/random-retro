
// TODO get number of pages from API call and populate variable
var pages = Math.floor(Math.random()*28);
console.log(pages);
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.themoviedb.org/3/discover/movie?with_genres=27&without_genres=99,18,10751,10402,10749&primary_release_date.lte=1999-01-01&primary_release_date.gte=1970-01-01&page="+pages+"&include_video=false&include_adult=false&vote_average.gte=5&region=US&sort_by=popularity.desc&language=en-US&api_key=a751d6f146daca63096db49c63690e9f",
    "method": "GET"
  }

  var genres = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.themoviedb.org/3/genre/movie/list?api_key=a751d6f146daca63096db49c63690e9f&language=en-US",
    "method": "GET"
  }

 

  var key = '&api_key=a751d6f146daca63096db49c63690e9f';


$(document).ready(function () {
    $.ajax(genres).done(function (x){
        console.log(x);
    });

    $.ajax(settings).done(function tmdb(response) {
        console.log(response);
        var data = response.results[Math.floor(Math.random()*response.results.length)];
        var movieId = data.id;
        var credits = {
          "async": true,
          "crossDomain": true,
          "url": "https://api.themoviedb.org/3/movie/"+ movieId +"/credits?api_key=a751d6f146daca63096db49c63690e9f&language=en-US",
          "method": "GET"
        }
        function getVideo() {
          $.ajax({
            type: 'GET',
            url: 'https://www.googleapis.com/youtube/v3/search',
            data: {
                key: 'AIzaSyBJN8aQr9wK-emVuM0mEx5eKR23ImFk3_0',
                q: data.title + "trailer",
                part: 'snippet',
                maxResults: 1,
                type: 'video',
                videoEmbeddable: true,
            },
            success: function(data){
                embedVideo(data)
            },
            error: function(response){
                console.log("Request Failed");
            }
          });
        }
        function embedVideo(data) {
          $('iframe').attr('src', 'https://www.youtube.com/embed/' + data.items[0].id.videoId)
         
      }
      getVideo();
        console.log(data);
        var yr = data.release_date.slice(0,4);
        $('#poster').attr('src', 'https://image.tmdb.org/t/p/w500'+ data.poster_path)
        $('#poster').attr('alt', data.title);
        $('#movie_title').append(data.title);
        $('#year').append(yr);
        $('#plot > p').append(data.overview);

      }).fail(function(textStatus) { 
        location.reload();
      });
});



