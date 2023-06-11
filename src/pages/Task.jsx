import React, { useState, useEffect } from 'react';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-kanban';
import { Header, Sidebar, Navbar, Footer } from '../components';
import { useStateContext } from '../contexts/ContextProvider';

import { supabase } from "../client";
// import { HiDocumentText } from 'react-icons/hi';

// var columnTemplate = (data) => {
//   return (
//     <div className="header-template-wrap">
//       <div className={"header-icon e-icons " + data.keyField}></div>
//       <div className="header-text">{data.headerText}</div>
//     </div>
//   );
// };

var kanbanGrid = [
  {
    headerText: 'To Do',
    keyField: 'Open',
    allowToggle: true,
    // template: columnTemplate.bind(this)
  },

  {
    headerText: 'In Progress',
    keyField: 'InProgress',
    allowToggle: true,
  },

  {
    headerText: 'Testing',
    keyField: 'Testing',
    allowToggle: true,
    isExpanded: false,
  },

  {
    headerText: 'Done',
    keyField: 'Close',
    allowToggle: true,
  },
];



const Task = () => {

  const cardTooltipTemplate = (data) => {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td><b>Assignee : </b></td>
              <td>{data.assignee}</td>
            </tr>
            <tr>
              <td><b>Type : </b></td>
              <td>{data.task_type}</td>
            </tr>
            <tr>
              <td><b>Estimate : </b></td>
              <td>{data.estimate}</td>
            </tr>
            <tr>
              <td><b>Summary : </b></td>
              <td>{data.summary}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };


  const { activeMenu } = useStateContext();
  const [kanbanData, setkanbanData] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchKanbanData = async () => {
      let { data: kanbanData, error } = await supabase
        .from('kanban_task')
        .select('*')

      if (error) {
        setFetchError('Could not fetch data from kanban_task table');
        setkanbanData(null);
        console.log('error', fetchError);
      } else {
        setkanbanData(kanbanData);
        console.log('kanbanData: ', kanbanData);
      }
    };
    fetchKanbanData();
  }, []);


  return (
    <div className='flex relative'>
      {activeMenu ? (
        <div className="w-72 fixed sidebar bg-white ">
          <Sidebar />
        </div>
      ) : (
        <div className="w-0">
          <Sidebar />
        </div>
      )}
      <div
        className={
          activeMenu
            ? 'bg-main-bg min-h-screen md:ml-72 w-full  '
            : 'bg-main-bg w-full min-h-screen flex-2 '
        }
      >
        <div className="fixed md:static bg-main-bg navbar w-full ">
          <Navbar />
        </div>
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
          <Header category="App" title="Kanban" />
          <KanbanComponent
            id="kanban"
            keyField="status"
            dataSource={kanbanData}
            cardSettings={{ contentField: 'summary', headerField: 'id', selectionType: 'Multiple'}}
            enableTooltip={true} tooltipTemplate={cardTooltipTemplate}
          >
            <ColumnsDirective>
              {kanbanGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
            </ColumnsDirective> 
          </KanbanComponent>
        </div>
        <Footer />
      </div>
    </div>
  )
};

export default Task;