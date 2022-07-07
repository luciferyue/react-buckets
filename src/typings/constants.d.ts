declare const API_URL: string;
declare const APP_ENV: string;
declare const PASSPORT_URL: string;
declare const GATBridge: any;
declare const BASE_PATH: any;

declare module "*.jpg" {
	const fileName: string;
	export = fileName;
}

declare module "*.png" {
	const fileName: string;
	export = fileName;
}
