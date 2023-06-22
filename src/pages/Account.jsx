import React, {useState, useEffect}  from 'react';
import { Navbar, Footer, Sidebar, Header } from '../components';
import { supabase } from '../client'
import { useStateContext } from '../contexts/ContextProvider';
import { useNavigate } from "react-router-dom";
import './Account-Interview-History.css';

const Employees = () => {
  const currentUserEmail = sessionStorage.getItem('currentUserEmail');

  const currentUserSession = sessionStorage.getItem('currentUserSession');

  const [formData, setFormData] = useState({name:'', phone:'', email:'', password:'', role:'', department:'', supervisor:''});
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [editFormData, setEditFormData] = useState({name:'', phone:'', role:'', department:'', supervisor:''});
  const [deleteData, setDeleteData] = useState({id:''});

  const {activeMenu} = useStateContext();

  //Handle input stream
  function handleChange(event){
    setFormData((prevFormData)=>{
      return{
        ...prevFormData,
        [event.target.name]:event.target.value
      }
    })
  }

  //Fetch Users
  async function fetchEmployees() {
      const {data, error} = await supabase
      .from('users_data')
      .select('*')
      .neq('email', currentUserEmail);

      if (data) {
        console.log(data);
        setEmployees(data);
      }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  //Add Users
  function openAddUserModal() {
    setShowAddUserModal(true);
  };

  function closeAddUserModal() {
    setShowAddUserModal(false);
  };

  const handleAddSubmit = (event) => {
    event.preventDefault();
    addEmployees();
  };
  
  const addEmployees = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            phone: formData.phone,
            role: formData.role,
            department: formData.department,
            supervisor: formData.supervisor
          }
        }
      });

      if (error){
        console.log('Error inserting data:', error.message);
      }

      alert('Add User Success. Please verify their email. You will be directed to the login page.');
      console.log('Data inserted successfully');

      closeAddUserModal();
      
    } catch (error) {
      alert(error.message);
    }
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  //Edit Users

 //Edit Users
  const openEditUserModal = async (selectedUserID) => {

    const {data, error} = await supabase
    .from('users_data')
    .select('*')
    .eq('id', selectedUserID);

    if (error) {
      console.error(error);
      return;
    }

    const fetchedUser = data[0];
    console.log(fetchedUser);

    setEditFormData({
      ...fetchedUser
    });

    // setFormData((prevFormData)=>{
    //   return{
    //     ...prevFormData,
    //     [event.target.name]:event.target.value
    //   }
    // })

    setShowEditUserModal(true);
  };

  const handleEditSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    // Call the editTask function with the task ID and editTaskData
    editEmployees(editFormData.id, editFormData);
  };
  
  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

