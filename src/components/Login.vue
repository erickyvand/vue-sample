<template>
	<div>
		<b-container>
			<b-row class="mt-4">
				<div class="col-md-3 col-xs-12 col-sm-12"></div>
				<div class="col-md-4 col-xs-12 col-sm-12"></div>
				<div class="col-md-5 col-xs-12 col-sm-12">
					<b-card>
						<small v-if="errorMsg" class="text-danger">{{ errorMsg }}</small>
						<h2>Login</h2>
						<form v-on:submit.prevent="handleSubmit">
							<b-form-group>
								<b-form-input
									v-model.trim="$v.email.$model"
									:class="{
										'is-invalid': $v.email.$error,
										'is-valid': !$v.email.$invalid,
									}"
									placeholder="Email"
								></b-form-input>
								<b-form-invalid-feedback>
									<span v-if="!$v.email.required">Email is required</span>
									<span v-if="!$v.email.email">Invalid Email</span>
								</b-form-invalid-feedback>
								<b-form-valid-feedback>
									<span>Email looks good</span>
								</b-form-valid-feedback>
							</b-form-group>
							<b-form-group>
								<b-form-input
									type="password"
									v-model="password"
									placeholder="Password"
								></b-form-input>
							</b-form-group>
							<b-form-group>
								<b-button
									type="submit"
									variant="primary"
									:disabled="!email || !password || $v.email.$error"
									>Login</b-button
								>
							</b-form-group>
						</form>
					</b-card>
				</div>
			</b-row>
		</b-container>
	</div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';

export default {
	data() {
		return {
			email: '',
			password: '',
			errorMsg: '',
		};
	},
	methods: {
		handleSubmit() {
			const values = {
				email: this.email,
				password: this.password,
			};
			this.$http
				.post(`${process.env.VUE_APP_API_URL}/api/auth/login`, values)
				.then(data => {
					sessionStorage.setItem('id', data.body.data.user.id);
					sessionStorage.setItem('firstName', data.body.data.user.firstName);
					sessionStorage.setItem('lastName', data.body.data.user.lastName);
					sessionStorage.setItem('token', data.body.data.token);
					location.replace('/');
				})
				.catch(error => {
					this.errorMsg = error.body.message;
					return this.errorMsg;
				});
		},
	},
	validations: {
		email: {
			required,
			email,
		},
	},
};
</script>

<style scoped></style>
