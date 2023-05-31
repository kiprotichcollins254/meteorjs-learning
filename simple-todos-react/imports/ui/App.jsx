import {Meteor} from 'meteor/meteor';
import React, { Fragment, useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TaskCollections } from '../api/TasksCollection.js';
import { Task } from './Task.jsx';
import { TaskForm } from './Tasks/TaskForm.jsx';
import { LoginForm } from './Auth/LoginForm.jsx';


export const App = () => {
  const [hideCompleted,setHideCompleted] = useState(false)
  const user = useTracker(()=>Meteor.user())
  const hideCompletedFilter = {isChecked:{$ne:true}}
  const userFilter = user ? {userId : user._id} : {}
  const logout = Meteor.logout();
  const pendingOnlyFilter = {...hideCompletedFilter,...userFilter}


  const tasks = useTracker(()=> {
    if(!user){
      return [];
    }
    return TaskCollections.find(hideCompleted ? pendingOnlyFilter : userFilter,{sort:{createdAt:-1}}).fetch()
  });
  
  const pendingTasksCount = useTracker(()=>{
    if(!user){
      return 0;
    }
    return  TaskCollections.find(hideCompletedFilter).count()
  })

  const pendingTaskTitle = `${
    pendingTasksCount ? `(${pendingTasksCount})` : ''
  }
   
  `

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

  // console.log(user)

  return(
    <div className='app'>
    { user ? (
    <Fragment>
        <header>
          <div className='app-bar'>
            <div className='app-header'>
              <h1>Kip ToDo App {pendingTaskTitle}</h1>
            </div>
            <div className='user' onClick={logout}>
              {user.username}
            </div>
          </div>
        </header>
        
        <div className='main'>
          <TaskForm user={user} />
          <div className='filter'>
          <button onClick={()=>setHideCompleted(!hideCompleted)}>
            {hideCompleted ? 'Show All' : 'Hide Completed'}
          </button>
          </div>
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
    </Fragment>
      ) : (
        <LoginForm/>
      )}
  </div>
  )
};
