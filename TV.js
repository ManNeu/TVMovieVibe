$(document).ready(function () {

    const apiKey = "k8p3swU7TqJ5I3O5odtlqk_7Ur3wu3Ij";

    let title = "big bang"; // replace with the user input

    getAJAXData(title);

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
            method: "GET",
            success: function (response) {
                console.log(response[0].show.name);
                console.log(response[0].show.genres); // returns an array
                console.log(response[0].show.premiered);
                console.log(response[0].show.summary);
                console.log(response[0].show.image.medium);
            },
            error: function () {
                console.log("Sorry, not found");
            }
        });
    }

    $("#tv-search-btn").on("click", function (event) {
        event.preventDefault();
        let searchInput = $("#search-input").val();  // replace with the id of the search input
        // Start the request to the api
        getAJAXData(searchInput);
    })


})