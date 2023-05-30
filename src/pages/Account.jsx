import React, {useState, useEffect}  from 'react';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page } from '@syncfusion/ej2-react-grids';
import { supabase } from '../client';

import { employeesData, employeesGrid } from '../data/dummy';
import { Header, Navbar } from '../components';

const Employees = () => {

  const [employees, setEmployees] = useState([])

  useEffect(() => {
    fetchEmployees();
    editEmployees();
    deleteEmployees();
  }, [])

  async function fetchEmployees() {
    try {
      const {data, error} = await supabase
      .from('user_table')
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
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Employees" />
      
        <div>
          {employees.map((item) => (
            <div>{item['email']}</div>
          ))}
        </div>

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
    
  );
};
export default Employees;