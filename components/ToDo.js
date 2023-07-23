import Task from './Task'

const ToDo = ({tasks, onDelete, onToggle}) => {
    return (
    <div className = "ToDo">
        {tasks.map((task) => (
            <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle}/>
        ))}
    </div>
  )
}

export default ToDo
