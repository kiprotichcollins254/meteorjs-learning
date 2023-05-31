import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TaskCollections } from '../imports/api/TasksCollection';

const insertTask = (taskText,user) => TaskCollections.insert({text:taskText,userId:user._id,createdAt:new Date()});

const SEED_USERNAME = 'kipbz';
const SEED_PASSWORD = 'password';

Meteor.startup(()=>{

  if(!Accounts.findUserByUsername(SEED_USERNAME)){
    Accounts.createUser({
      username:SEED_USERNAME,
      password:SEED_PASSWORD,
    })
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME)

  if(TaskCollections.find().count() === 0){
    [
      'Introduction To C++',
      'Introduction To Python',
      'Introduction To Javascript',
      'Introduction To Rust',
      'Introduction To CSS',
    ].forEach(taskText => insertTask(taskText,user))
  }
})
