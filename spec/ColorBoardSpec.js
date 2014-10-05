describe("Checking existance of function hexToRgb", function() {
	it("Is defined before calling", function() {
		expect(hexToRgb).toBeDefined();
	});
});
describe("Checking initial value of hexinput", function() {
	it("Value is null", function() {
		expect(hexInput).toBeNull();
	});
});
