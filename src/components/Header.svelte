<header class="Header">
	<span class="Header__left">
		<img src="assets/Logo.svg" alt="Logo" />
		<h2>Himitsu</h2>
	</span>
	<span class="Header__right">
		<a href="https://github.com/ABSanthosh/himitsu">
			<img src="/assets/gh.png" alt="GitHub" />
		</a>
	</span>
</header>

<style lang="scss">
	.Header {
		@include make-flex($dir: row, $just: space-between);
		@include box(100%, 46px);
		padding: 12px 6px 12px 12px;
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

		&__left {
			gap: 8px;
			@include make-flex($dir: row, $just: flex-start);

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

		&__right {
			@include make-flex($dir: row, $just: flex-end);

			& > a {
				@include box(33px, 33px);
				& > img {
					@include box();
					border-radius: 7px;
				}
			}
		}
	}
</style>
