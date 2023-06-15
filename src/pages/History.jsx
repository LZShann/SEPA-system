import React, { useEffect, useState } from 'react';
import { supabase } from '../client';

const History = () => {
  const [formData, setFormData] = useState([]);

  const fetchFormData = async () => {
    try {
      const { data, error } = await supabase
        .from('confirmation')
        .select('id, trackingNumber, submissionDate, status')
        .in('status', ['APPROVE', 'DENY']);

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

  return (
    <div>
      <h1>History</h1>
      <hr></hr>
      <table>
        <thead>
          <tr>
            <th>Row Number</th>
            <th>Tracking Number</th>
            <th>Submission Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {formData.map((form, index) => (
            <tr key={form.id}>
              <td>{index + 1}</td>
              <td>{form.trackingNumber}</td>
              <td>{form.submissionDate}</td>
              <td>{form.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;