  var searchArray = [
        "dog","cat","rabit","hamster","skunk","goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog"
            ]

    renderButtons();
    game();

function game() {
    // Adding click event listen listener to all buttons
    $("button").on("click", function() {

      $("#gifContainer").empty();
      // Grabbing and storing the data-animal property value from the button
      var search = $(this).attr("gif-name");

      // Constructing a queryURL using searchArray
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
       search + "&api_key=dc6zaTOxFJmzC&limit=50";

      // Performing an AJAX request with the queryURL
      $.ajax({
          url: queryURL,
          method: "GET",
        })
        // After data comes back from the request
        .done(function(response) {
          console.log(queryURL);

          console.log(response);
          // storing the data from the AJAX request in the results variable
          var results = response.data;

          // Looping through each result item
          for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var gifDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var gifImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            gifImage.attr("src", results[i].images.fixed_height.url);

            gifDiv.addClass("imageContainer col-lg-3 col-md-3 col-sm-3 col-xs-3")
            gifImage.addClass("gifImage")
       


            // Appending the paragraph and image tag to the animalDiv
            gifDiv.append(p);
            gifDiv.append(gifImage)

            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $("#gifContainer").prepend(gifDiv);




  

    //   <form id="searchForm">
    //   <h2 for="addSearch-text">Search For Gifs!</h2>
    //   <input type="text" id="addSearch-input"><br>

    //   <!-- Button triggers new Animal to be added -->
    //   <br>
    //   <input id="addSearch" type="submit" value="Add Search Button!">
    // </form>

      
          }


          //Creating New button Fomr
            var formContainer = $("<div>")
            var newButtonForm = $("<form>")
            var formTitle = $("<h2>")
            var formInput = $("<input>")
            var formBr = $("<br>")
            var formButton = $("<input>")

            formTitle.text("Search For Gifs!!")
            formButton.attr("value","Add a Search Button!")
            formButton.attr("id", "addSearch")
            formButton.attr("type","submit")

            formContainer.addClass(" col-lg-12 col-md-12 col-sm-12 col-xs-12")

            formContainer.append(newButtonForm)
            newButtonForm.append(formTitle)
            newButtonForm.append(formInput)
            newButtonForm.append(formBr)
            newButtonForm.append(formButton)

            $("#gifContainer").prepend(formContainer)
        });
      });

  }

  // Function for displaying button data
      function renderButtons() {

        // Deleting the searchButtons prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of searches
        for (var i = 0; i < searchArray.length; i++) {

          // Then dynamicaly generating buttons for each search in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var searchButton = $("<button>");
          // Adding a class of gifs to our button
          searchButton.addClass("search");
          // Adding a data-attribute
          searchButton.attr("gif-name", searchArray[i]);
          // Providing the initial button text
          searchButton.text(searchArray[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(searchButton);




        }
      }

      // This function handles events where a add button is clicked
      $("#addSearch").on("click", function(event) {

        // This line grabs the input from the textbox
        var addSearch = $("#addSearch-input").val().trim();

        if (addSearch === "") {

         alert("please type a value")

        } else {


        event.preventDefault();

        // Adding search from the textbox to our array
        searchArray.push(addSearch);

        console.log(addSearch)

        // Calling renderButtons which handles the processing of our search array
        renderButtons();
        game();
      };


      });

