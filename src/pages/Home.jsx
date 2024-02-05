import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Context, server } from '../main';
import toast from 'react-hot-toast';
import TodoItem from '../components/TodoItem';
import { Navigate } from 'react-router-dom';

const Home = () => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [loading, setLoading] = useState(false);
	const [tasks, setTasks] = useState([]);
	const [refresh, setRefresh] = useState(false);
	const { isAuthenticated } = useContext(Context);

	const updateHandler = async (id) => {
		try {
			const { data } = await axios.put(`${server}/tasks/${id}`, {}, { withCredentials: true });
			toast.success(data.message);
			setRefresh((prev) => !prev);
		} catch (error) {
			console.error(error);
			toast.error(error.response.data.message);
		}
	};
	const deleteHandler = async (id) => {
		try {
			const { data } = await axios.delete(`${server}/tasks/${id}`, { withCredentials: true });
			toast.success(data.message);
			setRefresh((prev) => !prev);
		} catch (error) {
			console.error(error);
			toast.error(error.response.data.message);
		}
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const { data } = await axios.post(`${server}/tasks/new`, { title, description }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
			setTitle('');
			setDescription('');
			toast.success(data.message);
			setRefresh((prev) => !prev);
			setLoading(false);
		} catch (error) {
			console.error(error);
			toast.error(error.response.data.message);
			setLoading(false);
		}
	};

	useEffect(() => {
		axios.get(`${server}/tasks/my`, { withCredentials: true })
			.then((res) => {
				setTasks(res.data.tasks);
			})
			.catch((err) => {
				toast.error(err.response.data.message);
			});
	}, [refresh]);

	if (!isAuthenticated) {
		return <Navigate to={'/login'} />;
	}

	return (
		<div className='container'>
			<div className='login'>
				<section>
					<form onSubmit={submitHandler}>
						<input
							type='text'
							name='title'
							id='title'
							placeholder='Title'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
						/>
						<input
							type='text'
							name='description'
							id='description'
							placeholder='Description'
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							required
						/>
						<button
							disabled={loading}
							type='submit'
						>
							Add Task
						</button>
					</form>
				</section>
				<section className='todoContainer'>
					{tasks.map((item) => (
						<TodoItem
							key={item._id}
							title={item.title}
							desc={item.description}
							isCompleted={item.isCompleted}
							updateHandler={updateHandler}
							deleteHandler={deleteHandler}
							id={item._id}
						/>
					))}
				</section>
			</div>
		</div>
	);
};

export default Home;
