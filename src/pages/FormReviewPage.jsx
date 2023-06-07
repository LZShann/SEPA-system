import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js'
import { useParams } from 'react-router-dom';
import { Document, Page, Text, View, PDFViewer } from '@react-pdf/renderer';

const supabaseUrl = 'https://aehwgrirrnhmatqmqcsa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlaHdncmlycm5obWF0cW1xY3NhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MDg2NTg4MywiZXhwIjoxOTk2NDQxODgzfQ.DeXxoWY65kzpbvdxME16mAHj2KGMwDRg_jEGgUIxKc0';
const supabase = createClient(supabaseUrl, supabaseKey);

const FormReviewPage = (props) => {
  
    const { id } = useParams();
  
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [age, setAge] = useState('');
    const [nric, setNric] = useState('');
    const [pob, setPob] = useState('');
    const [nationality, setNationality] = useState('');
    const [religion, setReligion] = useState('');
    const [race, setRace] = useState('');
    const [estName1, setEstName1] = useState('');
    const [from1, setFrom1] = useState('');
    const [to1, setTo1] = useState('');
    const [fos1, setFos1] = useState('');
    const [qual1, setQual1] = useState('');
    const [estName2, setEstName2] = useState('');
    const [from2, setFrom2] = useState('');
    const [to2, setTo2] = useState('');
    const [fos2, setFos2] = useState('');
    const [qual2, setQual2] = useState('');
    const [estName3, setEstName3] = useState('');
    const [from3, setFrom3] = useState('');
    const [to3, setTo3] = useState('');
    const [fos3, setFos3] = useState('');
    const [qual3, setQual3] = useState('');
    const [languageSpoken, setLanguageSpoken] = useState('');
    const [languageWritten, setLanguageWritten] = useState('');
    const [textAreaWorkingSkill, setTextAreaWorkingSkill] = useState('');
    const [currentEmployer, setCurrentEmployer] = useState('');
    const [dateofjoining, setDateofjoining] = useState('');
    const [position, setPosition] = useState('');
    const [salary, setSalary] = useState('');
    const [nameOfEmployer1, setNameOfEmployer1] = useState('');
    const [positionHeld1, setPositionHeld1] = useState('');
    const [em_from1, setEm_from1] = useState('');
    const [em_to1, setEm_to1] = useState('');
    const [reasonOfLeaving1, setReasonOfLeaving1] = useState('');
    const [nameOfEmployer2, setNameOfEmployer2] = useState('');
    const [positionHeld2, setPositionHeld2] = useState('');
    const [em_from2, setEm_from2] = useState('');
    const [em_to2, setEm_to2] = useState('');
    const [reasonOfLeaving2, setReasonOfLeaving2] = useState('');
    const [nameOfEmployer3, setNameOfEmployer3] = useState('');
    const [positionHeld3, setPositionHeld3] = useState('');
    const [em_from3, setEm_from3] = useState('');
    const [em_to3, setEm_to3] = useState('');
    const [reasonOfLeaving3, setReasonOfLeaving3] = useState('');
    const [health, setHealth] = useState('');
    const [diseases, setDiseases] = useState('');
    const [rel_name1, setRel_name1] = useState('');
    const [rel_branch1, setRel_branch1] = useState('');
    const [rel_gender1, setRel_gender1] = useState('');
    const [rel_name2, setRel_name2] = useState('');
    const [rel_branch2, setRel_branch2] = useState('');
    const [rel_gender2, setRel_gender2] = useState('');
    const [rel_name3, setRel_name3] = useState('');
    const [rel_branch3, setRel_branch3] = useState('');
    const [rel_gender3, setRel_gender3] = useState('');
    const [expectedSalary, setExpectedSalary] = useState('');
    const [startWorkDate, setStartWorkDate] = useState('');

    useEffect(() => {
      fetchFormData(id);
      console.log('Status ID:', id);
    }, [id]);
    
    const fetchFormData = async (id) => {
      try {
        const { data, error } = await supabase
          .from('confirmation')
          .select(
            `
            firstName, middleName, lastName, gender, dob, age, nric, pob, nationality, religion, race, estName1, from1, to1, fos1, qual1,
            estName2, from2, to2, fos2, qual2, estName3, from3, to3, fos3, qual3, languageSpoken, languageWritten, textAreaWorkingSkill,
            currentEmployer, dateofjoining, position, salary, nameOfEmployer1, positionHeld1, em_from1, em_to1, reasonOfLeaving1,
            nameOfEmployer2, positionHeld2, em_from2, em_to2, reasonOfLeaving2, nameOfEmployer3, positionHeld3, em_from3, em_to3,
            reasonOfLeaving3, health, diseases, rel_name1, rel_branch1, rel_gender1, rel_name2, rel_branch2, rel_gender2, rel_name3,
            rel_branch3, rel_gender3, expectedSalary, startWorkDate
            `
          )
          .eq('id', id);

        if (error) {

          console.error('Error retrieving data:', error);
       
        } else {



          console.log('Retrieved data:', data);
  
          // Process the retrieved data as needed
          const retrievedFirstName = data[0].firstName;
          const retrievedMiddleName = data[0].middleName;
          const retrievedLastName = data[0].lastName;
          const retrievedGender = data[0].gender;
          const retrievedDob = data[0].dob;
          const retrievedAge = data[0].age;
          const retrievedNric = data[0].nric;
          const retrievedPob = data[0].pob;
          const retrievedNationality = data[0].nationality;
          const retrievedReligion = data[0].religion;
          const retrievedRace = data[0].race;
          const retrievedEstName1 = data[0].estName1;
          const retrievedFrom1 = data[0].from1;
          const retrievedTo1 = data[0].to1;
          const retrievedFos1 = data[0].fos1;
          const retrievedQual1 = data[0].qual1;
          const retrievedEstName2 = data[0].estName2;
          const retrievedFrom2 = data[0].from2;
          const retrievedTo2 = data[0].to2;
          const retrievedFos2 = data[0].fos2;
          const retrievedQual2 = data[0].qual2;
          const retrievedEstName3 = data[0].estName3;
          const retrievedFrom3 = data[0].from3;
          const retrievedTo3 = data[0].to3;
          const retrievedFos3 = data[0].fos3;
          const retrievedQual3 = data[0].qual3;
          const retrievedLanguageSpoken = data[0].languageSpoken;
          const retrievedLanguageWritten = data[0].languageWritten;
          const retrievedTextAreaWorkingSkill = data[0].textAreaWorkingSkill;
          const retrievedCurrentEmployer = data[0].currentEmployer;
          const retrievedDateofjoining = data[0].dateofjoining;
          const retrievedPosition = data[0].position;
          const retrievedSalary = data[0].salary;
          const retrievedNameOfEmployer1 = data[0].nameOfEmployer1;
          const retrievedPositionHeld1 = data[0].positionHeld1;
          const retrievedEm_from1 = data[0].em_from1;
          const retrievedEm_to1 = data[0].em_to1;
          const retrievedReasonOfLeaving1 = data[0].reasonOfLeaving1;
          const retrievedNameOfEmployer2 = data[0].nameOfEmployer2;
          const retrievedPositionHeld2 = data[0].positionHeld2;
          const retrievedEm_from2 = data[0].em_from2;
          const retrievedEm_to2 = data[0].em_to2;
          const retrievedReasonOfLeaving2 = data[0].reasonOfLeaving2;
          const retrievedNameOfEmployer3 = data[0].nameOfEmployer3;
          const retrievedPositionHeld3 = data[0].positionHeld3;
          const retrievedEm_from3 = data[0].em_from3;
          const retrievedEm_to3 = data[0].em_to3;
          const retrievedReasonOfLeaving3 = data[0].reasonOfLeaving3;
          const retrievedHealth = data[0].health;
          const retrievedDiseases = data[0].diseases;
          const retrievedRel_name1 = data[0].rel_name1;
          const retrievedRel_branch1 = data[0].rel_branch1;
          const retrievedRel_gender1 = data[0].rel_gender1;
          const retrievedRel_name2 = data[0].rel_name2;
          const retrievedRel_branch2 = data[0].rel_branch2;
          const retrievedRel_gender2 = data[0].rel_gender2;
          const retrievedRel_name3 = data[0].rel_name3;
          const retrievedRel_branch3 = data[0].rel_branch3;
          const retrievedRel_gender3 = data[0].rel_gender3;
          const retrievedExpectedSalary = data[0].expectedSalary;
          const retrievedStartWorkDate = data[0].startWorkDate;
  
          // Set the state variables with the retrieved data
          setFirstName(retrievedFirstName);
          setMiddleName(retrievedMiddleName);
          setLastName(retrievedLastName);
          setGender(retrievedGender);
          setDob(retrievedDob);
          setAge(retrievedAge);
          setNric(retrievedNric);
          setPob(retrievedPob);
          setNationality(retrievedNationality);
          setReligion(retrievedReligion);
          setRace(retrievedRace);
          setEstName1(retrievedEstName1);
          setFrom1(retrievedFrom1);
          setTo1(retrievedTo1);
          setFos1(retrievedFos1);
          setQual1(retrievedQual1);
          setEstName2(retrievedEstName2);
          setFrom2(retrievedFrom2);
          setTo2(retrievedTo2);
          setFos2(retrievedFos2);
          setQual2(retrievedQual2);
          setEstName3(retrievedEstName3);
          setFrom3(retrievedFrom3);
          setTo3(retrievedTo3);
          setFos3(retrievedFos3);
          setQual3(retrievedQual3);
          setLanguageSpoken(retrievedLanguageSpoken);
          setLanguageWritten(retrievedLanguageWritten);
          setTextAreaWorkingSkill(retrievedTextAreaWorkingSkill);
          setCurrentEmployer(retrievedCurrentEmployer);
          setDateofjoining(retrievedDateofjoining);
          setPosition(retrievedPosition);
          setSalary(retrievedSalary);
          setNameOfEmployer1(retrievedNameOfEmployer1);
          setPositionHeld1(retrievedPositionHeld1);
          setEm_from1(retrievedEm_from1);
          setEm_to1(retrievedEm_to1);
          setReasonOfLeaving1(retrievedReasonOfLeaving1);
          setNameOfEmployer2(retrievedNameOfEmployer2);
          setPositionHeld2(retrievedPositionHeld2);
          setEm_from2(retrievedEm_from2);
          setEm_to2(retrievedEm_to2);
          setReasonOfLeaving2(retrievedReasonOfLeaving2);
          setNameOfEmployer3(retrievedNameOfEmployer3);
          setPositionHeld3(retrievedPositionHeld3);
          setEm_from3(retrievedEm_from3);
          setEm_to3(retrievedEm_to3);
          setReasonOfLeaving3(retrievedReasonOfLeaving3);
          setHealth(retrievedHealth);
          setDiseases(retrievedDiseases);
          setRel_name1(retrievedRel_name1);
          setRel_branch1(retrievedRel_branch1);
          setRel_gender1(retrievedRel_gender1);
          setRel_name2(retrievedRel_name2);
          setRel_branch2(retrievedRel_branch2);
          setRel_gender2(retrievedRel_gender2);
          setRel_name3(retrievedRel_name3);
          setRel_branch3(retrievedRel_branch3);
          setRel_gender3(retrievedRel_gender3);
          setExpectedSalary(retrievedExpectedSalary);
          setStartWorkDate(retrievedStartWorkDate);
        }
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    };
    const renderPDF = () => (
      <Document>
        <Page>
          <View>
          <Text>First Name: {firstName}</Text>
        <Text>Middle Name: {middleName}</Text>
        <Text>Last Name: {lastName}</Text>
        <Text>Gender: {gender}</Text>
        <Text>Date of Birth: {dob}</Text>
        <Text>Age: {age}</Text>
        <Text>NRIC: {nric}</Text>
        <Text>Place of Birth: {pob}</Text>
        <Text>Nationality: {nationality}</Text>
        <Text>Religion: {religion}</Text>
        <Text>Race: {race}</Text>

        <Text>Educational Qualification 1:</Text>
        <View>
          <Text>Establishment Name: {estName1}</Text>
          <Text>From: {from1}</Text>
          <Text>To: {to1}</Text>
          <Text>Field of Study: {fos1}</Text>
          <Text>Qualification: {qual1}</Text>
        </View>

        <Text>Educational Qualification 2:</Text>
        <View>
          <Text>Establishment Name: {estName2}</Text>
          <Text>From: {from2}</Text>
          <Text>To: {to2}</Text>
          <Text>Field of Study: {fos2}</Text>
          <Text>Qualification: {qual2}</Text>
        </View>

        <Text>Educational Qualification 3:</Text>
        <View>
          <Text>Establishment Name: {estName3}</Text>
          <Text>From: {from3}</Text>
          <Text>To: {to3}</Text>
          <Text>Field of Study: {fos3}</Text>
          <Text>Qualification: {qual3}</Text>
        </View>

        <Text>Language Spoken: {languageSpoken}</Text>
        <Text>Language Written: {languageWritten}</Text>
        <Text>Working Skills: {textAreaWorkingSkill}</Text>

        <Text>Current Employer: {currentEmployer}</Text>
        <Text>Date of Joining: {dateofjoining}</Text>
        <Text>Position: {position}</Text>
        <Text>Salary: {salary}</Text>

        <Text>Previous Employment History:</Text>
        <View>
          <Text>Employer Name 1: {nameOfEmployer1}</Text>
          <Text>Position Held 1: {positionHeld1}</Text>
          <Text>From: {em_from1}</Text>
          <Text>To: {em_to1}</Text>
          <Text>Reason for Leaving: {reasonOfLeaving1}</Text>
        </View>

        <View>
          <Text>Employer Name 2: {nameOfEmployer2}</Text>
          <Text>Position Held 2: {positionHeld2}</Text>
          <Text>From: {em_from2}</Text>
          <Text>To: {em_to2}</Text>
          <Text>Reason for Leaving: {reasonOfLeaving2}</Text>
        </View>

        <View>
          <Text>Employer Name 3: {nameOfEmployer3}</Text>
          <Text>Position Held 3: {positionHeld3}</Text>
          <Text>From: {em_from3}</Text>
          <Text>To: {em_to3}</Text>
          <Text>Reason for Leaving: {reasonOfLeaving3}</Text>
        </View>

        <Text>Health: {health}</Text>
        <Text>Diseases: {diseases}</Text>

        <Text>Emergency Contact 1:</Text>
        <View>
          <Text>Name: {rel_name1}</Text>
          <Text>Branch: {rel_branch1}</Text>
          <Text>Gender: {rel_gender1}</Text>
        </View>

        <Text>Emergency Contact 2:</Text>
        <View>
          <Text>Name: {rel_name2}</Text>
          <Text>Branch: {rel_branch2}</Text>
          <Text>Gender: {rel_gender2}</Text>
        </View>

        <Text>Emergency Contact 3:</Text>
        <View>
          <Text>Name: {rel_name3}</Text>
          <Text>Branch: {rel_branch3}</Text>
          <Text>Gender: {rel_gender3}</Text>
        </View>

        <Text>Expected Salary: {expectedSalary}</Text>
        <Text>Start Work Date: {startWorkDate}</Text>
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

export default FormReviewPage;