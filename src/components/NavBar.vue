<template>
	<div>
		<b-navbar toggleable="lg" type="dark" variant="info">
			<b-container>
				<b-navbar-brand v-if="id">
					<router-link to="/" exact class="link">Home</router-link>
				</b-navbar-brand>

				<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

				<b-collapse id="nav-collapse" is-nav>
					<!-- Right aligned nav items -->
					<b-navbar-nav class="ml-auto">
						<b-navbar-nav v-if="!id">
							<b-nav-item>
								<router-link to="/signup" exact class="link"
									>Signup</router-link
								>
							</b-nav-item>
							<b-nav-item>
								<router-link to="/login" exact class="link">Login</router-link>
							</b-nav-item>
						</b-navbar-nav>
						<b-nav-item-dropdown v-if="id" right>
							<!-- Using 'button-content' slot -->
							<template v-slot:button-content>
								<em class="link">{{ firstName }} {{ lastName }}</em>
							</template>
							<b-dropdown-item href="#">Profile</b-dropdown-item>
							<b-dropdown-item v-on:click="handleSignOut"
								>Sign Out</b-dropdown-item
							>
						</b-nav-item-dropdown>
					</b-navbar-nav>
				</b-collapse>
			</b-container>
		</b-navbar>
	</div>
</template>

<script>
export default {
	data() {
		return {
			id: sessionStorage.getItem('id'),
			firstName: sessionStorage.getItem('firstName'),
			lastName: sessionStorage.getItem('lastName'),
		};
	},
	methods: {
		handleSignOut() {
			sessionStorage.removeItem('id');
			sessionStorage.removeItem('firstName');
			sessionStorage.removeItem('lastName');
			sessionStorage.removeItem('token');
			location.replace('/login');
		},
	},
};
</script>

<style scoped>
.link {
	color: white;
	text-decoration: none;
}
.router-link-active {
	color: white;
	border-bottom: 1px solid white;
}
</style>
