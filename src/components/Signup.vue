<template>
	<div>
		<b-container>
			<b-row class="mt-4">
				<div class="col-md-3 col-xs-12 col-sm-12"></div>
				<div class="col-md-4 col-xs-12 col-sm-12"></div>
				<div class="col-md-5 col-xs-12 col-sm-12">
					<b-card>
						<h2>Create your account</h2>
						<form v-on:submit.prevent="handleSubmit">
							<b-form-group>
								<b-form-input
									v-model.trim="$v.firstName.$model"
									:class="{
										'is-invalid': $v.firstName.$error,
										'is-valid': !$v.firstName.$invalid,
									}"
									placeholder="First Name"
								></b-form-input>
								<b-form-valid-feedback
									>First Name looks good</b-form-valid-feedback
								>
								<b-form-invalid-feedback>
									<span v-if="!$v.firstName.required"
										>First Name is required</span
									>
									<span v-if="!$v.firstName.miniLength"
										>Min Length must be atleast
										{{ $v.firstName.$params.minLength.min }} characters
										long</span
									>
								</b-form-invalid-feedback>
							</b-form-group>
							<b-form-group>
								<b-form-input
									v-model.trim="$v.lastName.$model"
									:class="{
										'is-invalid': $v.lastName.$error,
										'is-valid': !$v.lastName.$invalid,
									}"
									placeholder="Last Name"
								></b-form-input>
								<b-form-invalid-feedback>
									<span v-if="!$v.lastName.required"
										>Last Name is required</span
									>
									<span v-if="!$v.lastName.miniLength"
										>Min Length must be atleast
										{{ $v.lastName.$params.minLength.min }} characters
										long</span
									>
								</b-form-invalid-feedback>
								<b-form-valid-feedback>
									Last Name looks good.
								</b-form-valid-feedback>
							</b-form-group>
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
									Email looks good.
								</b-form-valid-feedback>
							</b-form-group>
							<b-form-group>
								<b-form-input
									type="password"
									v-model.trim="$v.password.$model"
									:class="{
										'is-invalid': $v.password.$error,
										'is-valid': !$v.password.$invalid,
									}"
									placeholder="Password"
								></b-form-input>
								<b-form-invalid-feedback>
									<span v-if="!$v.password.required">Password is required</span>
									<span v-if="!$v.password.miniLength"
										>Min Length must be atleast
										{{ $v.password.$params.minLength.min }} characters
										long</span
									>
								</b-form-invalid-feedback>
								<b-form-valid-feedback>
									Password looks good.
								</b-form-valid-feedback>
							</b-form-group>
							<b-form-group>
								<b-form-input
									type="password"
									v-model="$v.confirmPassword.$model"
									:class="{
										'is-invalid': $v.confirmPassword.$error,
										'is-valid': !$v.confirmPassword.$invalid,
									}"
									placeholder="Confirm Password"
								></b-form-input>
								<b-form-invalid-feedback>
									<span v-if="!$v.confirmPassword.required"
										>Password is required</span
									>
									<span v-if="!$v.password.confirm">Passwords must match</span>
								</b-form-invalid-feedback>
								<b-form-valid-feedback>
									Password looks good.
								</b-form-valid-feedback>
							</b-form-group>
							<b-form-group>
								<b-button
									type="submit"
									v-bind:disabled="
										$v.firstName.$error ||
											$v.lastName.$error ||
											$v.email.$error ||
											$v.password.$error ||
											$v.confirmPassword.$error ||
											!firstName ||
											!lastName ||
											!email ||
											!password ||
											!confirmPassword
									"
									variant="primary"
									>Signup</b-button
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
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators';
export default {
	data() {
		return {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: '',
		};
	},
	methods: {
		handleSubmit() {
			this.$http
				.post(`${process.env.VUE_APP_API_URL}/api/auth/signup`, {
					firstName: this.firstName,
					lastName: this.lastName,
					email: this.email,
					password: this.password,
					confirmPassword: this.confirmPassword,
				})
				.then(data => {
					console.log(data);
					this.$router.push('/login');
				})
				.catch(error => console.log(error));
		},
	},
	validations: {
		firstName: {
			required,
			minLength: minLength(2),
		},
		lastName: {
			required,
			minLength: minLength(2),
		},
		email: {
			required,
			email,
		},
		password: {
			required,
			minLength: minLength(6),
		},
		confirmPassword: {
			required,
			confirm: sameAs('password'),
		},
	},
};
</script>

<style lang="stylus" scoped></style>
