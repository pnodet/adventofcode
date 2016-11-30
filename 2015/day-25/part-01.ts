type Pos = {
	x: number;
	y: number;
};

const input = {
	x: 3019,
	y: 3010,
};

const initialCode = 20151125;
const base = 252533n;
const modulo = 33554393n;

const posIndex = (pos: Pos): number => {
	const diagonal = pos.x + pos.y - 2;
	const triangleSum = Array.from({ length: diagonal }, (_, i) => i + 1).reduce(
		(a, b) => a + b,
		0
	);
	const diagonalOffset = pos.x;
	return triangleSum + diagonalOffset;
};

const modPow = (base: bigint, exponent: bigint, modulo: bigint): bigint => {
	let result = 1n;
	base = base % modulo;
	while (exponent > 0n) {
		if (exponent % 2n === 1n) result = (result * base) % modulo;
		exponent = exponent >> 1n;
		base = (base * base) % modulo;
	}
	return result;
};

const getCode = (pos: Pos): bigint =>
	(BigInt(initialCode) * modPow(base, BigInt(posIndex(pos) - 1), modulo)) %
	modulo;

console.log("Output:", getCode(input).toString());
