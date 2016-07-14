import {a, b} from "./import-test";

class SomeClass {
	private x;
	private y;

	public constructor(x: number = 10, y: number = 5) {
		this.x = x;
		this.y = y;
	}

	public sum() {
		return this.x + this.y;
	}

}

var classTest = new SomeClass(a, b);