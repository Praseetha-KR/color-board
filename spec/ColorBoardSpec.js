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
	it("should convert values insensitive to case", function() {
		expect(hexToRgb("abcdef")).toEqual("rgb(171, 205, 239)");
		expect(hexToRgb("ABCDEF")).toEqual("rgb(171, 205, 239)");
		expect(hexToRgb("AbCdEf")).toEqual("rgb(171, 205, 239)");
	});
});
describe("rgbToHex", function() {
	it("should correctly convert arbitrary RGB color to HEX", function() {
		expect(rgbToHex("rgb(255,0,100)")).toEqual("#FF0064");
		expect(rgbToHex("rgb(123,123,123)")).toEqual("#7B7B7B");
	});
	it("should convert values in the form rgb(r,g,b)", function() {
		expect(rgbToHex("rgb(100,0,100)")).toEqual("#640064");
	});
	it("should convert values in the form RGB(r,g,b)", function() {
		expect(rgbToHex("RGB(233,12,45)")).toEqual("#E90C2D");
	});
	it("should convert values in the form r,g,b", function() {
		expect(rgbToHex("12,34,56")).toEqual("#0C2238");
	});
	it("should be insensitive to white spaces for separation of elements", function() {
		expect(rgbToHex("rgb(1,10,100)")).toEqual("#010A64");
		expect(rgbToHex("rgb(1, 10, 100)")).toEqual("#010A64");
		expect(rgbToHex("rgb( 1, 10, 100 )")).toEqual("#010A64");
		expect(rgbToHex("rgb( 1 , 10 , 100 )")).toEqual("#010A64");
		expect(rgbToHex("rgb ( 1, 10, 100 )")).toEqual("#010A64");
		expect(rgbToHex(" rgb( 1,10,100 )")).toEqual("#010A64");
		expect(rgbToHex("  rgb  ( 1,  10,   100 ) ")).toEqual("#010A64");
		expect(rgbToHex(" 1,  10,  100 ")).toEqual("#010A64");
	});
	it("should be sensitive to white spaces appear in between digits in the value", function() {
		expect(rgbToHex("rgb(1,10,10 0)")).toBe(false);
	});
	it("should accept only if values are separated by comma", function() {
		expect(rgbToHex("12 34 56")).toBe(false);
		expect(rgbToHex("rgb( 12 34 56 )")).toBe(false);
		expect(rgbToHex("rgb 12 34 56 ")).toBe(false);
	});
	it("should accept r, g & b values in the range of 0 - 255", function() {
		expect(rgbToHex("rgb(0,0,0)")).toEqual("#000000");
		expect(rgbToHex("rgb(255,255,255)")).toEqual("#FFFFFF");
		expect(rgbToHex("rgb(100,100,256)")).toBe(false);
	});
	it("shouldn't accept negative r, g & b values", function() {
		expect(rgbToHex("rgb(-100,100,100)")).toBe(false);
	});
	it("shouldn't accept non-integer r, g & b values", function() {
		expect(rgbToHex("rgb(A,1,0)")).toBe(false);
		expect(rgbToHex("rgb(1,10.1,0)")).toBe(false);
	});
});
describe("hslToRgb", function() {
	it("should correctly convert arbitrary HSL color to RGB", function() {
		expect(hslToRgb("hsl(360,50,90)")).toEqual("rgb(242, 217, 217)");
	});
	it("should correctly convert grayscale colors", function() {
		expect(hslToRgb("hsl(0,0,40)")).toEqual("rgb(102, 102, 102)");
		expect(hslToRgb("hsl(300,0,40)")).toEqual("rgb(102, 102, 102)");
	});
	it("should correctly convert colors other than grayscale", function() {
		expect(hslToRgb("hsl(270,50,50)")).toEqual("rgb(127, 64, 191)");
	});
	it("should convert values in the form hsl(h,s,l)", function() {
		expect(hslToRgb("hsl(360,50,90)")).toEqual("rgb(242, 217, 217)");
	});
	it("should convert values in the form hsl(h°,s%,l%) or hsl(h deg,s%,l%) or hsl(h degree,s%,l%)", function() {
		expect(hslToRgb("hsl(339°,50%,60%)")).toEqual("rgb(204, 102, 137)");
		expect(hslToRgb("hsl(339,50%,60%)")).toEqual("rgb(204, 102, 137)");
		expect(hslToRgb("hsl(339°,50,60)")).toEqual("rgb(204, 102, 137)");
		expect(hslToRgb("hsl(339deg,50%,60%)")).toEqual("rgb(204, 102, 137)");
		expect(hslToRgb("hsl(339degree,50%,60%)")).toEqual("rgb(204, 102, 137)");
		expect(hslToRgb("hsl(339 °,50 %,60 %)")).toEqual("rgb(204, 102, 137)");
	});

	it("should convert values in the form HSL(h,s,l)", function() {
		expect(hslToRgb("HSL(0,50,20)")).toEqual("rgb(77, 26, 26)");
	});
	it("should convert values in the form h,s,l", function() {
		expect(hslToRgb("0,50,20")).toEqual("rgb(77, 26, 26)");
	});
	it("should be insensitive to white spaces for separation of elements", function() {
		expect(hslToRgb("hsl ( 0, 50, 50 )")).toEqual("rgb(191, 64, 64)");
		expect(hslToRgb(" 0, 50, 50  ")).toEqual("rgb(191, 64, 64)");
	});
	it("should be sensitive to white spaces appear in between digits in the value", function() {
		expect(hslToRgb("0, 50, 5 0")).toBe(false);
	});
	it("should accept only if values are separated by comma", function() {
		expect(hslToRgb("12 34 56")).toBe(false);
		expect(hslToRgb("hsl( 12 34 56 )")).toBe(false);
		expect(hslToRgb("hsl 12 34 56 ")).toBe(false);
	});
	it("should accept h value in the range of 0 - 360 and s & l values in 0 - 100", function() {
		expect(hslToRgb("hsl(0,0,0)")).toEqual("rgb(0, 0, 0)");
		expect(hslToRgb("hsl(360,100,100)")).toEqual("rgb(255, 255, 255)");
		expect(hslToRgb("hsl(380,50,60)")).toBe(false);
		expect(hslToRgb("hsl(320,110,120)")).toBe(false);
	});
	it("shouldn't accept negative h, s & l values", function() {
		expect(hslToRgb("hsl(-20,50,50)")).toBe(false);
	});
	it("shouldn't accept non-integer h, s & l values", function() {
		expect(hslToRgb("hsl(deg,50,50)")).toBe(false);
		expect(hslToRgb("hsl(A°,0,50)")).toBe(false);
		expect(hslToRgb("hsl(10°,0,5B)")).toBe(false);
	});
});

