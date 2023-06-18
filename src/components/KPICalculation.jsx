import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
const userDepartment = sessionStorage.getItem('currentUserDepartment');

const KPICalculation = () => {
  const [targetedKPI1] = useState(20);
  const [targetedKPI2] = useState(30);
  const [targetedKPI3] = useState(50);
  const [actualKPI1, setActualKPI1] = useState(0);
  const [actualKPI2, setActualKPI2] = useState(0);
  const [actualKPI3, setActualKPI3] = useState(0);
  const [KPI1, setKPI1] = useState(0);
  const [KPI2, setKPI2] = useState(0);
  const [KPI3, setKPI3] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [isChurned, setIsChurned] = useState(null);
  const [currentMonthData, setCurrentMonthError] = useState(null);
  const [previousMonthData, setPreviousMonthError] = useState(null);
  const [churnAccountRate, setChurnAccountRate] = useState(null);
  const [increaseRate, setIncreaseRate] = useState(null);
  const [increaseRevenue, setIncreaseRevenue] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const calculateKPI = () => {
      setKPI1(Math.ceil((actualKPI1 / targetedKPI1) * 100));
      setKPI2(Math.ceil((actualKPI2 / targetedKPI2) * 100));
      setKPI3(Math.ceil((actualKPI3 / targetedKPI3) * 100));
    };

    calculateKPI();
    setPercentage(actualKPI1 + actualKPI2 + actualKPI3);
  }, [actualKPI1, actualKPI2, actualKPI3]);

  useEffect(() => {
    if (userDepartment === 'Sales') {
      const fetchSalesKPI = async () => {
        // First KPI
        // Formula:
        // First KPI = (Last Month Churn Rate - Current Churn Rate) * 100
        let { data: isChurned, error } = await supabase
          .from('customer_data_entry') // Table name
          .select('is_churned_account')

        if (error) {
          setFetchError('Could not fetch data from customer_data_entry');
          setIsChurned(null);
          console.log('error', error);
        }

        if (isChurned) {
          setFetchError(null);
          setIsChurned(isChurned);
          const totalCustomers = isChurned.length;
          const lastMonthChurn = 30; // Assuming last month's churn rate is 45%
          const currentChurnAccount = isChurned.reduce((count, account) => {
            if (account.is_churned_account) {
              return count + 1;
            }
            return count;
          }, 0);
          const currentChurnRate = Math.ceil((currentChurnAccount / totalCustomers) * 100);
          const churnRate = lastMonthChurn - currentChurnRate;
          setChurnAccountRate(churnRate);
          // KPI 1 formula
          if (churnRate >= 4) {
            setActualKPI1((100 / 100) * targetedKPI1);
          } else if (churnRate >= 2 && churnRate <= 3) {
            setActualKPI1((80 / 100) * targetedKPI1);
          } else if (churnRate >= 0 && churnRate <= 1) {
            setActualKPI1((60 / 100) * targetedKPI1);
          } else if (churnRate < 0) {
            setActualKPI1((40 / 100) * targetedKPI1);
          }


          // Second KPI
          // Formula: 
          // Second KPI = (Current Average Revenue per Customer / Previous Average Revenue per Customer - 1) * 100
          // Get the current date
          const currentDate = new Date();

          // Calculate the start and end dates for the current month
          const currentMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
          const currentMonthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

          // Calculate the start and end dates for the previous month
          const previousMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
          const previousMonthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);

          // Format the dates as strings in the format 'MM/DD/YYYY'
          const currentMonthStartStr = `${currentMonthStart.getMonth() + 1}/${currentMonthStart.getDate()}/${currentMonthStart.getFullYear()}`;
          const currentMonthEndStr = `${currentMonthEnd.getMonth() + 1}/${currentMonthEnd.getDate()}/${currentMonthEnd.getFullYear()}`;
          const previousMonthStartStr = `${previousMonthStart.getMonth() + 1}/${previousMonthStart.getDate()}/${previousMonthStart.getFullYear()}`;
          const previousMonthEndStr = `${previousMonthEnd.getMonth() + 1}/${previousMonthEnd.getDate()}/${previousMonthEnd.getFullYear()}`;

          // Retrieve the current month's data and previous month's data based on the order date
          const { data: currentMonthData, error: currentMonthError } = await supabase
            .from('sales_data_entry')
            .select('*, product:products_data_entry(*)')
            .gte('order_date', currentMonthStartStr)
            .lte('order_date', currentMonthEndStr);

          const { data: previousMonthData, error: previousMonthError } = await supabase
            .from('sales_data_entry')
            .select('*, product:products_data_entry(*)')
            .gte('order_date', previousMonthStartStr)
            .lte('order_date', previousMonthEndStr);

          if (currentMonthData && previousMonthData) {
            setCurrentMonthError(null);
            setPreviousMonthError(null);

            var currentTotalRevenue = 0; // Used to find total revenue for the current month
            currentMonthData.forEach((item) => {
              const revenue = item['quantity'] * item['product']['unit_price']; // Revenue formula
              currentTotalRevenue += revenue;
            });
            console.log("Current total revenue: " + currentTotalRevenue);
            var previousTotalRevenue = 0; // Used to find total revenue for the previous month
            previousMonthData.forEach((item) => {
              const revenue = item['quantity'] * item['product']['unit_price']; // Revenue formula
              previousTotalRevenue += revenue;
            });
            console.log("Previous total revenue: " + previousTotalRevenue);
            var currentAverageRevenue = currentTotalRevenue / totalCustomers; // Average revenue for the current month
            var previousAverageRevenue = previousTotalRevenue / totalCustomers; // Average revenue for the previous month
            var increaseRate = Math.ceil(((currentAverageRevenue / previousAverageRevenue) - 1) * 100);
            console.log("currentAverageRevenue: " + currentAverageRevenue);
            console.log("previousAverageRevenue: " + previousAverageRevenue);
            setIncreaseRate(increaseRate);
            console.log("Increase rate: " + increaseRate);
            if (increaseRate >= 8) {
              setActualKPI2((100 / 100) * targetedKPI2);
            } else if (increaseRate >= 4 && increaseRate <= 7) {
              setActualKPI2((80 / 100) * targetedKPI2);
            } else if (increaseRate >= 1 && increaseRate <= 3) {
              setActualKPI2((60 / 100) * targetedKPI2);
            } else {
              setActualKPI2((40 / 100) * targetedKPI2);
            }
          }

          // Third KPI
          // Formula: 
          // Second KPI = ((currentRevenue - baseRevenue(lastmonth)) / baseRevenue(lastmonth)) * 100;
          var increaseRevenue = Math.ceil(((currentTotalRevenue - previousTotalRevenue) / previousTotalRevenue) * 100);
          console.log("Increase revenue: " + increaseRevenue);
          setIncreaseRevenue(increaseRevenue);
          if (increaseRevenue >= 4) {
            setActualKPI3((100 / 100) * targetedKPI3);
          } else if (increaseRevenue >= 2 && increaseRevenue <= 3) {
            setActualKPI3((80 / 100) * targetedKPI3);
          } else if (increaseRevenue >= 0 && increaseRevenue <= 1) {
            setActualKPI3((60 / 100) * targetedKPI3);
          } else if (increaseRevenue < 0) {
            setActualKPI3((40 / 100) * targetedKPI3);
          }
        }
      };
      fetchSalesKPI();
    }

    if (userDepartment === 'Administrative') {
      // const fetchAccount = async () => {
      //   let { data, error } = await supabase
      //     .from('customer_data_entry') // Table name
      //     .select('increase_average_revenue')

      //   if (error) { // for error checking only 
      //   }
      // };
      // fetchAccount();
      setActualKPI1(10);
      setActualKPI2(10);
      setActualKPI3(20);
    }
    if (userDepartment === 'Marketing') {
      setActualKPI1(10);
      setActualKPI2(20);
      setActualKPI3(40);
    }
    if (userDepartment === 'Management') {
      setActualKPI1(10);
      setActualKPI2(20);
      setActualKPI3(40);
    }
  }, []);
  return null;
};
export default KPICalculation;
