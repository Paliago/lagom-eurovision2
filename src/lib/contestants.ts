// Define and export the Contestant type
export interface Contestant {
	id: string;
	name: string;
	song: string;
	country: string;
	flagUrl: string;
}

const countryToFlagFile: Record<string, string> = {
	Albania: "Flag_of_Albania.svg",
	Armenia: "Flag_of_Armenia.svg",
	Australia: "Flag_of_Australia_(converted).svg",
	Austria: "Flag_of_Austria.svg",
	Azerbaijan: "Flag_of_Azerbaijan.svg",
	Belgium: "Flag_of_Belgium.svg",
	Croatia: "Flag_of_Croatia.svg",
	Cyprus: "Flag_of_Cyprus.svg",
	Czechia: "Flag_of_the_Czech_Republic.svg",
	Denmark: "Flag_of_Denmark.svg",
	Estonia: "Flag_of_Estonia.svg",
	Finland: "Flag_of_Finland.svg",
	France: "Flag_of_France.svg",
	Georgia: "Flag of Georgia.svg",
	Germany: "Flag_of_Germany.svg",
	Greece: "Flag_of_Greece.svg",
	Iceland: "Flag_of_Iceland.svg",
	Ireland: "Flag_of_Ireland.svg",
	Israel: "Flag_of_Israel.svg",
	Italy: "Flag_of_Italy.svg",
	Latvia: "Flag_of_Latvia.svg",
	Lithuania: "Flag_of_Lithuania.svg",
	Luxembourg: "Flag_of_Luxembourg.svg",
	Malta: "Flag of Malta.svg",
	Montenegro: "Flag_of_Montenegro.svg",
	Netherlands: "Flag_of_the_Netherlands.svg",
	Norway: "Flag of Norway.svg",
	Poland: "Flag_of_Poland.svg",
	Portugal: "Flag_of_Portugal.svg",
	"San Marino": "Flag_of_San_Marino.svg",
	Serbia: "Flag_of_Serbia.svg",
	Slovenia: "Flag_of_Slovenia.svg",
	Spain: "Flag_of_Spain.svg",
	Sweden: "Flag_of_Sweden.svg",
	Switzerland: "Flag_of_Switzerland_(Pantone).svg",
	Ukraine: "Flag_of_Ukraine.svg",
	"United Kingdom": "Flag_of_the_United_Kingdom_(1-2).svg",
};

const getFlagUrl = (country: string): string => {
	const fileName = countryToFlagFile[country];
	if (fileName === undefined) {
		console.warn(`Mapping not found for country: ${country}`);
		return "/flags/placeholder.svg"; // Default placeholder if country not in map
	}
	if (!fileName) {
		// Handles cases like Portugal where the flag is explicitly missing
		return "/flags/placeholder.svg"; // Or an empty string if preferred: ""
	}
	return `/flags/${encodeURIComponent(fileName)}`;
};

