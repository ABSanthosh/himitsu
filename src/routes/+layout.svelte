<script lang="ts">
	import Header from '$components/Header.svelte';
	import { ToastStore } from '$lib/ToastStore';
	import Toast from '$components/Toast.svelte';
</script>

<Header />
<slot />

{#if $ToastStore}
	{#each $ToastStore as toast (toast.id)}
		<Toast {...toast} />
	{/each}
{/if}

<style lang="scss" global>
	@import '../styles/global.scss';
</style>
