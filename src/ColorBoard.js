/*
	Color code notation conversion
*/

var hexInput = document.getElementById('hex');
var rgbInput = document.getElementById('rgb');
var hslInput = document.getElementById('hsl');

var body = document.getElementsByTagName('body')[0];


function isHex(str) {
	if (/^\s*#?([a-fA-F0-9]){6}\s*$/.test(str)) {
		return true;
	} else {
		return false;
	}
}

function removeSpaces(str) {
	return str.replace(/\s/g, "");
}

// hexcode to [r,g,b] conversion
function hexToRgb(hex) {
	if (isHex(hex)) {
		hex = removeSpaces(hex);
		if (hex.charAt(0) == '#') {
			hex = hex.substr(1);
		}
		var hexArr = hex.split("");
		var rgb = "rgb(" + hexArr.reduce(function(p, c, i, a) {
			if ((i % 2) == 0) {
				p.push(c);
			} else {
				p[(i - 1) / 2] += c;
			}
			return p;
		}, []).map(function(num) {
			return parseInt(num, 16);
		}).join(", ") + ")";
		return rgb;
	} else {
		return false;
	}
}

// [r,g,b] to hexcode conversion
function rgbToHex(rgb) {
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

// [r,g,b] to [h,s,l] conversion
function rgbToHsl(rgb){
	rgb = rgb.replace("rgb(", "").replace(")", "").split(",");
    r = parseFloat((rgb[0]/255).toFixed(2)), g = parseFloat((rgb[1]/255).toFixed(2)), b = parseFloat((rgb[2]/255).toFixed(2));
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
        	h += 360;
        }
    }
    return [Math.round(h), (parseFloat(s.toFixed(2)))*100, Math.round(l*100)];
}
// [h,s,l] to [r,g,b] conversion
function hslToRgb(hsl){
	var h = hsl[0]/360, s = hsl[1] / 100, l = hsl[2] / 100;
	var temp_rgb = [], temp1 = 0.0, temp2 = 0.0;
	if (s == 0) {
		var v = l * 255;
		var rgb = hsl.map(function(num) {
			num = v;
			return num;
		});
		return rgb;
 
	} else {
		if (l < 0.5) {
			temp1 = l * (1.0 + s);
		} else {
			temp1 = l + s - l * s;
		}
	}
	temp2 = parseFloat((2 * l - temp1).toFixed(4));

	temp_rgb[0] = parseFloat((h + 0.333).toFixed(4));
	temp_rgb[1] = parseFloat(h.toFixed(4));
	temp_rgb[2] = parseFloat((h - 0.333).toFixed(4));

	var rgb = temp_rgb.map(function(num) {
		if (num < 0) { 
			num += 1;
		} else if (num > 1) {
			num -= 1;
		}
		console.log(num);
		if ((6 * num) < 1) {
			num = temp2 + (temp1 - temp2) * 6 * num;
		} else if ((2 * num) < 1) {
			num = temp1;
		} else if ((3 * num) < 2) {
			num = temp2 + (temp1 - temp2) * (0.666 - num) * 6;
		} else {
			num = temp2;
		}
		num *= 255;
		return (Math.round(num));
	});
	return rgb;
}

// change foreground components color with bg
function changeColorWithBg(rgb) {
	body.style.backgroundColor = rgb;

	arr = rgb.replace("rgb(", "").replace(")", "").split(",");
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
	var rgb = hexToRgb(hexInput.value)
	if (rgb) {
		var hsl = rgbToHsl(rgb);
		hslInput.value = "hsl(" + hsl[0] + ", " + hsl[1] + ", " + [hsl[2]] + ")";

		rgbInput.value = rgb;
		changeColorWithBg(rgb);
	} else {
		rgbInput.value = "";
		hslInput.value = "";
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
			hslInput.value = "hsl(" + hsl[0] + "," + hsl[1] + "," + [hsl[2]] + ")";
		} else {
			hexInput.value = "";
			hslInput.value = "";
		}
	}
}

hslInput.onkeyup = function() {
	if (hslInput.value == "") {
		hexInput.value = "";
		rgbInput.value = "";
	} else {
		if (/^(hsl\(\s*([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-9][0-9]|3[0-5][0-9]|360),\s*([0-9]|[1-9][0-9]|100),\s*([0-9]|[1-9][0-9]|100)\s*\))$/.test(hslInput.value)) {
			var hsl = hslInput.value.replace("hsl(", "").replace(")", "").split(",");
			console.log(hsl);
			var rgb = hslToRgb(hsl);
			var hex = rgbToHex(rgb);
			rgbInput.value = "rgb(" + rgb.join(", ") + ")";
			hexInput.value = ("#").concat(hex.toUpperCase());
			body.style.backgroundColor = rgbInput.value;
			changeColorWithBg(rgb);
		} else {
			hexInput.value = "";
			rgbInput.value = "";
		}
	}
}
