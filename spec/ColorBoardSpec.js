describe("hexToRgb", function() {
	it("should correctly convert arbitrary HEX color to RGB", function() {
		expect(hexToRgb("123456")).toEqual("rgb(18, 52, 86)");
		expect(hexToRgb("ABCDEF")).toEqual("rgb(171, 205, 239)");
	});
	it("should convert values starting with #", function() {
		expect(hexToRgb("#123ABC")).toEqual("rgb(18, 58, 188)");
	});
	it("should convert values without # in the beginning", function() {
		expect(hexToRgb("123ABC")).toEqual("rgb(18, 58, 188)");
	});
	it("should convert values containing white spaces in the beginning or ending", function() {
		expect(hexToRgb(" 123ABC")).toEqual("rgb(18, 58, 188)");
		expect(hexToRgb("123ABC ")).toEqual("rgb(18, 58, 188)");
		expect(hexToRgb(" 123ABC ")).toEqual("rgb(18, 58, 188)");
		expect(hexToRgb(" #123ABC")).toEqual("rgb(18, 58, 188)");
		expect(hexToRgb("#123ABC ")).toEqual("rgb(18, 58, 188)");
		expect(hexToRgb(" #123ABC ")).toEqual("rgb(18, 58, 188)");
		expect(hexToRgb("    #123ABC")).toEqual("rgb(18, 58, 188)");
		expect(hexToRgb(" 123ABC   ")).toEqual("rgb(18, 58, 188)");
	});
	it("shouldn't convert values containing white spaces in the middle", function() {
		expect(hexToRgb("123 ABC")).toBe(false);
		expect(hexToRgb("#11FEA B")).toBe(false);
	});
	it("shouldn't convert values containing non-hexadecimal characters", function() {
		expect(hexToRgb("ACFHEX")).toBe(false);
		expect(hexToRgb("00000@")).toBe(false);
	});
});