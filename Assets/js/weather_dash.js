




$(document).ready(function () {


    function pasteOntoPage () {


    }
    
    // This is a button that will place the value grabbed from the user input "city" and use it in the api call.
    $("#getForecast").click(function(){
        
        let $city = $("#city").val();
        //let weatherAPI = "https://api.openweathermap.org/data/2.5/forecast?q=";
        let apiKey = "4f9b9f0d81395d4880a33e43a1783f9e";
        //let callThis = weatherAPI + $city + apiKey;
        let weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent($city)}&units=imperial&appid=${encodeURIComponent(apiKey)}`;
       
        fetch(weatherURL)
            .then(function(response){
                return response.json();
            })
        .then(function(data){
            //console.log(data);
            let counter = 0;
            for (let i = 0; i < 6; i++){
                


            }
        });

    });


});

// need to add to the cards.

// need a button and text input for city. 

// need to push api call return to cards. 

// maybe gifs from procreate?