export const contestants: Contestant[] = [
	{
		id: "esc2025_1",
		name: "Shkodra Elektronike",
		song: "Zjerm",
		country: "Albania",
		flagUrl: getFlagUrl("Albania"),
	},
	{
		id: "esc2025_2",
		name: "Parg",
		song: "Survivor",
		country: "Armenia",
		flagUrl: getFlagUrl("Armenia"),
	},
	{
		id: "esc2025_3",
		name: "Go-Jo",
		song: "Milkshake Man",
		country: "Australia",
		flagUrl: getFlagUrl("Australia"),
	},
	{
		id: "esc2025_4",
		name: "JJ",
		song: "Wasted Love",
		country: "Austria",
		flagUrl: getFlagUrl("Austria"),
	},
	{
		id: "esc2025_5",
		name: "Mamagama",
		song: "Run with U",
		country: "Azerbaijan",
		flagUrl: getFlagUrl("Azerbaijan"),
	},
	{
		id: "esc2025_6",
		name: "Red Sebastian",
		song: "Strobe Lights",
		country: "Belgium",
		flagUrl: getFlagUrl("Belgium"),
	},
	{
		id: "esc2025_7",
		name: "Marko Bošnjak",
		song: "Poison Cake",
		country: "Croatia",
		flagUrl: getFlagUrl("Croatia"),
	},
	{
		id: "esc2025_8",
		name: "Theo Evan",
		song: "Shh",
		country: "Cyprus",
		flagUrl: getFlagUrl("Cyprus"),
	},
	{
		id: "esc2025_9",
		name: "Adonxs",
		song: "Kiss Kiss Goodbye",
		country: "Czechia",
		flagUrl: getFlagUrl("Czechia"),
	},
	{
		id: "esc2025_10",
		name: "Sissal",
		song: "Hallucination",
		country: "Denmark",
		flagUrl: getFlagUrl("Denmark"),
	},
	{
		id: "esc2025_11",
		name: "Tommy Cash",
		song: "Espresso Macchiato",
		country: "Estonia",
		flagUrl: getFlagUrl("Estonia"),
	},
	{
		id: "esc2025_12",
		name: "Erika Vikman",
		song: "Ich komme",
		country: "Finland",
		flagUrl: getFlagUrl("Finland"),
	},
	{
		id: "esc2025_13",
		name: "Louane",
		song: "Maman",
		country: "France",
		flagUrl: getFlagUrl("France"),
	},
	{
		id: "esc2025_14",
		name: "Mariam Shengelia",
		song: "Freedom",
		country: "Georgia",
		flagUrl: getFlagUrl("Georgia"),
	},
	{
		id: "esc2025_15",
		name: "Abor & Tynna",
		song: "Baller",
		country: "Germany",
		flagUrl: getFlagUrl("Germany"),
	},
	{
		id: "esc2025_16",
		name: "Klavdia",
		song: "Asteromata",
		country: "Greece",
		flagUrl: getFlagUrl("Greece"),
	},
	{
		id: "esc2025_17",
		name: "Væb",
		song: "Róa",
		country: "Iceland",
		flagUrl: getFlagUrl("Iceland"),
	},
	{
		id: "esc2025_18",
		name: "Emmy",
		song: "Laika Party",
		country: "Ireland",
		flagUrl: getFlagUrl("Ireland"),
	},
	{
		id: "esc2025_19",
		name: "Yuval Raphael",
		song: "New Day Will Rise",
		country: "Israel",
		flagUrl: getFlagUrl("Israel"),
	},
	{
		id: "esc2025_20",
		name: "Lucio Corsi",
		song: "Volevo essere un duro",
		country: "Italy",
		flagUrl: getFlagUrl("Italy"),
	},
	{
		id: "esc2025_21",
		name: "Tautumeitas",
		song: "Bur man laimi",
		country: "Latvia",
		flagUrl: getFlagUrl("Latvia"),
	},
	{
		id: "esc2025_22",
		name: "Katarsis",
		song: "Tavo akys",
		country: "Lithuania",
		flagUrl: getFlagUrl("Lithuania"),
	},
	{
		id: "esc2025_23",
		name: "Laura Thorn",
		song: "La poupée monte le son",
		country: "Luxembourg",
		flagUrl: getFlagUrl("Luxembourg"),
	},
	{
		id: "esc2025_24",
		name: "Miriana Conte",
		song: "Serving",
		country: "Malta",
		flagUrl: getFlagUrl("Malta"),
	},
	{
		id: "esc2025_25",
		name: "Nina Žižić",
		song: "Dobrodošli",
		country: "Montenegro",
		flagUrl: getFlagUrl("Montenegro"),
	},
	{
		id: "esc2025_26",
		name: "Claude",
		song: "C'est la vie",
		country: "Netherlands",
		flagUrl: getFlagUrl("Netherlands"),
	},
	{
		id: "esc2025_27",
		name: "Kyle Alessandro",
		song: "Lighter",
		country: "Norway",
		flagUrl: getFlagUrl("Norway"),
	},
	{
		id: "esc2025_28",
		name: "Justyna Steczkowska",
		song: "Gaja",
		country: "Poland",
		flagUrl: getFlagUrl("Poland"),
	},
	{
		id: "esc2025_29",
		name: "Napa",
		song: "Deslocado",
		country: "Portugal",
		flagUrl: getFlagUrl("Portugal"),
	},
	{
		id: "esc2025_30",
		name: "Gabry Ponte",
		song: "Tutta l'Italia",
		country: "San Marino",
		flagUrl: getFlagUrl("San Marino"),
	},
	{
		id: "esc2025_31",
		name: "Princ",
		song: "Mila",
		country: "Serbia",
		flagUrl: getFlagUrl("Serbia"),
	},
	{
		id: "esc2025_32",
		name: "Klemen",
		song: "How Much Time Do We Have Left",
		country: "Slovenia",
		flagUrl: getFlagUrl("Slovenia"),
	},
	{
		id: "esc2025_33",
		name: "Melody",
		song: "Esa diva",
		country: "Spain",
		flagUrl: getFlagUrl("Spain"),
	},
	{
		id: "esc2025_34",
		name: "KAJ",
		song: "Bara bada bastu",
		country: "Sweden",
		flagUrl: getFlagUrl("Sweden"),
	},
	{
		id: "esc2025_35",
		name: "Zoë Më",
		song: "Voyage",
		country: "Switzerland",
		flagUrl: getFlagUrl("Switzerland"),
	},
	{
		id: "esc2025_36",
		name: "Ziferblat",
		song: "Bird of Pray",
		country: "Ukraine",
		flagUrl: getFlagUrl("Ukraine"),
	},
	{
		id: "esc2025_37",
		name: "Remember Monday",
		song: "What the Hell Just Happened?",
		country: "United Kingdom",
		flagUrl: getFlagUrl("United Kingdom"),
	},
];

export const getContestantById = (id: string) =>
	contestants.find((c) => c.id === id);

export const getNextContestantId = (currentId: string): string | null => {
	const currentIndex = contestants.findIndex((c) => c.id === currentId);
	if (currentIndex === -1) {
		return null; // Should not happen if currentId is valid
	}
	if (currentIndex === contestants.length - 1) {
		return contestants[0].id; // Wrap to the first contestant
	}
	return contestants[currentIndex + 1].id;
};

export const getPreviousContestantId = (currentId: string): string | null => {
	const currentIndex = contestants.findIndex((c) => c.id === currentId);
	if (currentIndex === -1) {
		return null; // Should not happen if currentId is valid
	}
	if (currentIndex === 0) {
		return contestants[contestants.length - 1].id; // Wrap to the last contestant
	}
	return contestants[currentIndex - 1].id;
};
