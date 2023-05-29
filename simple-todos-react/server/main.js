import { Meteor } from 'meteor/meteor';
import { TaskCollections } from '../imports/api/TasksCollection';

const insertTask = taskText => TaskCollections.insert({text:taskText});

Meteor.startup(()=>{
  if(TaskCollections.find().count() === 0){
    [
      'Introduction To C++',
      'Introduction To Python',
      'Introduction To Javascript',
      'Introduction To Rust',
      'Introduction To CSS',
    ].forEach(insertTask)
  }
})
