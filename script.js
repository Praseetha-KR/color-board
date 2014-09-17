/*
	Color code notation conversion
*/

var hexInput = document.getElementById('hex');
var rgbInput = document.getElementById('rgb');
var body = document.getElementsByTagName('body')[0];

// hexcod to ["r", "g", "b"] conversion
var hexToRgb = function(hex) {
	var hexArr = hex.split("");
	var rgb = hexArr.reduce(function(p, c, i, a) {
		if ((i % 2) == 0) {
			p.push(c);
		} else {
			p[(i-1)/2] += c;
		}
		return p;
	}, []).map(function(num) {
		return parseInt(num, 16);
	});
	return rgb;
}

// ["r", "g", "b"] to hexcod conversion
var rgbToHex = function(rgb) {
	var n;
	var hex = rgb.map(function(num) {
		n = (parseInt(num)).toString(16);
		if (n.length == 1) {
			n = '0' + n;
		}
		return n;
	}).join("");
	return hex;
}

// change foreground components color with bg
var changeColorWithBg = function(arr) {
	var yiq = ((arr[0] * 299) + (arr[1] * 587) + (arr[2] * 114))/1000;
	var fontColor = ((yiq >= 128) ? 'black' : 'white');
	// ref: http://24ways.org/2010/calculating-color-contrast/

	hex.style.color = fontColor;
	hex.style.borderColor = fontColor;
	rgb.style.color = fontColor;
	rgb.style.borderColor = fontColor;
	document.getElementById('header').style.color = fontColor;
}

hexInput.onkeyup = function() {
	if (hexInput.value == "") {
		rgbInput.value = "";
	} else {
		var hex = hexInput.value;
		if (hex.charAt(0) == '#') {
			hex = hex.substr(1);
		}
		if (hex.length == 6) {
			body.style.backgroundColor = "#" + hex;
			var rgb = hexToRgb(hex);
			rgbInput.value = "rgb(" + rgb.join(", ") + ")";
			changeColorWithBg(rgb);
		} else {
			rgbInput.value = "";
		}
	}
}

rgbInput.onkeyup = function() {
	if (rgbInput.value == "") {
		hexInput.value = "";
	} else {
		if (/^(rgb\(\s*([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]),\s*([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]),\s*([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\s*\))$/.test(rgbInput.value)) {
			body.style.backgroundColor = rgbInput.value;
			var rgb = rgbInput.value.replace("rgb(", "").replace(")", "").split(",");
			var hex = rgbToHex(rgb);
			hexInput.value = ("#").concat(hex.toUpperCase());
			changeColorWithBg(rgb);
		} else {
			hexInput.value = "";
		}
	}
}