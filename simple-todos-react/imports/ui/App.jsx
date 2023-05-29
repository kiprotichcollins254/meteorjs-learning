import React from 'react';

import { useTracker } from 'meteor/react-meteor-data';
import { TaskCollections } from '../api/TasksCollection.js';
import { Task } from './Task.jsx';
import { TaskForm } from './Tasks/TaskForm.jsx';

export const App = () => {
  const tasks = useTracker(()=> TaskCollections.find({},{sort:{createdAt:-1}}).fetch());

  const toggleChecked = ({_id,isChecked}) => {
    TaskCollections.update(_id,{
      $set:{
        isChecked:!isChecked
      }
    })
  }

  const deleteTask = ({_id}) => {
    TaskCollections.remove(_id)
  }
  return(
    <div className='app'>
    <header>
      <div className='app-bar'>
        <div className='app-header'>
           <h1>Kip ToDo App</h1>
        </div>
      </div>
    </header>
    
    <div className='main'>
      <TaskForm />
      <ul className='tasks'>
        {tasks.map(task=> 
        <Task 
         key={ task._id}
         task={task} 
         onCheckboxClick={toggleChecked} 
         onDeleteClick={deleteTask}
         />
        )}
      </ul>
    </div>
  </div>
  )
};
