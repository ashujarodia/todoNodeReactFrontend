import { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Context, server } from '../main';
import toast from 'react-hot-toast';
import axios from 'axios';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);
	const submitHandler = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			console.log(email, password);
			const { data } = await axios.post(
				`${server}/users/login`,
				{ name, email, password },
				{
					headers: {
						'Content-Type': 'application/json',
					},
					withCredentials: true,
				}
			);
			console.log(data);
			toast.success(data.message);
			setIsAuthenticated(true);
			setLoading(false);
		} catch (error) {
			toast.error(error.response.data.message);
			console.error(error);
			setIsAuthenticated(false);
			setLoading(false);
		}
	};

	if (isAuthenticated) {
		return <Navigate to={'/'} />;
	}
	return (
		<div className='login'>
			<section>
				<form onSubmit={submitHandler}>
					<input
						type='email'
						name='email'
						id='email'
						placeholder='Email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<input
						type='password'
						name='password'
						id='password'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<button
						type='submit'
						disabled={loading}
					>
						Login
					</button>
					<h4>Or</h4>
					<Link to={'/register'}>Sign up</Link>
				</form>
			</section>
		</div>
	);
};

export default Login;
