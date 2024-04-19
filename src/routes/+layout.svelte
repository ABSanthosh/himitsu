<script lang="ts">
	import Header from '$components/Header.svelte';
</script>

<!-- <main class="Main"> -->
<Header />
<slot />

<!-- </main> -->

<style lang="scss" global>
	@import '../styles/global.scss';

	.Main {
	}
</style>
