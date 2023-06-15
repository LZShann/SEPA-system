import React, {useState, useEffect}  from 'react';
import { Navbar, Footer, Sidebar, Header } from '../components';
import { supabase } from '../client'
import { useStateContext } from '../contexts/ContextProvider';
//import './Account.css';

const Employees = () => {
  const { activeMenu } = useStateContext();

  const [employees, setEmployees] = useState([])

  useEffect(() => {
    fetchEmployees();
    editEmployees();
    deleteEmployees();
  }, [])

  async function fetchEmployees() {
    try {
      const {data, error} = await supabase
      .from('users_data')
      .select('*')

      if (error) throw error;

      if (data != null) {
        console.log(data);
        setEmployees(data);
      }

    } catch (error) {
      alert(error.message);
    }
  }

  async function editEmployees() {

  }

  async function deleteEmployees() {

  }

  

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
    
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Admin" title="Employees" />

          <hr></hr>

          <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  <button onClick={() => editEmployees(item.id)}>Edit</button>
                  <button onClick={() => deleteEmployees(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
      </div>
    </div>
  );
};
export default Employees;