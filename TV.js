$(document).ready(function () {

    const apiKey = "k8p3swU7TqJ5I3O5odtlqk_7Ur3wu3Ij";
    let showID;

    function displayTVShow(response) {
        // Reset the episode list display and enable the episodes button
        $("#episodes").text("");
        $("#episodes-btn").removeClass("Disabled");
        // If api returns an empty array, display a message no results found
        if (response.length === 0) {
            $("#error-display").css("display", "block");
        } else {
            // Remove the initial image and allow the tv show data section to be displayed
            $("#friends-image").css("display", "none");
            $("#show-data").css("display", "block");
            $("#show-title").text(response[0].show.name);
            let genreLength = response[0].show.genres.length;
            // Clear the text content 
            $("#show-genres").text("");
            // Since the tv show can have more than one genre, loop to display all
            for (let i = 0; i < genreLength; i++) {
                // If last item, don't need the comma
                if (i !== genreLength - 1) {
                    $("#show-genres").append(response[0].show.genres[i] + ", ");
                } else {
                    $("#show-genres").append(response[0].show.genres[i]);
                }
            }
            $("#show-premiered").text("Premeried: " + response[0].show.premiered);
            $("#show-summary").html(response[0].show.summary);
            $("#show-poster").attr("src", response[0].show.image.medium);
        }
    }

    function buildEpisodes(response) {
        // To display a list of all seasons and episodes of tv show
        // Loop through all episodes
        for (let i = 0; i < response.length; i++) {
            let seasonNum = response[i].season;
            let episodeNum = response[i].number;
            let epiName = response[i].name;
            // If it's a new season, display the season heading
            if (episodeNum === 1) {
                $("#episodes").append('<p class="season-heading">Season: ' + seasonNum + '</p>');
            }
            $("#episodes").append('<p>Episode ' + episodeNum + ': \"' + epiName + '\"' + '</p>');
        }
    }

    // To get the query URL for the tv maze data based on title search input
    function buildQueryURLTitle(titleSearch) {
        let queryURL = "https://api.tvmaze.com/search/shows?q=";
        return queryURL + titleSearch + "&apikey=" + apiKey;
    }

    function getAJAXData(title) {
        // Build the query URL for the ajax request to tv Maze
        let queryURL = buildQueryURLTitle(title);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // Remove the error message from being displayed
            $("#error-display").css("display", "none");
            displayTVShow(response);
            // TV maze returns a unique id for the tv show
            showID = response[0].show.id;
        });
    }

    function getEpisodes(showID) {
        // Build the query URL for the ajax request to tv Maze for the episodes search based on show ID
        let queryURL = "http://api.tvmaze.com/shows/" + showID + "/episodes?apikey=" + apiKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            buildEpisodes(response);
        });
    }

    $("#search-btn").on("click", function (event) {
        event.preventDefault();
        let searchInput = $("#search-input").val();
        // Start the request to the api
        getAJAXData(searchInput);
    })

    $("#episodes-btn").on("click", function (event) {
        event.preventDefault();
        // Disable the button after click
        $("#episodes-btn").addClass("Disabled");
        // Start the request to the api
        getEpisodes(showID);
    })


})
