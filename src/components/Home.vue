<template>
	<div class="mt-4">
		<b-container>
			<div v-for="post in posts" v-bind:key="post.id" class="mt-3">
				<b-card
					border-variant="info"
					:header="
						` ${post.User.firstName} ${post.User.lastName} posted on ${moment(
							post.createdAt
						).format('DD MMM YYYY')}`
					"
					header-bg-variant="info"
					header-text-variant="white"
				>
					<b-card-text>
						{{ post.post }}
					</b-card-text>
				</b-card>
			</div>
		</b-container>
	</div>
</template>

<script>
import moment from 'moment';

export default {
	data() {
		return {
			id: sessionStorage.getItem('id'),
			firstName: sessionStorage.getItem('firstName'),
			lastName: sessionStorage.getItem('lastName'),
			token: sessionStorage.getItem('token'),
			posts: [],
			moment,
		};
	},
	mounted() {
		if (!this.id) {
			this.$router.push('/login');
		}
		this.$http
			.get(`${process.env.VUE_APP_API_URL}/api/posts`, {
				headers: {
					'content-type': 'application/json',
					authorization: `Bearer ${this.token}`,
				},
			})
			.then(data => {
				this.posts = data.body.data.rows;
			})
			.catch(error => console.log(error));
	},
};
</script>

<style scoped></style>
