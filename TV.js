$(document).ready(function () {

    const apiKey = "k8p3swU7TqJ5I3O5odtlqk_7Ur3wu3Ij";

    let title = "big bang";
    getAJAXData(title);

    // To get the query URL for the tv maze data based on title search input
    function buildQueryURLTitle(titleSearch) {
        let queryURL = "https://cors-anywhere.herokuapp.com/http://api.tvmaze.com/search/shows?q=";
        return queryURL + titleSearch + "&apikey=" + apiKey;
    }

    function getAJAXData(title) {
        // Build the query URL for the ajax request to tv Maze and get show ID
        let queryURL = buildQueryURLTitle(title);

        $.ajax({
            url: queryURL,
            method: "GET",
            success: function (response) {
                console.log(response[0].show.name);
                console.log(response[0].show.summary);
                console.log(response[0].image.medium);
            },
            error: function () {
                console.log("Sorry, not found");
            }
        });
    }


})