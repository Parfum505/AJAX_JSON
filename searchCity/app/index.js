
const url = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];

let req = new XMLHttpRequest();
	req.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
			let answ = JSON.parse(this.responseText);
			cities.push(...answ);
			console.log(cities[0]);
	    }
	};
	req.open("GET", url, true);
	req.send();

console.log(cities[0]);