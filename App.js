import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import ToDo from './components/ToDo'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'

//Run dev server: npm start
//Run JSON server: npm run server
//Production build: npm run build

function App() {

  const [showAddTask, setShowAddTask] = useState(false);

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

//Fetch Tasks
//fetch function parameter is path to resource that you want to fetch
//res (response) recieves promise (representation of HTTP response)
// .json() method parses to body text
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  //Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method:'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
      })
      const data = await res.json()
      setTasks([...tasks, data])
  }

  //Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method:'DELETE'
    })

    setTasks(tasks.filter((task) => task.id !== id))
  }
  
  //Toggle Reminder
  const toggleReminder = async(id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()

    setTasks(tasks.map((task) => 
    task.id === id ? {...task, reminder: data.reminder} : task))
    
  }

  return (
    <Router>
    <div className="App">
      <Header title = 'My Checklist' onAdd={() => setShowAddTask(!showAddTask)}showAdd={showAddTask}
      />
       <Routes>
          <Route
            path='/'
            element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <ToDo
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  <h3 className = 'empty'>No Tasks To Show</h3>
                )}
              </>
            }
          />
          <Route path='/about' element={<About />} />
        </Routes>
      <Footer />
    </div>
    </Router>
  );
  
}

export default App;
