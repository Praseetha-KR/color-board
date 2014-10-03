describe("Check var a", function() {
	var a;
	it("should be true", function() {
		a = true;
		expect(a).toBe(true);
	});
});
describe("Checking existance of function hexToRgb", function() {
	it("should be defined before calling", function() {
		expect(hexToRgb).toBeDefined();
	});
});