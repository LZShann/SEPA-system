import React, { useEffect, useState } from 'react';
import History from './History';
import { Navbar, Footer, Sidebar, Header } from '../components';
import { supabase } from '../client'
import { useStateContext } from '../contexts/ContextProvider';


const Interview = () => {
  const { activeMenu } = useStateContext();

  const [selectedFormId, setSelectedFormId] = useState(null);
  const [selectedPositionFormId, setSelectedPositionFormId] = useState(null);
  const [selectedStatusFormId, setSelectedStatusFormId] = useState(null);
  const [formData, setFormData] = useState([]);

  const fetchFormData = async () => {
    try {
      const { data, error } = await supabase
        .from('confirmation')
        .select('id, trackingNumber, submissionDate, status');

      if (error) {
        console.error('Error retrieving data:', error);
      } else {
        console.log('Retrieved data:', data);
        setFormData(data);
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  useEffect(() => {
    fetchFormData();
  }, []);

  const openFormPopup = (id) => {
    setSelectedFormId(id);
    console.log('PersonalDetails', id);
    window.open('/form-review-page/' + id, '_blank'); // Open in a new window or tab
  };

  const openFormPositionPopup = (id) => {
    setSelectedPositionFormId(id);
    console.log('INTerForm', id);
   window.open('/form-review-position/' + id, '_blank'); // Open in a new window or tab
  };

  const updateAPPROVEStatus = async (id) => {
    console.log('Updating status...');
    try {
      const { data, error } = await supabase
        .from('confirmation')
        .update({ status: 'APPROVE' })
        .match({ id: id });

      if (error) {
        console.error('Error updating status:', error);
      } else {
        console.log('Status updated successfully');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const updateDENYStatus = async (id) => {
    console.log('Updating status...');
    try {
      const { data, error } = await supabase
        .from('confirmation')
        .update({ status: 'DENY' })
        .match({ id: id });

      if (error) {
        console.error('Error updating status:', error);
      } else {
        console.log('Status updated successfully');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // Filter formData to show only "PROGRESS" status
  const filteredFormData = formData.filter((form) => form.status === 'PROGRESS');

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
          <Header category="Pages" title="Interview" />
          <h1>Form Review</h1><hr></hr>
          <table>
            <thead>
              <tr>
                <th>Row</th>
                <th>Tracking Number</th>
                <th>Submission Folder</th>
                <th>Submission Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredFormData.map((form, index) => (
                <tr key={form.id}>
                  <td>{index + 1}</td>
                  <td>{form.trackingNumber}</td>
                  <td>
                  <button onClick={() => openFormPopup(form.id)} 
                    style={{ color: 'blue', fontWeight: 'bold', textDecoration: 'underline', }} >
                    PersonalDetails
                  </button>
                  </td>
                  <td>
                  <button onClick={() => openFormPositionPopup(form.id)}
                    style={{ color: 'blue', fontWeight: 'bold',  textDecoration: 'underline', }} >
                    InterviewForm
                  </button>
                  </td>   <td>{form.submissionDate}</td>
                  <td>
                    
                    <button
                      style={{ backgroundColor: 'green' }}
                      onClick={() => updateAPPROVEStatus(form.id)}
                    >
                      APPROVE
                    </button>
                    <button
                      style={{ backgroundColor: 'red' }}
                      onClick={() => updateDENYStatus(form.id)}
                    >
                      DENY
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <br>
          </br>
          <div><History /></div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Interview;