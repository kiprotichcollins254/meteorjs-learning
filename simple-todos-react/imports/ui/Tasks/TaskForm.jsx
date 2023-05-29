import React, {useState} from "react";
import { TaskCollections } from "../../api/TasksCollection";

export const TaskForm = () => {
    const [text,setText] = useState("");

    const handleSubmit = e =>{
       e.preventDefault()

       if(!text) return;
       TaskCollections.insert({
        text:text.trim(),
        createdAt:new Date()
       })
    }

    return (
        <form className="task-form" onSubmit={handleSubmit} >
          <input type="text" placeholder="Enter Task To Do" value={text} onChange={(e)=>setText(e.target.value)} />
          <button type="submit">Add Task</button>
        </form>
    )
}