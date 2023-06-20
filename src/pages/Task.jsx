import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Task.css';
import { Header, Sidebar, Navbar, Footer } from '../components';
import { useStateContext } from '../contexts/ContextProvider';  
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import { supabase } from "../client";


const Task = () => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // State to control the visibility of the delete confirmation modal
  const [selectedTask, setSelectedTask] = useState(null);

  async function authCheck() {
    const { data, error } = await supabase.auth.refreshSession();
  
    if (error) {
      // User not logged in
      window.location.replace('/');
      return;
    }
  
    
  }
  const userName = sessionStorage.getItem('currentUserName');
    
  const userRole = sessionStorage.getItem('currentUserRole');
  useEffect(() => {
    authCheck();
  }, []);
  
  const [users, setUsers] = useState([]);
  const {activeMenu} = useStateContext();

  const [columns, setColumns] = useState([]);
  const [newTaskData, setNewTaskData] = useState({
    title: '',
    status: '',
    summary: '',
    priority: '',
    tags: '',
    assignee: '',
    estimate: '',
  });
  const [showAddTaskModal, setShowAddTaskModal] = useState(false); // State to control the visibility of the add task modal
  const [showEditTaskModal, setShowEditTaskModal] = useState(false); // State to control the visibility of the edit task modal
  const [editTaskData, setEditTaskData] = useState({
    id: '',
    title: '',
    status: '',
    summary: '',
    priority: '',
    tags: '',
    assignee: '',
    estimate: '',
  });// Function to open the Edit Task Modal
  const openEditModal = async (task) => {
    const { data: taskData, error } = await supabase
      .from('kanban_task')
      .select('*')
      .eq('id', task.id);

    if (error) {
      console.error('Error fetching task data from Supabase:', error.message);
      return;
    }

    const fetchedTask = taskData[0];
    console.log(fetchedTask);

    setEditTaskData({
      ...fetchedTask,
      creator: fetchedTask.creator || '', // Set the value of the "creator" field
    });
    setShowEditTaskModal(true);

    if (userRole !== 'Manager' && fetchedTask.creator === 'Manager') {
      // Disable or hide all fields for tasks created by a Manager
      setEditTaskData((prevData) => ({
        ...prevData,
        title: '',
        summary: '',
        estimate: new Date(), // changed to date picker
        priority: '',
        tags: '',
        assignee: '',
      }));
    }
  };

  

  const closeEditModal = () => {
    setShowEditTaskModal(false);
  };

  
 
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase.from('users_data').select('name');
        if (error) {
          console.error('Error fetching users:', error);
          // Handle the error here
        } else {
          setUsers(data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        // Handle the error here
      }
    };
  
    fetchUsers();  
     fetchTasks();
  }, []);
  
  const openAddTaskModal = () => {
    setShowAddTaskModal(true);
  };
  const fetchTasks = async () => {
    try {
      let { data, error } = [];

   
    console.log(userName); // Access the userName here or perform any additional actions with it

    if (userName === 'TYS' && userRole === 'Manager') {
      // Fetch all tasks
      ({ data, error } = await supabase.from('kanban_task').select('*'));
    } else {
      // Fetch tasks based on the assignee matching the current user's username
      ({ data, error } = await supabase
        .from('kanban_task')
        .select('*')
        .eq('assignee', userName));
    }

    if (error) {
      throw error;
    }
      const tasksByColumn = groupTasksByColumn(data);
      const columns = createColumns(tasksByColumn);
      setColumns(columns);
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
    }
  };
  const groupTasksByColumn = (tasks) => {
    const tasksByColumn = {
      ToDo: [],
      InProgress: [],
      Done: [],
    };
  
    tasks.forEach((task) => {
      const columnId = task.status;
  
      switch (columnId) {
        case 'ToDo':
          tasksByColumn.ToDo.push(task);
          break;
        case 'InProgress':
          tasksByColumn.InProgress.push(task);
          break;
        case 'Done':
          tasksByColumn.Done.push(task);
          break;
        default:
          break;
      }
    });
  
    // Define priority levels
    const priorityLevels = {
      High: 3,
      Medium: 2,
      Low: 1,
    };
  
    // Sort tasks within each column based on priority (high to low)
    Object.keys(tasksByColumn).forEach((columnId) => {
      tasksByColumn[columnId].sort((a, b) => {
        const priorityA = priorityLevels[a.priority];
        const priorityB = priorityLevels[b.priority];
  
        return priorityB - priorityA;
      });
    });
  
    return tasksByColumn;
  };
  
  
  const createColumns = (tasksByColumn) => {
    const columns = Object.keys(tasksByColumn).map((columnId) => {
      const columnTasks = tasksByColumn[columnId].map((task) => ({
        id: task.id,
        title: task.title,
        status: task.status,
        summary: task.summary,
        priority: task.priority,
        tags: task.tags,
        assignee: task.assignee,
        estimate: task.estimate,
      }));

      return {
        id: columnId,
        title: columnId,
        tasks: columnTasks,
      };
    });

    return columns;
  };
  const createNewTask = async () => {
    try {
      const fetchLargestId = async () => {
        const { data: tasks, error } = await supabase
          .from('kanban_task')
          .select('id')
          .order('id', { ascending: false })
          .limit(1);
  
        if (error) {
          console.error('Error fetching data from Supabase:', error.message);
          return;
        }
  
      
        const largestIdValue = tasks.length > 0 ? parseInt(tasks[0].id) : 0; // Get the largest ID value as an integer from the fetched data

        const newTask = {
          id: largestIdValue + 1, // Add 1 to the largest ID value
          title: newTaskData.title,
          status: newTaskData.status,
          summary: newTaskData.summary,
          priority: newTaskData.priority,
          tags: newTaskData.tags,
          assignee: newTaskData.assignee,
          estimate: newTaskData.estimate,
          creator: userRole, // Add the creator field with the userRole value
        };
  
        const { data: insertData, error: insertError } = await supabase.from('kanban_task').insert([newTask]);
  
        if (insertError) {
          console.log(largestIdValue)
                    console.log(largestIdValue)
          console.error('Error inserting task:', insertError.message);
          return;
        }
  
        setNewTaskData({
          id: '',
          title: '',
          status: '',
          summary: '',
          priority: '',
          tags: '',
          assignee: '',
          estimate: '',
        });
  
        setShowAddTaskModal(false);
  
        fetchTasks();
      };
  
      fetchLargestId();
    } catch (error) {
      console.error('Error inserting task:', error.message);
    }
  };
  
  
  
  
  const handleDragEnd = async (result) => {
    const { source, destination } = result;
  
    // Check if the task was dropped outside a droppable area
    if (!destination) {
      return;
    }
  
    // Check if the task was dropped in a different status column
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns.find((column) => column.id === source.droppableId);
      const destinationColumn = columns.find((column) => column.id === destination.droppableId);
      const task = sourceColumn.tasks[source.index];
  
      // Update the task status and position in Supabase
      try {
        await supabase
          .from('kanban_task')
          .update({ status: destination.droppableId })
          .eq('id', task.id);
          
  
      } catch (error) {
        console.error('Error updating task in Supabase:', error);
        // You might want to handle the error here
      }
  
      // Update the task status and position in the Kanban data
      setColumns((prevColumns) => {
        const updatedColumns = [...prevColumns];
        const sourceTasks = [...sourceColumn.tasks];
        const destinationTasks = [...destinationColumn.tasks];
  
        // Remove the task from the source column
        sourceTasks.splice(source.index, 1);
        updatedColumns.find((column) => column.id === source.droppableId).tasks = sourceTasks;
  
        // Insert the task at the destination index in the destination column
        destinationTasks.splice(destination.index, 0, task);
        updatedColumns.find((column) => column.id === destination.droppableId).tasks = destinationTasks;

fetchTasks()
        return updatedColumns;

      });
    }
  };
 
  const handleDeleteConfirmation = (task) => {
    setSelectedTask(task);
    setShowDeleteConfirmation(true);
  };

  const cancelDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
    
  };

  // Function to delete the task
  const deleteTask = async () => {
    try {
      // Delete the task from Supabase
      const { data, error } = await supabase.from('kanban_task').delete().match({ id: selectedTask.id });

      if (error) {
        console.error('Error deleting task:', error.message);
        return;
      }

      // Task deleted successfully
      console.log('Task deleted successfully');

      // Fetch updated tasks
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error.message);
    } finally {
      // Reset the selected task and hide the delete confirmation modal
      setSelectedTask(null);
      setShowDeleteConfirmation(false);
    }
  };
  const renderTaskCard = (task, index) => {
    // Task that is overdue
    const estimatedDueDate = new Date(task.estimate);
    const currentDate = new Date();
    const isOverdue = estimatedDueDate < currentDate;
  
    return (
      <Draggable key={task.id} draggableId={task.id} index={index}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={`card ${isOverdue ? 'task-overdue' : ''}`}
          >
            <div className="card-header">
              <div className="card-header-text">{task.title}</div>
              <div className="card-status">{task.status}</div>
            </div>
            <div className="card-content">
              <div className="card-label">
                <div className="card-label-text">Summary:</div>
                <div className="card-label-value">{task.summary}</div>
              </div>
              <div className="card-label">
                <div className="card-label-text">Priority:</div>
                <div className="card-label-value">{task.priority}</div>
              </div>
              <div className="card-label">
                <div className="card-label-text">Tags:</div>
                <div className="card-label-value">{task.tags}</div>
              </div>
              <div className="card-label">
                <div className="card-label-text">Assignee:</div>
                <div className="card-label-value">{task.assignee}</div>
              </div>
              <div className="card-label">
                <div className="card-label-text">Estimate Due:</div>
                <div className="card-label-value">{task.estimate}</div>
              </div>
            </div>
            <div className="card-actions">
              <button onClick={() => openEditModal(task)}>Edit</button>
              <button onClick={() => handleDeleteConfirmation(task)}>Delete</button>
            </div>
            {/* Delete Confirmation Modal */}
            {showDeleteConfirmation && selectedTask && selectedTask.id === task.id && (
              <div className="modal">
                <div className="modal-content">
                  {userRole !== 'Manager' && editTaskData.creator === 'Manager' ? (
                    <>
                      <h2>Cannot Delete Task</h2>
                      <p>This task was created by a Manager and cannot be deleted.</p>
                      <div className="modal-buttons">
                        <button onClick={cancelDeleteConfirmation}>Close</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h2>Confirm Delete</h2>
                      <p>Are you sure you want to delete this task?</p>
                      <div className="modal-buttons">
                        <button onClick={deleteTask}>Delete</button>
                        <button onClick={cancelDeleteConfirmation}>Cancel</button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </Draggable>
    );
  };
  

  
  const renderColumn = (column) => {
    const handleAddTask = () => {
      createNewTask(column.id);
    };
  
    return (
      <div key={column.id} className="column">
        <h3 className="column-title">{column.title}</h3>
        <div className="task-list">
          <Droppable droppableId={column.id}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="card-container"
              >
                {column.tasks.map((task, index) => renderTaskCard(task, index))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    );
  };
  

  const handleInputChange = (event) => {
    setNewTaskData({
      ...newTaskData,
      [event.target.name]: event.target.value,
    });
  };

  const addTask = () => {
    createNewTask();
  };
 
  const handleEditSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
  
    // Call the editTask function with the task ID and editTaskData
    editTask(editTaskData.id, editTaskData);
  };
  
  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditTaskData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setNewTaskData((prevData) => ({
      ...prevData,
      estimate: date,
    }));
  };
  const handleEditDateChange = (date) => {
    setEditTaskData((prevData) => ({
      ...prevData,
      estimate: date,
    }));
  };

const editTask = async (taskId, updatedTaskData) => {
  try {
    // Update the task in the 'tasks' table using the Supabase client
    const { data, error } = await supabase
      .from('kanban_task')
      .update(updatedTaskData)
      .match({ id: taskId });

    if (error) {
      
      // Handle the error or provide feedback to the user
      console.error(error);
      return;
    }

    if (taskId && taskId.length > 0) {
      // Task updated successfully

      // Close the edit modal or perform any other necessary actions
      closeEditModal();
      fetchTasks()
    } else {
      // Task not found, handle the error or provide feedback to the user
    }
  } catch (error) {
    // Handle any other errors that may occur
    console.error(error);
  }
};

  return (
    <div className='flex relative'>
      {activeMenu ? (
        <div className="w-72 fixed sidebar bg-white ">
          <Sidebar />
        </div>
      ) : (
        <div className="w-0">
          <Sidebar />
        </div>
      )}
      <div
        className={
          activeMenu
            ? 'bg-main-bg min-h-screen md:ml-72 w-full  '
            : 'bg-main-bg w-full min-h-screen flex-2 '
        }
      >
        <div className="fixed md:static bg-main-bg navbar w-full ">
          <Navbar />
        </div>
        <div className="m-2 md:m-10 mt-5 md:mt-10 p-2 md:p-5 bg-gray-100 rounded-3xl">
          <Header category="Pages" title="Task" />
          <div className="bg-white p-5 pt-7 border-gray-300 border-2 rounded-2xl">
            <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex justify-end">
  <button
    onClick={openAddTaskModal}
    className="px-4 py-2 text-white bg-indigo-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
  >
    Add Task
  </button>
</div>

          <div className="trello-board">
            <div className="columns-container">{columns.map(renderColumn)}</div>
          </div>
          {/* Add Task Modal */}
          {showAddTaskModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
                <div className="mb-4">
                  <label htmlFor="title" className="block font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={newTaskData.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="status" className="block font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                  
                    name="status"
                    id="status"
                    className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={newTaskData.status}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Status</option>
                    <option value="ToDo">ToDo</option>
                    <option value="InProgress">InProgress</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="summary" className="block font-medium text-gray-700 mb-1">
                    Summary
                  </label>
                  <textarea
                    name="summary"
                    id="summary"
                    rows="3"
                    className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={newTaskData.summary}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label htmlFor="priority" className="block font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    name="priority"
                    id="priority"
                    className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={newTaskData.priority}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="tags" className="block font-medium text-gray-700 mb-1">
                    Tags
                  </label>
                  <input
                    type="text"
                    name="tags"
                    id="tags"
                    className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={newTaskData.tags}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                <label htmlFor="assignee" className="block font-medium text-gray-700 mb-1">
  Assignee
</label>
<select
  name="assignee"
  id="assignee"
  className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
  value={newTaskData.assignee}
  onChange={handleInputChange}
>
  <option value="">Select Assignee</option>
  {users.map((user) => (
    (userRole === 'Manager' || user.name === userName) && (
      <option key={user.name} value={user.name}>
        {user.name}
      </option>
    )
  ))}
</select>



    </div>
    <div className="mb-4">
  <label htmlFor="estimate" className="block font-medium text-gray-700 mb-1">
    Estimate Due
  </label>
  <DatePicker
    selected={newTaskData.estimate}
    onChange={(date) => handleDateChange(date)}
    dateFormat="yyyy-MM-dd"
    className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
  />
</div>


                <div className="flex justify-end">
                  <button
                    onClick={addTask}
                    className="px-4 py-2 text-white bg-indigo-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                Save
                  </button>
                  <button
                    onClick={() => setShowAddTaskModal(false)}
                    className="px-4 py-2 ml-2 text-gray-600 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    Cancel
                  </button>
                  
                </div>
              </div> 
            </div>
            
          )}
    {/* Edit Task Modal */}
    {showEditTaskModal && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-lg p-6 w-96">

      <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
      {userRole !== 'Manager' && editTaskData.creator === 'Manager' ? (
        <>
          <p>This task was created by a Manager and cannot be edited.</p>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={closeEditModal}
              className="px-4 py-2 text-white bg-red-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Close
            </button>
          </div>
        </>
      ) : (
              
                <form onSubmit={editTask}>
                  <div className="mb-4">
                    <label htmlFor="title" className="block font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={editTaskData.title}
                      onChange={handleEditInputChange }
              
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="status" className="block font-medium text-gray-700 mb-1">
                  Status
                    </label>
                    <select
                      name="status"
                      id="status"
                      className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={editTaskData.status}
                      onChange={handleEditInputChange }
                
                    >
                      <option value="">Select Status</option>
                    <option value="ToDo">ToDo</option>
                    <option value="InProgress">InProgress</option>
                    <option value="Done">Done</option>
                  </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="summary" className="block font-medium text-gray-700 mb-1">
                    Summary
                    </label>
                    <textarea
                      name="summary"
                      id="summary"
                      className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={editTaskData.summary}
                      onChange={handleEditInputChange }
                    ></textarea>
                  </div>
                
                  <div className="mb-4">
  <label htmlFor="estimate" className="block font-medium text-gray-700 mb-1">
    Estimate
  </label>
  <DatePicker
    selected={editTaskData.estimate ? new Date(editTaskData.estimate) : null}
    onChange={(date) => handleEditDateChange(date)}
    dateFormat="yyyy-MM-dd"
    className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
  />
</div>
                  <div className="mb-4">
                    <label htmlFor="priority" className="block font-medium text-gray-700 mb-1">
                    Priority
                    </label>
                    <select
                    name="priority"
                    id="priority"
                      className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={editTaskData.priority}
                      onChange={handleEditInputChange }
                    >   <option value="">Select Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                  </div>
                
                  <div className="mb-4">
                    <label htmlFor="assignee" className="block font-medium text-gray-700 mb-1">
                  Assignee
                    </label>
                    <select
        name="assignee"
        id="assignee"
                      className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={editTaskData.assignee}
                      onChange={handleEditInputChange }
                    >    <option value="">Select Assignee</option>
                    {users.map((user) => (
                      (userRole === 'Manager' || user.name === userName) && (
                        <option key={user.name} value={user.name}>
                          {user.name}
                        </option>
                      )
                    ))}
                  </select>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="tags" className="block font-medium text-gray-700 mb-1">
                  Tags
                    </label>
                    <input
                      type="text"
                      name="tags"
                      id="tags"
                      className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={editTaskData.tags}
                      onChange={handleEditInputChange }
                    />
                  </div>
                

   <div className="flex justify-end">
            <button
              type="submit"
              onClick={handleEditSubmit}
              className="px-4 py-2 text-white bg-indigo-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Save
            </button>
            <button
              type="button"
              onClick={closeEditModal}
              className="px-4 py-2 text-white bg-red-600 rounded-lg ml-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Cancel
            </button>
          
          </div>
        </form>
      )}
    </div>
  </div>
)}

            </DragDropContext>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
};

export default Task;