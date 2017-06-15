var giftastic = {
	limit : 12,
	searchfor : ['star wars', 'puppies', 'kittens'],
	rating : 'pg13',
	result: null,
	getGifs: function(dispFor)
	{
		var searchapi="http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q="+dispFor+"&limit="+this.limit+"&rating="+this.rating;
		$.ajax({
			url: searchapi,
			method: "GET"
			}).done(function(response){
				this.result=response;
				this.displayGifs();
			}.bind(this));
	},
	displayGifs: function(){
			$('#gifimg').empty();
			for(i=0; i<this.limit; i++){
				var imdiv=$('<div>');
				var rtng=$('<h4>');
				var im=$('<img>');
				im.addClass('js-img cs-img');
				im.attr({
					'state': 'still',
					'still_src': this.result.data[i].images.downsized_still.url,
					'animate_src': this.result.data[i].images.downsized.url,
					'src': this.result.data[i].images.downsized_still.url
				});
				rtng.text('Rating: '+this.result.data[i].rating);
				imdiv.addClass('col-md-4 col-xs-12');
				rtng.addClass('text-center')
				imdiv.append(rtng).append(im);
				$('#gifimg').append(imdiv);
			}
	},
	displayButtons: function()
	{
		$('#gifbuttons').empty();

		for(i=0; i<this.searchfor.length; i++){
			var b = $('<button>');
			b.addClass('js-gifbtn cs-gifbtn');
			b.attr('btn-val', this.searchfor[i]);
			b.text(this.searchfor[i]);
			$('#gifbuttons').append(b);
		}
	}
};



$(document).ready(function(){
	var gen=giftastic;
	gen.displayButtons();
	
	$('#gifbuttons').on('click', '.js-gifbtn', function(){
		var dispFor=$(this).attr('btn-val');
		gen.getGifs(dispFor);
	});

	$('#add-btn').on('click', function(){
		console.log('i am in add btn');
		var add=$('#userip').val();
		gen.searchfor.push(add);
		gen.displayButtons();
	});

	$('#gifimg').on('click', '.js-img', function(){
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