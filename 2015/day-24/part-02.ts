const memo = new Map<string, number[][]>();

const iterateSubseqSum = function* (
	weights: number[],
	remaining: number
): Generator<number[], void, undefined> {
	const key = `${weights.join(",")}:${remaining}`;
	if (memo.has(key)) {
		yield* memo.get(key)!;
		return;
	}
	const results: number[][] = [];

	if (remaining === 0) yield [];
	else if (remaining < 0) return;
	else {
		if (weights.length === 0) return;

		const [hd, ...tl] = weights;
		for (const subseq of iterateSubseqSum(tl, remaining)) {
			yield subseq;
			results.push(subseq);
		}
		for (const subseq of iterateSubseqSum(tl, remaining - hd)) {
			const newSubseq = [hd, ...subseq];
			yield newSubseq;
			results.push(newSubseq);
		}
	}

	memo.set(key, results);
};

const idealFirstQE = (
	weights: number[],
	groups: number
): number | undefined => {
	const totalWeight = weights.reduce((acc, w) => acc + w, 0);
	const groupWeight = totalWeight / groups;

	if (groupWeight % 1 !== 0) return undefined;

	let minQE: number | undefined = undefined;
	const sortedWeights = [...weights].sort((a, b) => a - b);

	for (const seq of iterateSubseqSum(sortedWeights, groupWeight)) {
		const seqQE = seq.reduce((acc, w) => acc * w, 1);
		if (minQE === undefined || seqQE < minQE) {
			minQE = seqQE;
		}
	}
	return minQE;
};

const file = await Deno.readTextFile("./input.txt");

const parseWeights = (input: string): number[] =>
	input
		.split("\n")
		.map((line) => parseInt(line, 10))
		.filter(Number.isFinite);

const parsedWeights = parseWeights(file.trim());
console.log("Output:", idealFirstQE(parsedWeights, 4));
