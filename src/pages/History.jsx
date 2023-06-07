import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aehwgrirrnhmatqmqcsa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlaHdncmlycm5obWF0cW1xY3NhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MDg2NTg4MywiZXhwIjoxOTk2NDQxODgzfQ.DeXxoWY65kzpbvdxME16mAHj2KGMwDRg_jEGgUIxKc0';

const supabase = createClient(supabaseUrl, supabaseKey);

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