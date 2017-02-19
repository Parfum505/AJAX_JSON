
const url = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];

const req = new XMLHttpRequest();
	req.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
			let answ = JSON.parse(this.responseText);
			cities.push(...answ);
			// console.log(cities);
	    }
	};
	req.open("GET", url, true);
	req.send();

	function buildList(list, text, reg) {

		const html = list.map(item => {
			const city = item.city.replace(reg, `<span class="hl">${text}</span>`);
			const state = item.state.replace(reg, `<span class="hl">${text}</span>`);
			let li = '<li><span class="name">';
			li += city + ', '+ state +'</span>';
			li +='<span class="population">' + item.population+'</span></li>';
			return li;
		}).join("");

		// console.log(html);
		document.querySelector('.suggestions').innerHTML = html;
	}
	function searchCity() {
		const text = this.value;
		const reg = new RegExp(text, 'gi');
		const list = cities.filter(city => city.city.search(reg) != -1 || city.state.search(reg) != -1);
		buildList(list, text, reg);
		// console.log(list);
	}

document.querySelector('.search').addEventListener('keyup', searchCity, false);