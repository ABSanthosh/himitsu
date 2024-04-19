import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export interface IOptions {
	length: number;
	lowercase: boolean;
	uppercase: boolean;
	digits: boolean;
	symbols: boolean;
	type: 'password' | 'pin';
}

const defaultValue: IOptions = {
	length: 16,
	lowercase: true,
	uppercase: true,
	digits: true,
	symbols: true,
	type: 'password'
};
let initialValue = defaultValue;

if (browser && window.localStorage.getItem('options')) {
	initialValue = JSON.parse(window.localStorage.getItem('options')!);
}

const Options = writable<IOptions>(initialValue);
Options.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('options', JSON.stringify(value));
	}
});

export default Options;
