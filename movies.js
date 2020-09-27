$(document).ready(function () {

    const apiKey = "19bc2b34e4545cb9f3348ae002f13c8f";

    // To convert the genre to a genreID needed for api search
    function getGenre(genreString) {
        switch (genreString) {
            case "action":
                genreID = 28;
                break;
            case "adventure":
                genreID = 12;
                break;
            case "animation":
                genreID = 16;
                break;
            case "comedy":
                genreID = 35;
                break;
            case "crime":
                genreID = 80;
                break;
            case "documentary":
                genreID = 99;
                break;
            case "drama":
                genreID = 18;
                break;
            case "family":
                genreID = 10751;
                break;
            case "fantasy":
                genreID = 14;
                break;
            case "history":
                genreID = 36;
                break;
            case "horror":
                genreID = 27;
                break;
            case "music":
                genreID = 10402;
                break;
            case "mystery":
                genreID = 9648;
                break;
            case "romance":
                genreID = 10749;
                break;
            case "science fiction":
                genreID = 878;
                break;
            case "tv movie":
                genreID = 10770;
                break;
            case "thriller":
                genreID = 53;
                break;
            case "war":
                genreID = 10752;
                break;
            case "western":
                genreID = 37;
                break;
            default:
                genreID = 0;
                break;
        }
        return genreID;
    }

    function renderResults(response) {
        // Remove the home page carousel display
        $("#carouselExampleIndicators").css("display", "none");

        $(".movieCard").css("display", "none");
        $("#movie-title1").text(response.results[0].title);
        $("#year1").text(response.results[0].release_date);
        $("#plot1").text(response.results[0].overview);
        $("#image1").attr("src", "http://image.tmdb.org/t/p/w185//" + response.results[0].poster_path);

        $("#movie-title2").text(response.results[1].title);
        $("#year2").text(response.results[1].release_date);
        $("#plot2").text(response.results[1].overview);
        $("#image2").attr("src", "http://image.tmdb.org/t/p/w185//" + response.results[1].poster_path);

        $("#movie-title3").text(response.results[2].title);
        $("#year3").text(response.results[2].release_date);
        $("#plot3").text(response.results[2].overview);
        $("#image3").attr("src", "http://image.tmdb.org/t/p/w185//" + response.results[2].poster_path);

        $("#movie-title4").text(response.results[3].title);
        $("#year4").text(response.results[3].release_date);
        $("#plot4").text(response.results[3].overview);
        $("#image4").attr("src", "http://image.tmdb.org/t/p/w185//" + response.results[3].poster_path);

        $("#movie-title5").text(response.results[4].title);
        $("#year5").text(response.results[4].release_date);
        $("#plot5").text(response.results[4].overview);
        $("#image5").attr("src", "http://image.tmdb.org/t/p/w185//" + response.results[4].poster_path);
    }

    function buildQueryURL(genreSearch) {
        let queryURL = "https://api.themoviedb.org/3/discover/movie?api_key="
        return queryURL + apiKey + "&apikey=" + "&language=en-US&sort_by=popularity.desc&with_genres=" + genreID;
    }


    function getMovieData(searchTerm) {
        // Build the query URL for the ajax request to The Movie DB
        let queryURL = buildQueryURL(searchTerm);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            renderResults(response);
        });
    }


    $("#movie-search-btn").on("click", function (event) {
        event.preventDefault();
        let searchInput = $("#movieSearch").val();
        let genreID = getGenre(searchInput);
        // Start the request to the api
        getMovieData(genreID);
    })

})