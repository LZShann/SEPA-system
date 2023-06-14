import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js'
import { useParams } from 'react-router-dom';
import { Document, Page, Text, View, StyleSheet, Image, PDFViewer } from '@react-pdf/renderer';
import logo from '../data/huachanglogo.png';
import { auto } from '@popperjs/core';
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

  const styles = StyleSheet.create({
    page2: {
      paddingVertical: 30,
    },

    container: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#112131',
      borderBottomStyle: 'solid',
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      alignItems: 'stretch',
    },
    detailColumn: {
      flexDirection: 'column',
      flexGrow: 9,
      textTransform: 'uppercase',
      marginTop: 40,
      marginHorizontal: 90,
    },
    columnContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    tableContainer: {
      flexDirection: 'column',
      marginBottom: 20,
    },
    row: {
      flexDirection: 'row',
    },
    cell: {
      flex: 1,
      borderWidth: 1,
      padding: 5,
    },
    image: {
      width: 80,
      height: 80,
      margin: 20,
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
      paddingHorizontal: 60,
    },
    sectionHeader: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      marginTop: 20,
    },
    fieldGroup: {
      marginBottom: 10,
    },

    label: {
      fontSize: 14,
      marginBottom: 5,
      fontWeight: 'bold',
    },
    tableLabel: {
      fontSize: 12,
      marginBottom: 5,
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
    },
    textAreaContainer: {
      height: 80,
      borderWidth: 1,
      borderColor: 'gray',
      marginBottom: 20,
      borderRadius: 4,
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      textAlign: 'center',
    },

  });


  const renderPDF = () => (
    <Document>
      <Page>

        <View style={styles.container}>
          <Image source={logo} style={styles.image}></Image>
          <View style={styles.detailColumn}>
            <Text style={styles.name}>Form Review</Text>
            <Text style={styles.subtitle}>{firstName} {middleName} {lastName}</Text>
          </View>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.sectionHeader}>Personal Details</Text>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Full Name: </Text>
            <View style={styles.inputContainer}>
              
              <Text style={styles.input}>{firstName} {middleName} {lastName}</Text>
            </View>
            <View style={styles.columnContainer}>
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Gender:</Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.input}>{gender}</Text>
                </View>
              </View>
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Date of birth:</Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.input}>{dob}</Text>
                </View>
              </View>
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Age:</Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.input}>{age}</Text>
                </View>
              </View>
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>NRIC:</Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.input}>{nric}</Text>
                </View>
              </View>
            </View>
            <View style={styles.columnContainer}>
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Place of birth:</Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.input}>{pob}</Text>
                </View>
              </View>
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Nationality:</Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.input}>{nationality}</Text>
                </View>
              </View>
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Religion:</Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.input}>{religion}</Text>
                </View>
              </View>
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Race:</Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.input}>{race}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.sectionHeader}>Education / Academic Qualification</Text>
          <View style={styles.tableContainer}>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}></Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>Establishment Name</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>From(Year)</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>To(Year)</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>Field of Studies (e.g Business)</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>Qualifications (e.g SPM)</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>University/ College/ Technical</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>{estName1}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>{from1}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>{to1}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>{fos1}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>{qual1}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>University/ College/ Technical</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>{estName2}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>{from2}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>{to2}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>{fos2}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>{qual2}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>Secondary</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>{estName3}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>{from3}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>{to3}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>{fos3}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>{qual3}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.sectionHeader}>Language</Text>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Language Spoken: </Text>
            <View style={styles.inputContainer}>
              <Text style={styles.input}>{languageSpoken}</Text>
            </View>
            <Text style={styles.label}>Language Written: </Text>
            <View style={styles.inputContainer}>
              <Text style={styles.input}>{languageWritten}</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.input} render={({ pageNumber, totalPages }) => (
            `Page ${pageNumber} of ${totalPages}`
          )} fixed />
        </View>

      </Page>

      <Page style={styles.page2}>
        <View style={styles.formContainer}>
          <Text style={styles.sectionHeader}>Working Skills</Text>
          <View style={styles.fieldGroup}>
            <View style={styles.textAreaContainer}>
              <Text style={styles.input}>{textAreaWorkingSkill} </Text>
            </View>
          </View>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.sectionHeader}>Current Company</Text>
          <Text style={styles.label}>Current Employer: </Text>
          <View style={styles.inputContainer}>
            <Text style={styles.input}>{currentEmployer}</Text>
          </View>
          <View style={styles.columnContainer}>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Date of Joining: </Text>
              <View style={styles.inputContainer}>
                <Text style={styles.input}>{dateofjoining}</Text>
              </View>
            </View>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Position: </Text>
              <View style={styles.inputContainer}>
                <Text style={styles.input}>{position}</Text>
              </View>
            </View>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Salary: </Text>
              <View style={styles.inputContainer}>
                <Text style={styles.input}>{salary}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.sectionHeader}>Employment History</Text>
          <View style={styles.tableContainer}>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}></Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>Employer Name</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>Position Held</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>From</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>To</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>Reason of Leaving</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>1</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>{nameOfEmployer1}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>{positionHeld1}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>{em_from1}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>{em_to1}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>{reasonOfLeaving1}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>2</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>{nameOfEmployer2}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>{positionHeld2}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>{em_from2}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>{em_to2}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>{reasonOfLeaving2}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>3</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>{nameOfEmployer3}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>{positionHeld3}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>{em_from3}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>{em_to3}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>{reasonOfLeaving3}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.sectionHeader}>Health Condition and Status</Text>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Health: </Text>
            <View style={styles.inputContainer}>
              <Text style={styles.input}>{health}</Text>
            </View>
          </View>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>If chosen Bad, what are the diseases? </Text>
            <View style={styles.inputContainer}>
              <Text style={styles.input}>{diseases}</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.input} render={({ pageNumber, totalPages }) => (
            `Page ${pageNumber} of ${totalPages}`
          )} fixed />
        </View>

      </Page>

      <Page style={styles.page2}>

        <View style={styles.formContainer}>
          <Text style={styles.sectionHeader}>Relatives working in Huachang Growmax</Text>
          <View style={styles.tableContainer}>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}></Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>Name</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>Branch/Department</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>Gender (M/F)</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>1</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>{rel_name1}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>{rel_branch1}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>{rel_gender1}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>2</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>{rel_name2}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>{rel_branch2}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>{rel_gender2}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>3</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>{rel_name3}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>{rel_branch3}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tableLabel}>{rel_gender3}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Expected Salary: </Text>
            <View style={styles.inputContainer}>
              <Text style={styles.input}>{expectedSalary}</Text>
            </View>
          </View>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Start Work Date:</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.input}>{startWorkDate}</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.input} render={({ pageNumber, totalPages }) => (
            `Page ${pageNumber} of ${totalPages}`
          )} fixed />
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