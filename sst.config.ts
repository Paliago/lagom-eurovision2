/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
	app(input) {
		return {
			name: "lagom-eurovision2",
			removal: input?.stage === "production" ? "retain" : "remove",
			protect: ["production"].includes(input?.stage),
			home: "aws",
			region: "eu-north-1",
		};
	},
	async run() {
		const convexUrl = new sst.Secret("ConvexUrl");

		new sst.aws.StaticSite("Web", {
			build: {
				command: "bun run build",
				output: "dist",
			},
			environment: {
				VITE_CONVEX_URL: convexUrl.value,
			},
			domain: "lagomeurovision.com",
		});
	},
});
