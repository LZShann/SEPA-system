import React from 'react';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-kanban';

import { kanbanData, kanbanGrid } from '../data/dummy';
import { Header, Sidebar, Navbar, Footer } from '../components';
import { useStateContext } from '../contexts/ContextProvider';

const Task = () => {

  const { activeMenu } = useStateContext();
  
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
                keyField="Status"
                dataSource={kanbanData}
                cardSettings={{ contentField: 'Summary', headerField: 'Id' }}
              >
                <ColumnsDirective>
                  {/* eslint-disable-next-line react/jsx-props-no-spreading */}
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