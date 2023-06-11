import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useParams } from 'react-router-dom';
import { Document, Page, Text, View, Image, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import logo from '../data/huachanglogo.png';
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

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#112131',
      borderBottomStyle: 'solid',
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      alignItems: 'stretch',
    },
    image: {
      width: 80,
      height: 80,
      margin: 20,
    },
    detailColumn: {
      flexDirection: 'column',
      flexGrow: 9,
      textTransform: 'uppercase',
      marginTop: 40,
      marginHorizontal: 90,
    },
    name: {
      fontSize: 30,
    },
    subtitle: {
      fontSize: 10,
      justifySelf: 'flex-end',
      textAlign: 'center',
      marginTop: 5,
      marginLeft: 70,
    },
    formContainer: {
      paddingHorizontal: 70,
    },
    sectionHeader: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      marginTop: 20,
    },
    fieldGroup: {
      marginBottom: 10,
      alignItems: 'center',
    },
    fieldGroup2: {
      marginBottom: 10,
    },
    label: {
      fontSize: 14,
      marginBottom: 10,
      fontWeight: 'bold',
    },
    input: {
      fontSize: 12,
      marginBottom: 15,
      fontWeight: 'normal',
    },
    inputContainer: {
      borderWidth: 1,
      borderColor: 'gray',
      marginBottom: 10,
      borderRadius: 4,
      padding: 3,
      height: 23,
      width: 200,
    },
  });





  const renderPDF = () => (
    <Document>
      <Page>

        <View style={styles.container}>
          <Image source={logo} style={styles.image}></Image>
          <View style={styles.detailColumn}>
            <Text style={styles.name}>Form Review</Text>
            <Text style={styles.subtitle}>Position</Text>
          </View>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.sectionHeader}>Job Interest</Text>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Position</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.input}>{position}</Text>
            </View>
          </View>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.fieldGroup2}>
            <Text style={styles.label}>1. How did you know about our company?  </Text>
            <Text style={styles.input}>{pathList}</Text>
          </View>
          <View style={styles.fieldGroup2}>
            <Text style={styles.label}>2. Please give an example of how you resolved a major conflict or
              contradiction that occurred with your parents? </Text>
            <Text style={styles.input}>{inputp1}</Text>
          </View>
          <View style={styles.fieldGroup2}>
            <Text style={styles.label}>3. How do you handle pressure?  </Text>
            <Text style={styles.input}>{inputp2}</Text>
          </View>
          <View style={styles.fieldGroup2}>
            <Text style={styles.label}>4. What skills do you possess that will help you succeed in this position? </Text>
            <Text style={styles.input}>{inputp3}</Text>
          </View>
          <View style={styles.fieldGroup2}>
            <Text style={styles.label}>5. What are your career goals? </Text>
            <Text style={styles.input}>{inputp4}</Text>
          </View>
          <View style={styles.fieldGroup2}>
            <Text style={styles.label}>6. What makes you the best candidate for this position? </Text>
            <Text style={styles.input}>{inputp5}</Text>
          </View>
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