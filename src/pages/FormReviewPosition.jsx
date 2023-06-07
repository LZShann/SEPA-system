import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useParams } from 'react-router-dom';
import { Document, Page, Text, View, PDFViewer } from '@react-pdf/renderer';
const supabaseUrl = 'https://aehwgrirrnhmatqmqcsa.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlaHdncmlycm5obWF0cW1xY3NhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MDg2NTg4MywiZXhwIjoxOTk2NDQxODgzfQ.DeXxoWY65kzpbvdxME16mAHj2KGMwDRg_jEGgUIxKc0';
const supabase = createClient(supabaseUrl, supabaseKey);

const FormReviewPosition = () => {
    const { id } = useParams();
  // State variables to hold the form data
  const [position, setPosition] = useState("");
  const [pathList, setPathList] = useState([]);
  const [inputp1, setInputp1] = useState("");
  const [inputp2, setInputp2] = useState("");
  const [inputp3, setInputp3] = useState("");
  const [inputp4, setInputp4] = useState("");
  const [inputp5, setInputp5] = useState("");

  // Fetch form data when the component mounts or when the `props.id` changes
  useEffect(() => {
    fetchFormData(id);
    console.log('Status ID:', id);
  }, [id]);
  // Function to fetch form data from Supabase
  const fetchFormData = async (id) => {
    try {
      const { data, error } = await supabase
        .from('confirmation')
        .select('position, pathList, inputp1, inputp2, inputp3, inputp4, inputp5')
        .eq('id', id);

      if (error) {
        console.error('Error retrieving data:', error);
      } else {
        console.log('Retrieved data:', data);

        // Process the retrieved data as needed
        const retrievedPosition = data[0].position;
        const retrievedPathList = data[0].pathList;
        const retrievedInputp1 = data[0].inputp1;
        const retrievedInputp2 = data[0].inputp2;
        const retrievedInputp3 = data[0].inputp3;
        const retrievedInputp4 = data[0].inputp4;
        const retrievedInputp5 = data[0].inputp5;

        // Set the form data to the respective state variables
        setPosition(retrievedPosition);
        setPathList(retrievedPathList);
        setInputp1(retrievedInputp1);
        setInputp2(retrievedInputp2);
        setInputp3(retrievedInputp3);
        setInputp4(retrievedInputp4);
        setInputp5(retrievedInputp5);
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };
  const renderPDF = () => (
    <Document>
      <Page>
        <View>
        <Text> Position: {position}</Text>
        <Text>1. How did you know about our company? {pathList}</Text>
      <Text>2. Please give an example of how you resolved a major conflict or 
        contradiction that occurred with your parents? {inputp1}</Text>
      <Text>3. How do you handle pressure? {inputp2}</Text>
      <Text>4. What skills do you possess that will help you succeed in this position?{inputp3}</Text>
 
      <Text>5. What are your career goals? {inputp4}</Text>
        <Text>6. What makes you the best candidate for this position? {inputp5}</Text>
      </View>
    </Page>
  </Document>
);
   
return (
  <div>
    {/* Render the PDF */}
    <PDFViewer width="100%" height="800px">{renderPDF()}</PDFViewer>
  </div>
);
};



export default FormReviewPosition;