$(document).ready(function () {

$('#search').keyup(function () {
	var text = $('#search').val();
	var reg = new RegExp(text, "i");
	$.getJSON('data.json', function (data) {
		var result = '<ul class="search_result">';
		$.each(data, function (key, val) {
			if ((val.name.search(reg) != -1) || (val.bio.search(reg) != -1)) {
				result += '<li>';
				result += '<h2>' + val.name + '</h2>';
				result += '<img src="img/' + val.shortname + '_tn.jpg" alt="' + + val.name + '">';
				result += '<p>' + val.bio + '</p>';
				result += '</li>';
			}
		});
			result += '</ul>';
			$('#update').html(result);
	}); // getJSON
});

});
