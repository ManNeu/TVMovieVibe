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
        // Remove error message
        $("#error-display").css("display", "none");
        // Remove the home page carousel display
        $(".pictureCarosel").css("display", "none");
        // Display the movie poster cards
        $(".genre-card").css("display", "block");
        // Set the third card back to original margins and width
        $(".card-three").css("margin-left", "0");
        $(".card-three").css("margin-right", "0");
        $(".card-three").css("width", "16rem");

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

    function renderTitleResults(response) {
        // Error message if no results found
        if (response.total_results === 0) {
            $("#error-display").css("display", "block");
        } else {
            $("#error-display").css("display", "none");
            // Remove the home page carousel display
            $(".pictureCarosel").css("display", "none");
            // Remove the movie cards
            $(".genre-card").css("display", "none");
            // Display the first movie poster card 
            $(".card-three").css("display", "block");
            $(".card-three").css("margin-left", "10%");
            $(".card-three").css("margin-right", "10%");
            $(".card-three").css("width", "100%");
            // Add the results to the movie card display
            $("#movie-title3").text(response.results[0].title);
            $("#year3").text(response.results[0].release_date);
            $("#plot3").text(response.results[0].overview);
            $("#image3").attr("src", "http://image.tmdb.org/t/p/w185//" + response.results[0].poster_path);
        }
    }

    function buildQueryURL(genreSearch) {
        let queryURL = "https://api.themoviedb.org/3/discover/movie?api_key="
        return queryURL + apiKey + "&apikey=" + "&language=en-US&sort_by=popularity.desc&with_genres=" + genreID;
    }

    function buildMovieTitleQueryURL(titleSearch) {
        let queryURL = "https://api.themoviedb.org/3/search/movie?api_key="
        return queryURL + apiKey + "&query=" + titleSearch;
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

    function getMovieTitleData(searchTerm) {
        // Build the query URL for the ajax request to The Movie DB
        let queryURL = buildMovieTitleQueryURL(searchTerm);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            renderTitleResults(response);
        });
    }


    $("#movie-search-btn").on("click", function (event) {
        event.preventDefault();
        let searchInput = $("#movieSearch").val();
        let genreID = getGenre(searchInput);
        // Start the request to the api
        getMovieData(genreID);
    })

    $("#title-search-btn").on("click", function (event) {
        event.preventDefault();
        let searchInput = $("#movienameSearch").val();
        // Start the request to the api
        getMovieTitleData(searchInput);
    })

})