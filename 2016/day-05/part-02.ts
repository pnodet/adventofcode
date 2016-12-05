import { crypto } from "https://deno.land/std@0.204.0/crypto/mod.ts";

const getHash = (text: string): string => {
	const digestBuffer = crypto.subtle.digestSync(
		"MD5",
		new TextEncoder().encode(text)
	);

	return Array.from(new Uint8Array(digestBuffer))
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");
};

const getPassword = (doorID: string) => {
	const password = Array(8).fill(null);
	let found = 0;
	let index = 0;

	while (found < 8) {
		const hash = getHash(`${doorID}${index}`);
		if (hash.startsWith("00000")) {
			const position = parseInt(hash[5], 16);

			if (position < 8 && password[position] === null) {
				password[position] = hash[6];
				found++;
				console.log(`Decrypting: ${password.map((ch) => ch ?? "_").join("")}`);
			}
		}
		index++;
	}

	return password.join("");
};

const doorID = "abbhdwsy";
console.log(getPassword(doorID));
