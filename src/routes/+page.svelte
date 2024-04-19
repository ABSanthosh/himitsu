<script lang="ts">
	import Options, { type IOptions } from '$lib/OptionStore';
	import copyToClipboard from '$lib/CopyToClipboard';
	import { customAlphabet } from 'nanoid';

	const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const lowercase = 'abcdefghijklmnopqrstuvwxyz';
	const digits = '0123456789';
	const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

	let strength: {
		strength: string;
		time: string;
		primary: string;
		indicators: number[];
	};

	$: strengthIndicator = (length: number) => {
		if (length >= 5 && length <= 12) {
			return {
				strength: 'Very Weak',
				time: 'Seconds to Minutes',
				primary: '--strength-red',
				indicators: [1, 2, 3]
			};
		} else if (length >= 13 && length <= 20) {
			return {
				strength: 'Weak',
				time: 'Hours to Days',
				primary: '--strength-orange',
				indicators: [1, 2, 3, 4, 5, 6]
			};
		} else if (length >= 20 && length <= 28) {
			return {
				strength: 'Good',
				time: 'Months to Years',
				primary: '--strength-yellow',
				indicators: [1, 2, 3, 4, 5, 6, 7, 8, 9]
			};
		} else {
			return {
				strength: 'Strong',
				time: 'Decades to Centuries',
				primary: '--strength-green',
				indicators: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
			};
		}
	};

	$: $Options.length, (strength = strengthIndicator($Options.length));

	const nanoid = (length: number, options: IOptions) =>
		customAlphabet(
			`${options.uppercase ? uppercase : ''}${options.lowercase ? lowercase : ''}${options.digits ? digits : ''}${options.symbols ? symbols : ''}`,
			length
		)();

	$: password = nanoid($Options.length, $Options);
</script>

<h2 class="Title">
	Takes {strength.time} to crack
</h2>

<div class="Col--center gap-5 w-100">
	<div class="PasswordBox">
		<code>
			{password}
		</code>
		<span class="PasswordBox__options">
			<button
				class="CrispButton"
				title="Copy Password"
				on:click={async () => await copyToClipboard(password)}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
					<path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
				</svg>
			</button>
			<button
				class="CrispButton"
				title="Refresh Password"
				on:click={() => (password = nanoid($Options.length, $Options))}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /> <path d="M3 3v5h5" />
					<path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" /> <path d="M16 16h5v5" />
				</svg>
			</button>
		</span>
	</div>
	<div class="PasswordBox__progress">
		{#each new Array(12) as _, i}
			<span
				style="background-color: {i < strength.indicators.length ? `var(${strength.primary})` : ''}"
			/>
		{/each}
	</div>
</div>

<label class="CrispLabel gap-10">
	<span>
		Length
		<em>
			({$Options.length})
		</em>
	</span>
	<!-- https://stackoverflow.com/a/57153340/10376131 -->
	<input
		type="range"
		min="10"
		max="32"
		style="
			background: linear-gradient(
				to right, 
				var(--accent) 0%, 
				var(--accent) {(($Options.length - 10) * 100) / 22}%, 
				#fff {(($Options.length - 10) * 100) / 22}%, 
				white 100%
			)"
		class="CrispInput"
		bind:value={$Options.length}
	/>
</label>

<label class="CrispLabel gap-10">
	<span> Password Type </span>
	<select class="CrispSelect w-100" bind:value={$Options.type} disabled>
		<option value="password">Password</option>
		<option value="pin">PIN</option>
	</select>
</label>

<div class="CrispLabel gap-10">
	<span> Parameters </span>
	<div class="Parameter">
		<label
			data-align="center"
			data-direction="row"
			class="Parameter__item CrispLabel gap-10"
			style="
        --primary: {$Options.uppercase ? 'var(--check-orange-primary)' : '#e6e6e5'};
        --secondary: {$Options.uppercase ? 'var(--check-orange-secondary)' : '#e6e6e5'};
      "
		>
			<input class="CrispInput" type="checkbox" bind:checked={$Options.uppercase} />
			<span> Upper Case </span>
		</label>
		<label
			data-align="center"
			data-direction="row"
			class="Parameter__item CrispLabel gap-10"
			style="
        --primary: {$Options.lowercase ? 'var(--check-pink-primary)' : '#e6e6e5'};
        --secondary: {$Options.lowercase ? 'var(--check-pink-secondary)' : '#e6e6e5'};
      "
		>
			<input class="CrispInput" type="checkbox" bind:checked={$Options.lowercase} />
			<span> Lower Case </span>
		</label>
		<label
			data-align="center"
			data-direction="row"
			class="Parameter__item CrispLabel gap-10"
			style="
        --primary: {$Options.digits ? 'var(--check-blue-primary)' : '#e6e6e5'};
        --secondary: {$Options.digits ? 'var(--check-blue-secondary)' : '#e6e6e5'};
      "
		>
			<input class="CrispInput" type="checkbox" bind:checked={$Options.digits} />
			<span> Numbers </span>
		</label>
		<label
			data-align="center"
			data-direction="row"
			class="Parameter__item CrispLabel gap-10"
			style="
        --primary: {$Options.symbols ? 'var(--check-green-primary)' : '#e6e6e5'};
        --secondary: {$Options.symbols ? 'var(--check-green-secondary)' : '#e6e6e5'};
      "
		>
			<input class="CrispInput" type="checkbox" bind:checked={$Options.symbols} />
			<span> Special Characters </span>
		</label>
	</div>
</div>

<style lang="scss">
	.Title {
		margin: 35px 0;
		color: #303030;
	}
	.PasswordBox {
		padding: 12px;
		// margin-top: 65px;
		@include box(100%, 150px);
		@include make-flex($just: space-between);

		border-radius: 14px;
		background-color: #fafaf9;
		border: 1px solid #e6e6e5;

		& > code {
			font-weight: 500;
			// @include make-flex();
			@include box(100%, 50%);
			text-align: center;
			font-family: 'IBM Plex Mono', monospace;

			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;

			color: #303030;
			font-size: 1.5rem;
			padding: 15px;
		}

		&__options {
			@include make-flex($dir: row, $just: flex-end);
			@include box(100%, auto);
			gap: 8px;

			& > .CrispButton {
				--crp-button-width: 32px;
				--crp-button-height: 32px;
				--crp-button-padding-top: 7px;
				--crp-button-padding-left: 7px;
				--crp-button-padding-right: 7px;
				--crp-button-padding-bottom: 7px;

				& > svg {
					stroke: #a2a2a2;
				}

				&:hover {
					& > svg {
						stroke: #303030;
					}
				}
			}
		}

		&__progress {
			padding: 4px 13px;
			@include box(100%, auto);

			display: grid;
			grid-template-columns: repeat(12, 1fr);
			gap: 5px;

			& > span {
				border-radius: 5px;
				@include make-flex();
				@include box(100%, 6px);
				background-color: #e6e6e5;

				transition: background-color 0.3s;
			}
		}
	}

	.Parameter {
		@include box(100%, auto);
		@include make-flex($dir: row, $just: space-between);
		flex-wrap: wrap;
		gap: 10px;
		&__item {
			width: auto;
			flex-grow: 1;
			cursor: pointer;
			padding: 10px;
			border-radius: 7px;

			border: 1px solid var(--primary);
			background-color: var(--secondary);

			& > input {
				--crp-checkbox-checked-background-color: var(--primary);
				--crp-input-border: none;
			}
			span {
				color: #303030;
			}
		}
	}
</style>