describe("rgbToHsl", function() {
	it("should correctly convert arbitrary RGB color to HSL", function() {
		expect(rgbToHsl("rgb(255,0,100)")).toEqual("hsl(337,100,50)");
		expect(rgbToHsl("rgb(123,123,123)")).toEqual("hsl(0,0,48)");
	});
	it("should convert values in the form rgb(r,g,b), RGB(r,g,b) and r,g,b", function() {
		expect(rgbToHsl("rgb(100,0,100)")).toEqual("hsl(300,100,20)");
		expect(rgbToHsl("RGB(100,0,100)")).toEqual("hsl(300,100,20)");
		expect(rgbToHsl("100,0,100")).toEqual("hsl(300,100,20)");
	});
	it("should be insensitive to white spaces for separation of elements", function() {
		expect(rgbToHsl("  rgb  ( 1,  10,   100 ) ")).toEqual("hsl(234,100,20)");
		expect(rgbToHsl(" 1,  10,  100 ")).toEqual("hsl(234,100,20)");
	});
	it("should be sensitive to white spaces appear in between digits in the value", function() {
		expect(rgbToHsl("rgb(1,10,10 0)")).toBe(false);
	});
	it("should accept only if values are separated by comma", function() {
		expect(rgbToHsl("12 34 56")).toBe(false);
		expect(rgbToHsl("rgb( 12 34 56 )")).toBe(false);
		expect(rgbToHsl("rgb 12 34 56 ")).toBe(false);
	});
	it("should accept r, g & b values in the range of 0 - 255", function() {
		expect(rgbToHsl("rgb(0,0,0)")).toEqual("hsl(0,0,0)");
		expect(rgbToHsl("rgb(255,255,255)")).toEqual("hsl(0,0,100)");
		expect(rgbToHsl("rgb(100,100,256)")).toBe(false);
	});
	it("shouldn't accept negative r, g & b values", function() {
		expect(rgbToHsl("rgb(-100,100,100)")).toBe(false);
	});
	it("shouldn't accept non-integer r, g & b values", function() {
		expect(rgbToHsl("rgb(A,1,0)")).toBe(false);
		expect(rgbToHsl("rgb(1,10.1,0)")).toBe(false);
	});
});
