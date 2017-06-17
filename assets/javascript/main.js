//Define object to hold GIFtastic properties and methods

var giftastic = {
	limit : 12, //no of GIFs to request
	//holds the search terms for initial button display
	searchfor : ['falling', 'yoda', 'flying dog', 'office', 'face palm','parkour', 'donald duck', 'penguin', 'test'],
	rating : 'pg13', //holds rating under which to request GIFs
	result: null, //to hold the API result

	/*function to add the user entered button and 
	to display buttons and result GIFS for currently added button*/ 
	addButton: function()
	{
		var add=$('#userip').val();
		if(add!==''){
			//pushes the word to the array
			this.searchfor.push(add);

			//calls the button render function
			this.displayButtons();

			//calls  the function to get the GIFs from API for currently addded word
			this.getGifs(add);
		}

		//empties the userinput in text box
		$('#userip').val('');
	},

	/*function to call the API to get the results
	 when a button is clicked*/
	getGifs: function(dispFor)
	{
		var searchapi="https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q="+dispFor+"&limit="+this.limit+"&rating="+this.rating;
		$.ajax({
			url: searchapi,
			method: "GET"
			}).done(function(response){
				this.result=response;
				this.displayGifs();
			}.bind(this));
	},

	//function to display GIFs after API response
	displayGifs: function(){
			$('#gifimg').empty();
			for(i=0; i<this.limit; i++){
				var imdiv=$('<div>');
				var rtng=$('<p>');
				var im=$('<img>');
				rtng.addClass('cs-rtng');
				im.addClass('js-img cs-img');
				im.attr({
					'state': 'still',
					'still_src': this.result.data[i].images.downsized_still.url,
					'animate_src': this.result.data[i].images.downsized.url,
					'src': this.result.data[i].images.downsized_still.url
				});
				rtng.text('Rating: '+this.result.data[i].rating);
				imdiv.addClass('col-md-4 col-sm-6 col-xs-12');
				rtng.addClass('text-center')
				imdiv.append(rtng).append(im);
				$('#gifimg').append(imdiv);
			}
	},

	//function to re-render the buttons after a new button is added
	displayButtons: function()
	{
		$('#gifbuttons').empty();

		for(i=0; i<this.searchfor.length; i++){
			var b = $('<button>');
			b.addClass('js-gifbtn cs-gifbtn col-md-2 col-xs-4');
			b.attr('btn-val', this.searchfor[i]);
			b.text(this.searchfor[i]);
			$('#gifbuttons').append(b);
		}
	}
};



$(document).ready(function(){
	//create new giftastic variable
	var gen=giftastic;
	gen.displayButtons();
	
	//jQuery to identify the button clicked and display the gifs
	$('#gifbuttons').on('click', '.js-gifbtn', function(){
		var dispFor=$(this).attr('btn-val');
		gen.getGifs(dispFor);
	});

	//jQuery to identify when Add button is clicked
	$('#add-btn').on('click', function(){
		gen.addButton();
	});

	//jQuery to identify if enter key is pressed instead of add button
	$('#userip').on('keypress', function(e){
		if (e.which===13){
			gen.addButton();
		}
	});

	//jQuery to toggle play_pause of GIFs on click
	$('#gifimg').on('click', '.js-img', function(e){
		var curImg;
		if ($(this).attr('state')==='still'){
			curImg=$(this).attr('animate_src');
			$(this).attr('src', curImg);
			$(this).attr('state','animate')
		}
		else{
			curImg=$(this).attr('still_src');
			$(this).attr('src', curImg);
			$(this).attr('state','still')
		}
	});

});