<header class="Header">
	<img src="assets/Logo.svg" alt="Logo" />
	<h2>Himitsu</h2>
</header>

<style lang="scss">
	.Header {
		@include make-flex($dir: row, $just: flex-start);
		@include box(100%, 46px);
		padding: 12px;
		border-radius: 12px;
		background-color: #303030;
		border: 1px solid #505050;
		gap: 8px;
		margin-top: 16px;
		box-shadow:
			rgba(0, 0, 0, 0) 0px 0px 0px 0px,
			rgba(0, 0, 0, 0) 0px 0px 0px 0px,
			rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
			rgba(0, 0, 0, 0.1) 0px 8px 10px -6px;

		& > img {
			@include box(auto);
		}

		& > h2 {
			font-weight: 600;
			font-style: normal;
			color: #fff;
			font-family: 'IBM Plex Sans Condensed', sans-serif;
		}
	}
</style>
