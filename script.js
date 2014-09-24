/*
	Color code notation conversion
*/

var hexInput = document.getElementById('hex');
var rgbInput = document.getElementById('rgb');
var hslInput = document.getElementById('hsl');

var body = document.getElementsByTagName('body')[0];

// hexcode to ["r", "g", "b"] conversion
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

// ["r", "g", "b"] to hexcode conversion
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

// ["r", "g", "b"] to hexcode conversion
// var rgbToHsl = function(rgb) {
// 	var r = rgb[0]/255;
// 	var g = rgb[1]/255;
// 	var b = rgb[2]/255;
// 	var min = Math.min.apply(null, rgb);
// 	var max = Math.max.apply(null, rgb);
// 	var h, s, l = (max + min) / 2;

// 	if (max == min) {
// 		h = s = 0; 
// 	} else {
// 		var d = max - min;

// 		s = (l < 0.5) ? (d / (max + min)) : (d / (2 - max - min));

// 		switch(max) {
// 			case r:
// 				h = (g - b) / d + (g < b ? 6 : 0);
// 				break;
// 			case g:
// 				h = (b - r) / d + 2;
// 				break;
// 			case b:
// 				h = (r - g) / d + 4;
// 				break;
// 		}
// 		h /= 6;
// 	}
// 	return [h, s, l];
// }
function rgbToHsl(rgb){
    r = (rgb[0]/255).toFixed(2), g = (rgb[1]/255).toFixed(2), b = (rgb[2]/255).toFixed(2);
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var d = max - min, sum = max + min;
    var h, s, l = sum / 2;

    if(d == 0) {
        h = s = 0;
    } else {
        s = l < 0.5 ? (d / sum) : (d / (2.0 - sum));
        if(max == r) {
        	h = (g - b) / d;
        } else if(max == g) {
        	h = ((b - r) / d) + 2.0;
        } else if(max == b) {
        	h = ((r - g) / d) + 4.0;
        }
        h *= 60;
        if (h < 0) {
        	h *= 360;
        }
    }
    return [Math.ceil(h), (s.toFixed(2))*100, Math.ceil(l*100)];
}

// change foreground components color with bg
var changeColorWithBg = function(arr) {
	var yiq = ((arr[0] * 299) + (arr[1] * 587) + (arr[2] * 114))/1000;
	var fontColor = ((yiq >= 128) ? 'black' : 'white');
	// ref: http://24ways.org/2010/calculating-color-contrast/

	hexInput.style.color = fontColor;
	hexInput.style.borderColor = fontColor;
	rgbInput.style.color = fontColor;
	rgbInput.style.borderColor = fontColor;
	hslInput.style.color = fontColor;
	hslInput.style.borderColor = fontColor;
	document.getElementById('header').style.color = fontColor;
}

hexInput.onkeyup = function() {
	if (hexInput.value == "") {
		rgbInput.value = "";
		hslInput.value = "";
	} else {
		var hex = hexInput.value;
		if (hex.charAt(0) == '#') {
			hex = hex.substr(1);
		}
		if (hex.length == 6) {
			body.style.backgroundColor = "#" + hex;
			var rgb = hexToRgb(hex);
			var hsl = rgbToHsl(rgb);
			hslInput.value = "hsl(" + hsl[0] + "˚," + hsl[1] + "%," + [hsl[2]] + "%)";
			rgbInput.value = "rgb(" + rgb.join(", ") + ")";
			changeColorWithBg(rgb);
		} else {
			rgbInput.value = "";
			hslInput.value = "";
		}
	}
}

rgbInput.onkeyup = function() {
	if (rgbInput.value == "") {
		hexInput.value = "";
		hslInput.value = "";
	} else {
		if (/^(rgb\(\s*([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]),\s*([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]),\s*([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\s*\))$/.test(rgbInput.value)) {
			body.style.backgroundColor = rgbInput.value;
			var rgb = rgbInput.value.replace("rgb(", "").replace(")", "").split(",");
			var hex = rgbToHex(rgb);
			hexInput.value = ("#").concat(hex.toUpperCase());
			changeColorWithBg(rgb);
			
			hsl = rgbToHsl(rgb);
			hslInput.value = "hsl(" + hsl[0] + "˚," + hsl[1] + "%," + [hsl[2]] + "%)";
		} else {
			hexInput.value = "";
			hslInput.value = "";
		}
	}
}

hslInput.onkeyup = function() {
	if (hslInput.value == "") {
		hslInput.value = "";
	} else {
		if (/^(hsl\(1?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]\))$/) {


		}
	}
}