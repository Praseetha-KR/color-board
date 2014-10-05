describe("Function definitions check", function() {
	it("hexToRgb is defined", function() {
		expect(hexToRgb).toBeDefined();
	});
	it("rgbToHex is defined", function() {
		expect(rgbToHex).toBeDefined();
	});
	it("rgbToHsl is defined", function() {
		expect(rgbToHsl).toBeDefined();
	});
	it("hslToRgb is defined", function() {
		expect(hslToRgb).toBeDefined();
	});
	it("changeColorWithBg is defined", function() {
		expect(changeColorWithBg).toBeDefined();
	});
});
describe("Empty input fields check", function() {
	it("hexInput value is null", function() {
		expect(hexInput).toBeNull();
	});
	it("rgbInput value is null", function() {
		expect(rgbInput).toBeNull();
	});
	it("hslInput value is null", function() {
		expect(hslInput).toBeNull();
	});
});
function isRgb_valid(rgbval) {
	var pattern = /^(rgb\(\s*([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]),\s*([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]),\s*([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\s*\))$/;
	return pattern.test(rgbval);
}
describe("input syntax test for rgb", function() {
	it("should validate rgb(0,10,255)", function() {
		var result = isRgb_valid("rgb(0,10,255)");
		expect(result).toBe(true);
	});
	it("should not validate 0,10,255", function() {
		var result = isRgb_valid("0,10,255");
		expect(result).not.toBe(true);
	});
});
function isHex_valid(hexval) {
	var pattern = /^#?([0-9]|[A-F]){6}$/;
	return pattern.test(hexval);
}
describe("input syntax test for hex", function() {
	it("should validate #ABC123", function() {
		var result = isHex_valid("#ABC123");
		expect(result).toBe(true);
	});
	it("should validate ABC123", function() {
		var result = isHex_valid("ABC123");
		expect(result).toBe(true);
	});
	it("should not validate 12345", function() {
		var result = isHex_valid("12345");
		expect(result).not.toBe(true);
	});
	it("should not validate 1234567", function() {
		var result = isHex_valid("1234567");
		expect(result).not.toBe(true);
	});
	it("should not validate 456EFG", function() {
		var result = isHex_valid("456EFG");
		expect(result).not.toBe(true);
	});
});
function isHsl_valid(hslval) {
	var pattern = /^(hsl\(\s*([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-9][0-9]|3[0-5][0-9]|360),\s*([0-9]|[1-9][0-9]|100),\s*([0-9]|[1-9][0-9]|100)\s*\))$/;
	return pattern.test(hslval);
}
describe("input syntax test for hsl", function() {
	it("should validate hsl(180,50,100)", function() {
		var result = isHsl_valid("hsl(180,50,100)");
		expect(result).toBe(true);
	});
	it("should not validate 180,50,100", function() {
		var result = isHsl_valid("180,50,100");
		expect(result).not.toBe(true);
	});
});
