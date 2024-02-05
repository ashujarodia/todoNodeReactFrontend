// eslint-disable-next-line react/prop-types
const TodoItem = ({ title, desc, isCompleted, updateHandler, deleteHandler, id }) => {
	return (
		<div className='todo'>
			<div>
				<h4>{title}</h4>
				<p>{desc}</p>
			</div>
			<div>
				<input
					type='checkbox'
					name='check'
					id='check'
					checked={isCompleted}
					onChange={() => updateHandler(id)}
				/>
				<button
					className='btn'
					onClick={() => deleteHandler(id)}
				>
					Delete
				</button>
			</div>
		</div>
	);
};

export default TodoItem;
