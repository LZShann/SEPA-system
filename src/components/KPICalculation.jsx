import { useEffect, useState } from 'react';
import { supabase } from '../client';

const fetchChurnData = async () => {
  const { data, error } = await supabase.from('churn').select('customer_churn');

  if (error) {
    console.error('Error fetching churn data:', error);
  } else {
    const lastMonthChurn = 45;
    const currentChurn = data?.customer_churn || 0;
    const churnRate = (currentChurn / lastMonthChurn) * 100;

    return churnRate;
  }
};

export const useChurnData = () => {
  const [churnRate, setChurnRate] = useState(0);

  useEffect(() => {
    const fetchChurnRate = async () => {
      const rate = await fetchChurnData();
      setChurnRate(rate);
    };

    fetchChurnRate();
  }, []);

  return churnRate;
};

export const calculateKPI = (userDepartment) => {
  let actualKPI1, actualKPI2, actualKPI3;
  let targetedKPI1 = 20, targetedKPI2 = 30, targetedKPI3 = 50;
  let KPI1, KPI2, KPI3;

  if (userDepartment === 'Sales') {
    actualKPI1 = 10;
    actualKPI2 = 30;
    actualKPI3 = 50;
  } else if (userDepartment === 'Administrative') {
    actualKPI1 = 10;
    actualKPI2 = 20;
    actualKPI3 = 30;
  } else if (userDepartment === 'Marketing') {
    actualKPI1 = 10;
    actualKPI2 = 10;
    actualKPI3 = 20;
  }

  KPI1 = Math.ceil((actualKPI1 / targetedKPI1) * 100);
  KPI2 = Math.ceil((actualKPI2 / targetedKPI2) * 100);
  KPI3 = Math.ceil((actualKPI3 / targetedKPI3) * 100);

  const percentage = actualKPI1 + actualKPI2 + actualKPI3;

  return { KPI1, KPI2, KPI3, percentage };
};
