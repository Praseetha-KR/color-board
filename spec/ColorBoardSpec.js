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
