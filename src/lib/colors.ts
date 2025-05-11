const tailwindColors = [
	"bg-red-400",
	"bg-yellow-400",
	"bg-green-400",
	"bg-teal-400",
	"bg-blue-400",
	"bg-indigo-400",
	"bg-purple-400",
	"bg-pink-400",
	"bg-orange-400",
	"bg-lime-400",
	"bg-emerald-400",
	"bg-cyan-400",
	"bg-sky-400",
	"bg-violet-400",
	"bg-fuchsia-400",
	"bg-rose-400",
];

export const getBackgroundColorForRater = (raterId: string): string => {
	let hash = 0;
	for (let i = 0; i < raterId.length; i++) {
		const char = raterId.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash |= 0; // Convert to 32bit integer
	}
	const index = Math.abs(hash) % tailwindColors.length;
	return tailwindColors[index];
};
