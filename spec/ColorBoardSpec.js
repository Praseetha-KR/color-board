describe("Function definition", function() {
	it("is valid for hexToRgb", function() {
		expect(hexToRgb).toBeDefined();
	});
	it("is valid for rgbToHex", function() {
		expect(rgbToHex).toBeDefined();
	});
	it("is valid for rgbToHsl", function() {
		expect(rgbToHsl).toBeDefined();
	});
	it("is valid for hslToRgb", function() {
		expect(hslToRgb).toBeDefined();
	});
	it("is valid for changeColorWithBg", function() {
		expect(changeColorWithBg).toBeDefined();
	});
});

var result, pattern, yiq;

function isRgb_valid(rgbval) {
	pattern = /^(rgb\(\s*([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]),\s*([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]),\s*([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\s*\))$/;
	return pattern.test(rgbval);
}
describe("rgb text input", function() {
	it("is having correct syntax rgb([0-255],[0-255],[0-255])", function() {
		result = isRgb_valid("rgb(0,10,255)");
		expect(result).toBe(true);
	});
	it("is rejecting incorrect syntax", function() {
		var result = isRgb_valid("0,10,255");
		expect(result).not.toBe(true);
	});
});
function isHex_valid(hexval) {
	pattern = /^#?([0-9]|[A-F]){6}$/;
	return pattern.test(hexval);
}
describe("hex text input", function() {
	it("is passing value starting with #", function() {
		result = isHex_valid("#ABC123");
		expect(result).toBe(true);
	});
	it("is passing value without starting #", function() {
		result = isHex_valid("ABC123");
		expect(result).toBe(true);
	});
	it("is not accepting input of length other than 6 (excluding #)", function() {
		result = isHex_valid("12345");
		expect(result).not.toBe(true);
		result = isHex_valid("1234567");
		expect(result).not.toBe(true);
	});
	it("is not accepting characters which aren't in hexadecimal base", function() {
		result = isHex_valid("456EFG");
		expect(result).not.toBe(true);
	});
});
function isHsl_valid(hslval) {
	pattern = /^(hsl\(\s*([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-9][0-9]|3[0-5][0-9]|360),\s*([0-9]|[1-9][0-9]|100),\s*([0-9]|[1-9][0-9]|100)\s*\))$/;
	return pattern.test(hslval);
}
describe("hsl text input", function() {
	it("is having correct syntax hsl([0-360],[0-100],[0-100])", function() {
		result = isHsl_valid("hsl(180,50,100)");
		expect(result).toBe(true);
	});
	it("is rejecting incorrect syntax", function() {
		result = isHsl_valid("180,50,100");
		expect(result).not.toBe(true);
	});
});
function isYiqInput_valid(rgbval) {
	pattern = /^(\[\s*([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]),\s*([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]),\s*([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\s*\])$/;
	return pattern.test(rgbval);
}
function yiq_calc(arr) {
	var yiq = ((arr[0] * 299) + (arr[1] * 587) + (arr[2] * 114))/1000;
	return yiq;
}
describe("yiq", function() {
	it("is passing with input of 3 element list; where list values range [0-255]", function() {
		result = isYiqInput_valid("[0,50,255]");
		expect(result).toBe(true);
	});
	it("is rejecting input list elements with values out of bound [0-255]", function() {
		result = isYiqInput_valid("[360,50,100]");
		expect(result).not.toBe(true);
	});
	it("is less than 255", function() {
		yiq = yiq_calc([1, 10, 100]);
		expect(yiq).toBeLessThan(255);
	});
});
