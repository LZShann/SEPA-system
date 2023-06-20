import React, { useEffect, useState } from 'react';
import { supabase } from '../client';

import './Account-Interview-History.css';

const History = () => {
  const [formData, setFormData] = useState([]);
  const fetchFormData = async () => {
    try {
      const { data: confirmationData, error: confirmationError } = await supabase
        .from('confirmation')
        .select('id, trackingNumber, submissionDate, status, remark')
        .in('status', ['APPROVE', 'DENY']);
  
      const { data: bigFiveData, error: bigFiveError } = await supabase
        .from('bigfive')
        .select('id, trackingNumber, submissionDate, status, remark')
        .in('status', ['APPROVE', 'DENY']);
  
      if (confirmationError || bigFiveError) {
        console.error('Error retrieving data:', confirmationError || bigFiveError);
      } else {
        console.log('Retrieved confirmation data:', confirmationData);
        console.log('Retrieved bigfive data:', bigFiveData);
  
        // Merge the confirmationData and bigFiveData arrays
        const mergedData = [...confirmationData, ...bigFiveData];
  
        // Sort the merged data based on submissionDate
        mergedData.sort((a, b) => new Date(b.submissionDate) - new Date(a.submissionDate));
  
        setFormData(mergedData);
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };
  

  useEffect(() => {
    fetchFormData();
  }, []);

  return (
    <div>
      <p className="text-xl font-semibold">Approval History</p>
      <hr></hr>
      <div className="table-container">
        <table className="GeneratedTable">
          <thead>
            <tr>
              <th>Row Number</th>
              <th>Tracking Number</th>
              <th>Submission Date</th>
              <th>Status</th>
              <th>Remark</th>
            </tr>
          </thead>
          <tbody>
            {formData.map((form, index) => (
              <tr key={form.id}>
                <td>{index + 1}</td>
                <td>{form.trackingNumber}</td>
                <td>{new Date(form.submissionDate).toLocaleDateString()}</td>
                <td>{form.status}</td>
                <td>{form.remark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;