const editEmployees = async (selectedUserID, updatedUserData) => {
  try {
    // Update the task in the 'tasks' table using the Supabase client
    const { data, error } = await supabase
      .from('users_data')
      .update(updatedUserData)
      .match({ id: selectedUserID });

    if (error) {
      // Handle the error or provide feedback to the user
      console.error(error);
      return;
    }

    alert('Edit User Success.')
    fetchEmployees()
    closeEditUserModal();

  } catch (error) {
    // Handle any other errors that may occur
    console.error(error);
  }
};

  function closeEditUserModal() {
    setShowEditUserModal(false);
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////

  //Delete Users

  const handleDeleteSubmit = (event) => {
    event.preventDefault();
    deleteEmployees(deleteData.id);
  };

  const openDeleteUserModal = async (selectedUserID) => {

    const {data, error} = await supabase
    .from('users_data')
    .select('*')
    .eq('id', selectedUserID);

    if (error) {
      console.error(error);
      return;
    }

    const fetchedUserID = data[0];
    console.log(fetchedUserID);

    setDeleteData({
      ...fetchedUserID
    });

    setShowDeleteUserModal(true);
  };

  const closeDeleteUserModal = () => {
    setShowDeleteUserModal(false);
  };

  const deleteEmployees = async (selectedUserID) => {
    try {
      const {data, error} = await supabase
      .from('users_data')
      .delete()
      .match({id: selectedUserID});

      if (error) {
        // Handle the error or provide feedback to the user
        console.error(error);
        return;
      }

      alert('Delete User Success.')
      fetchEmployees();
      closeDeleteUserModal();
    } catch (error) {
      // Handle any other errors that may occur
      console.error(error);
    }
  };

  //UseEffect
  useEffect(() => {
    fetchEmployees();
    editEmployees();
    deleteEmployees();
  }, []);

  return (
    <div className='flex relative'>
      {activeMenu ? (
            <div className="w-72 fixed sidebar bg-main-bg ">
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
    
    <div className="div-container">
      <div className="m-10 md:m-10 mt-20 md:mt-10 p-5 md:p-5 bg-gray-100 rounded-3xl">
        <Header category="Admin" title="Employees" />
          <div className="bg-white p-5 pt-7 border-gray-300 border-2 rounded-2xl">
            <div>
              <button className="AddUserButton" onClick={openAddUserModal}>
                Add User
              </button>
            </div>
            <div className="table-container">
              <table className="GeneratedTable">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Department</th>
                    <th>Supervisor</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.phone}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>{user.department}</td>
                      <td>{user.supervisor}</td>
                      <td>
                        <button className="EditButton" onClick={() => openEditUserModal(user.id)}>Edit</button>
                        <button className="DeleteButton" onClick={() => openDeleteUserModal(user.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
            </table>
          </div>

          {/* Add User */}
          {showAddUserModal && (
            <form onSubmit={addEmployees}>
                <div className="fixed inset-0 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                    <h2 className="text-xl font-semibold mb-4">Add New User</h2>
                    <div className="mb-4">
                      <label htmlFor="name" className="block font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="name"
                        name="name"
                        id="name"
                        className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="phone" className="block font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="phone"
                        name="phone"
                        id="phone"
                        className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="email" className="block font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="password" className="block font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="role" className="block font-medium text-gray-700 mb-1">
                        Role
                      </label>
                      <select
                        name="role"
                        id="role"
                        className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={formData.role}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select New Role</option>
                        <option value="Staff">Staff</option>
                        <option value="Manager">Manager</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="deparment" className="block font-medium text-gray-700 mb-1">
                        Department
                      </label>
                      <select
                        name="department"
                        id="department"
                        className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={formData.department}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select New Department</option>
                        <option value="Sales">Sales</option>
                        <option value="HR">HR</option>
                        <option value="Admin">Admin</option>
                        <option value="Account">Account&Finance</option>
                        <option value="Production">Production</option>
                        <option value="Management">Management</option>
                        <option value="Marketing">Marketing</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="supervisor" className="block font-medium text-gray-700 mb-1">
                        Supervisor
                      </label>
                      <select
                        name="supervisor"
                        id="supervisor"
                        className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={formData.supervisor}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select New Supervisor</option>
                        <option value="Dr Tang">Dr Tang</option>
                        <option value="Ms Angie">Ms Angie</option>
                      </select>
                    </div>


                    <div className="flex justify-end">
                      <button
                        onClick={handleAddSubmit}
                        className="px-4 py-2 text-white bg-indigo-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      >
                        Add
                      </button>
                      <button
                        onClick={closeAddUserModal}
                        className="px-4 py-2 ml-2 text-gray-600 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            )}

          {/* Edit User */}
          {showEditUserModal && (
            <form onSubmit={editEmployees}>
                <div className="fixed inset-0 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                    <h2 className="text-xl font-semibold mb-4">Edit User</h2>
                    <div className="mb-4">
                      <label htmlFor="name" className="block font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="name"
                        name="name"
                        id="name"
                        className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={editFormData.name}
                        onChange={handleEditInputChange}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="title" className="block font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="phone"
                        name="phone"
                        id="phone"
                        className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={editFormData.phone}
                        onChange={handleEditInputChange}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="status" className="block font-medium text-gray-700 mb-1">
                        Role
                      </label>
                      <select
                        name="role"
                        id="role"
                        className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={editFormData.role}
                        onChange={handleEditInputChange}
                        required
                      >
                        <option value="">Select New Role</option>
                        <option value="Staff">Staff</option>
                        <option value="Manager">Manager</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="priority" className="block font-medium text-gray-700 mb-1">
                        Department
                      </label>
                      <select
                        name="department"
                        id="department"
                        className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={editFormData.department}
                        onChange={handleEditInputChange}
                        required
                      >
                        <option value="">Select New Department</option>
                        <option value="Sales">Sales</option>
                        <option value="HR">HR</option>
                        <option value="Admin">Admin</option>
                        <option value="Account&Finance">Account</option>
                        <option value="Production">Production</option>
                        <option value="Management">Management</option>
                        <option value="Marketing">Marketing</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="priority" className="block font-medium text-gray-700 mb-1">
                        Supervisor
                      </label>
                      <select
                        name="supervisor"
                        id="supervisor"
                        className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={editFormData.supervisor}
                        onChange={handleEditInputChange}
                        required
                      >
                        <option value="">Select New Supervisor</option>
                        <option value="Dr Tang">Dr Tang</option>
                        <option value="Ms Angie">Ms Angie</option>
                      </select>
                    </div>


                    <div className="flex justify-end">
                      <button
                        onClick={handleEditSubmit}
                        className="px-4 py-2 text-white bg-indigo-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      >
                        Save
                      </button>
                      <button
                        onClick={closeEditUserModal}
                        className="px-4 py-2 ml-2 text-gray-600 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                      >
                        Cancel
                      </button>

                    </div>
                  </div>
                </div>
            </form>
          )}

          {/* Delete User */}
          {showDeleteUserModal && (
            <form onSubmit={handleDeleteSubmit}>
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-xl font-semibold mb-4">Delete User</h2>
                    <p>Are you sure you want to delete this user?</p>
                    <div className="mb-4">
                      <button className="DeleteButton" onClick={deleteEmployees}>Delete</button>
                      <button className="CancelButton" onClick={closeDeleteUserModal}>Cancel</button>
                    </div>
                </div>
              </div>
            </form>
            )}
        </div>
      </div>
      <Footer />
      </div>
    </div>
    </div>
  );
};
export default Employees;