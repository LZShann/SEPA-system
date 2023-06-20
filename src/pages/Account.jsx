import React, {useState, useEffect}  from 'react';
import { Navbar, Footer, Sidebar, Header } from '../components';
import { supabase } from '../client'
import { useStateContext } from '../contexts/ContextProvider';
import './Account-Interview-History.css';

const Employees = () => {
  const currentUserEmail = sessionStorage.getItem('currentUserEmail');

  const [formData, setFormData] = useState ({name:'', phone:'', email:'', password:'', role:'', department:'', supervisor:''})
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [employees, setEmployees] = useState([]);

  const {activeMenu} = useStateContext();

  //Handle input stream
  function handleChange(event){
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  //Fetch Users
  async function fetchEmployees() {
      const {data, error} = await supabase
      .from('users_data')
      .select('*')
      .eq('role', 'Staff')
      .neq('email', currentUserEmail);

      if (data) {
        console.log(data);
        setEmployees(data);
      }
  };

  ///////////////////////////////////////////////////
  //Add Users
  function openAddUserModal() {
    setShowAddUserModal(true);
  };

  function closeAddUserModal() {
    setShowAddUserModal(false);
  };
  
  async function addEmployees() {
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
      // const { data, error } = await supabase
      //         .from('users_data')
      //         .insert({
      //           name: formData.name,
      //           phone: formData.phone,
      //           email: formData.email,
      //           role: formData.role,
      //           department: formData.department,
      //           supervisor: formData.supervisor
      //         });

      if (error){
        console.log('Error inserting data:', error.message);
      }

      alert('Sign Up Success. Please inform them to verify their email.');
      console.log('Data inserted successfully');
      setFormData({name:'', phone:'', email:'', password:'', role:'', department:'', supervisor:''});
      fetchEmployees();
      
    } catch (error) {
      alert(error.message);
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addEmployees();
  };


  //Edit Users
  const openEditUserModal = () => {
    setShowEditUserModal(true);
  };

  //////////////////////////////////////////////////
  //Edit Users
  async function editEmployees() {
    
  };

  ////////////////////////////////////////////////////
  //Delete Users
  async function deleteEmployees(selectedUserID) {
      const {data, error} = await supabase
      .from('users_data')
      .delete()
      .eq('id', selectedUserID);
      fetchEmployees();
  };

  //UseEffect
  useEffect(() => {
    fetchEmployees();
    // editEmployees();
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
                        <button className="EditButton" onClick={() => openEditUserModal()}>Edit</button>
                        <button className="DeleteButton" onClick={() => deleteEmployees(user.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
            </table>
          </div>

          {/* Add User */}
          {showAddUserModal && (
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
                      >
                        <option value="">Select New Department</option>
                        <option value="Sales">Sales</option>
                        <option value="HR">HR</option>
                        <option value="Admin">Admin</option>
                        <option value="Account">Account</option>
                        <option value="Production">Production</option>
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
                      >
                        <option value="">Select New Supervisor</option>
                        <option value="Dr Tang">Dr Tang</option>
                        <option value="Ms Angie">Ms Angie</option>
                      </select>
                    </div>


                    <div className="flex justify-end">
                      <button
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
              )}

          {/* Edit User */}
          {showEditUserModal && (
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
                        value={formData.name}
                        onChange={handleChange}
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
                        value={formData.phone}
                        onChange={handleChange}
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
                        value={formData.role}
                        onChange={handleChange}
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
                        value={formData.department}
                        onChange={handleChange}
                      >
                        <option value="">Select New Department</option>
                        <option value="Sales">Sales</option>
                        <option value="HR">HR</option>
                        <option value="Admin">Admin</option>
                        <option value="Account">Account</option>
                        <option value="Production">Production</option>
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
                        value={formData.supervisor}
                        onChange={handleChange}
                      >
                        <option value="">Select New Supervisor</option>
                        <option value="Dr Tang">Dr Tang</option>
                        <option value="Ms Angie">Ms Angie</option>
                      </select>
                    </div>


                    <div className="flex justify-end">
                      <button
                        onClick={editEmployees()}
                        className="px-4 py-2 text-white bg-indigo-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setShowEditUserModal(false)}
                        className="px-4 py-2 ml-2 text-gray-600 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                      >
                        Cancel
                      </button>

                    </div>
                  </div>
                </div>

              )}
        </div>
      </div>
      <Footer />
      </div>
    </div>
  );
};
export default Employees;