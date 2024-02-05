import axios from 'axios';
import { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Context, server } from '../main';
import toast from 'react-hot-toast';

const Register = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);
	const submitHandler = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			console.log(name, email, password);
			const { data } = await axios.post(
				`${server}/users/new`,
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
						type='text'
						name='name'
						id='name'
						placeholder='Name'
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
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
						Sign Up
					</button>
					<h4>Or</h4>
					<Link to={'/login'}>Login</Link>
				</form>
			</section>
		</div>
	);
};

export default Register;
