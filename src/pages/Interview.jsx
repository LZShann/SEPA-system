import React, { useEffect, useState } from 'react';
import History from './History';
import { Navbar, Footer, Sidebar, Header } from '../components';
import { supabase } from '../client';
import { useStateContext } from '../contexts/ContextProvider';
const Interview = () => {
  const { activeMenu } = useStateContext();

  const [selectedFormId, setSelectedFormId] = useState(null);
  const [selectedPositionFormId, setSelectedPositionFormId] = useState(null);
  const [selectedStatusFormId, setSelectedStatusFormId] = useState(null);
  const [selectedBigFiveFormId, setSelectedBigFiveFormId] = useState(null);
  const [selectedBigFivePersonalId, setSelectedBigFivePersonalId] = useState(null);
  const [confirmationData, setConfirmationData] = useState([]);
  const [bigFiveData, setBigFiveData] = useState([]);
  const [remarks, setRemarks] = useState({});

  const fetchConfirmationData = async () => {
    try {
      const { data, error } = await supabase
        .from('confirmation')
        .select('id, trackingNumber, submissionDate, status, remark');

      if (error) {
        console.error('Error retrieving confirmation data:', error);
      } else {
        console.log('Retrieved confirmation data:', data);
        setConfirmationData(data);
      }
    } catch (error) {
      console.error('Error retrieving confirmation data:', error);
    }
  };

  const fetchBigFiveData = async () => {
    try {
      const { data, error } = await supabase
        .from('bigfive')
        .select('id, trackingNumber, submissionDate, status, remark');

      if (error) {
        console.error('Error retrieving bigfive data:', error);
      } else {
        console.log('Retrieved bigfive data:', data);
        setBigFiveData(data);
      }
    } catch (error) {
      console.error('Error retrieving bigfive data:', error);
    }
  };

  useEffect(() => {
    fetchConfirmationData();
    fetchBigFiveData();
  }, []);

  const openFormPopup = (id) => {
    setSelectedFormId(id);
    console.log('PersonalDetails', id);
    window.open('/form-review-page/' + id, '_blank');
  };

  const openFormPositionPopup = (id) => {
    setSelectedPositionFormId(id);
    console.log('INTerForm', id);
    window.open('/form-review-position/' + id, '_blank');
  };
  const openBigFivePersonalPopup = (id) => {
    setSelectedBigFivePersonalId(id);
    console.log('BigFivePersonal', id);
    window.open('/form-review-bigfivepersonal/' + id, '_blank');
  };

  const openFormBigFivePopup = (id) => {
    setSelectedBigFiveFormId(id);
    console.log('BigFive', id);
    window.open('/form-review-bigfive/' + id, '_blank');
  };
  const updateAPPROVEStatus = async (id, isBigFive) => {
    
    try {
      const table = isBigFive ? 'bigfive' : 'confirmation';
      const { data, error } = await supabase
        .from(table)
        .update({ status: 'APPROVE', remark: remarks[id] })
        .match({ id });
  
      if (error) {
        console.error('Error updating status:', error);
      } else {
        console.log('Status updated successfully');
        if (isBigFive) {
          await fetchBigFiveData();
        } else {
          await fetchConfirmationData();
        }
        window.location.reload(); // Refresh the page
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
  

  const updateDENYStatus = async (id,isBigFive) => {
 
    try {
      const table = isBigFive ? 'bigfive' : 'confirmation';
      const { data, error } = await supabase
        .from(table)
        .update({ status: 'DENY', remark: remarks[id] })
        .match({ id });

        if (error) {
          console.error('Error updating status:', error);
        } else {
          console.log('Status updated successfully');
          if (isBigFive) {
            await fetchBigFiveData();
          } else {
            await fetchConfirmationData();
          }
          window.location.reload(); // Refresh the page
        }
      } catch (error) {
        console.error('Error updating status:', error);
      }
    };
    

  const handleRemarkChange = (id, value) => {
    setRemarks((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <div className='flex relative'>
      {activeMenu ? (
        <div className='w-72 fixed sidebar bg-white'>
          <Sidebar />
        </div>
      ) : (
        <div className='w-0'>
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
        <div className='fixed md:static bg-main-bg navbar w-full '>
          <Navbar />
        </div>
        <div className='m-2 md:m-10 mt-5 md:mt-10 p-2 md:p-5 bg-gray-100 rounded-3xl'>
          <Header category='Pages' title='Interview' />
          <div className='bg-white p-5 pt-7 border-gray-300 border-2 rounded-2xl'>
            <h1>Form Review</h1>
            <hr></hr>
            <table>
              <thead>
                <tr>
                  <th>Row</th>
                  <th>Tracking Number</th>
                  <th>Submission Folder</th>
                  <th></th>
                  <th>Submission Date</th>
                  <th>Remark</th>
                  <th>Status</th>
                 
                </tr>
              </thead>
              <tbody>
              {confirmationData
  .filter((form) => form.status === 'PROGRESS')
  .map((form, index) => (

                  <tr key={form.id}>
                    <td>{index + 1}</td>
                    <td>{form.trackingNumber}</td>
                    <td>
                      <button
                        onClick={() => openFormPopup(form.id)}
                        style={{
                          color: 'blue',
                          fontWeight: 'bold',
                          textDecoration: 'underline',
                        }}
                      >
                        PersonalDetails
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => openFormPositionPopup(form.id)}
                        style={{
                          color: 'blue',
                          fontWeight: 'bold',
                          textDecoration: 'underline',
                        }}
                      >
                        InterviewForm
                      </button>
                    </td>
               <td>{new Date(form.submissionDate).toLocaleDateString()}</td>
                    <td>
                      <input
                        type='text'
                        value={remarks[form.id] || ''}
                        onChange={(e) => handleRemarkChange(form.id, e.target.value)}
                      />
                    </td>
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
    {bigFiveData
  .filter((form) => form.status === 'PROGRESS')
  .map((form, index) => (
                  <tr key={form.id}>
                    <td>{index + 1}</td>
                    <td>{form.trackingNumber}</td>
                    <td>
                      <button
                        onClick={() => openBigFivePersonalPopup(form.id)}
                        style={{
                          color: 'blue',
                          fontWeight: 'bold',
                          textDecoration: 'underline',
                        }}
                      >
                        PersonalDetails
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => openFormBigFivePopup(form.id)}
                        style={{
                          color: 'blue',
                          fontWeight: 'bold',
                          textDecoration: 'underline',
                        }}
                      >
                        BigFiveForm
                      </button>
                    </td>
                    <td>{new Date(form.submissionDate).toLocaleDateString()}</td>
                    <td>
                      <input
                        type='text'
                        value={remarks[form.id] || ''}
                        onChange={(e) => handleRemarkChange(form.id, e.target.value)}
                      />
                    </td>
                    <td>
                      <button
                        style={{ backgroundColor: 'green' }}
                        onClick={() => updateAPPROVEStatus(form.id, true)}
                      >
                        APPROVE
                      </button>
                      <button
                        style={{ backgroundColor: 'red' }}
                        onClick={() => updateDENYStatus(form.id,true)}
                      >
                        DENY
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <br></br>
            <div>
              <History />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Interview;