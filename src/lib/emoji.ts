const animalEmojis = [
	"🐶",
	"🐱",
	"🐭",
	"🐹",
	"🐰",
	"🦊",
	"🐻",
	"🐼",
	"🐨",
	"🐯",
	"🦁",
	"🐮",
	"🐷",
	"🐸",
	"🐵",
	"🐔",
	"🐧",
	"🐦",
	"🐤",
	"🐺",
	"🐗",
	"🐴",
	"🦄",
	"🐝",
	"🐛",
	"🦋",
	"🐌",
	"🐞",
	"🐜",
	"🦗",
];

export function getAnimalEmojiForUser(userId: string): string {
	let hash = 0;
	for (let i = 0; i < userId.length; i++) {
		const char = userId.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash |= 0;
	}
	const index = Math.abs(hash) % animalEmojis.length;
	return animalEmojis[index];
}
