import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useParams } from 'react-router-dom';
import { Document, Page, Text, View, Image, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import logo from '../data/huachanglogo.png';

const supabaseUrl = 'https://aehwgrirrnhmatqmqcsa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlaHdncmlycm5obWF0cW1xY3NhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MDg2NTg4MywiZXhwIjoxOTk2NDQxODgzfQ.DeXxoWY65kzpbvdxME16mAHj2KGMwDRg_jEGgUIxKc0';
const supabase = createClient(supabaseUrl, supabaseKey);

const FormReviewBigFive = () => {
  const { id } = useParams();
  const [position, setPosition] = useState('');
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchFormData(id);
  }, [id]);

  const fetchFormData = async (id) => {
    try {
      const { data, error } = await supabase
        .from('bigfive')
        .select('position, question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, question11, question12, question13, question14, question15, question16, question17, question18, question19, question20, question21, question22, question23, question24, question25, question26, question27, question28, question29, question30, question31, question32, question33, question34, question35, question36, question37, question38, question39, question40, question41, question42, question43, question44, question45, question46, question47, question48, question49, question50')
        .eq('id', id);

      if (error) {
        console.error('Error retrieving data:', error);
      } else {
        console.log('Retrieved data:', data);

        const retrievedPosition = data[0].position;
        const retrievedQuestions = [];
        retrievedQuestions.push(data[0].question1);
        retrievedQuestions.push(data[0].question2);
        retrievedQuestions.push(data[0].question3);
        retrievedQuestions.push(data[0].question4);
        retrievedQuestions.push(data[0].question5);
        retrievedQuestions.push(data[0].question6);
        retrievedQuestions.push(data[0].question7);
        retrievedQuestions.push(data[0].question8);
        retrievedQuestions.push(data[0].question9);
        retrievedQuestions.push(data[0].question10);
        retrievedQuestions.push(data[0].question11);
        retrievedQuestions.push(data[0].question12);
        retrievedQuestions.push(data[0].question13);
        retrievedQuestions.push(data[0].question14);
        retrievedQuestions.push(data[0].question15);
        retrievedQuestions.push(data[0].question16);
        retrievedQuestions.push(data[0].question17);
        retrievedQuestions.push(data[0].question18);
        retrievedQuestions.push(data[0].question19);
        retrievedQuestions.push(data[0].question20);
        retrievedQuestions.push(data[0].question21);
        retrievedQuestions.push(data[0].question22);
        retrievedQuestions.push(data[0].question23);
        retrievedQuestions.push(data[0].question24);
        retrievedQuestions.push(data[0].question25);
        retrievedQuestions.push(data[0].question26);
        retrievedQuestions.push(data[0].question27);
        retrievedQuestions.push(data[0].question28);
        retrievedQuestions.push(data[0].question29);
        retrievedQuestions.push(data[0].question30);
        retrievedQuestions.push(data[0].question31);
        retrievedQuestions.push(data[0].question32);
        retrievedQuestions.push(data[0].question33);
        retrievedQuestions.push(data[0].question34);
        retrievedQuestions.push(data[0].question35);
        retrievedQuestions.push(data[0].question36);
        retrievedQuestions.push(data[0].question37);
        retrievedQuestions.push(data[0].question38);
        retrievedQuestions.push(data[0].question39);
        retrievedQuestions.push(data[0].question40);
        retrievedQuestions.push(data[0].question41);
        retrievedQuestions.push(data[0].question42);
        retrievedQuestions.push(data[0].question43);
        retrievedQuestions.push(data[0].question44);
        retrievedQuestions.push(data[0].question45);
        retrievedQuestions.push(data[0].question46);
        retrievedQuestions.push(data[0].question47);
        retrievedQuestions.push(data[0].question48);
        retrievedQuestions.push(data[0].question49);
        retrievedQuestions.push(data[0].question50);

        setPosition(retrievedPosition);
        setQuestions(retrievedQuestions);
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  const styles = StyleSheet.create({
    // Styles for the PDF document
    // ...

  });

  const renderPDF = () => (
    <Document>
      <Page>
        {/* PDF content */}
        {/* ... */}

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
          {/* Display questions 1 to 50 */}
          {questions.map((question, index) => (
            <View style={styles.fieldGroup2} key={index}>
              <Text style={styles.label}>{`${index + 1}. ${question}`}</Text>
              {/* Render the answer here */}
              {/* ... */}
            </View>
          ))}
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

export default FormReviewBigFive;
