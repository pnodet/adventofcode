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
	let password = "";
	let index = 0;

	while (password.length < 8) {
		const hash = getHash(`${doorID}${index}`);
		if (hash.startsWith("00000")) password += hash[5];
		index++;
	}

	return password;
};

const doorID = "abbhdwsy";
console.log(getPassword(doorID));
