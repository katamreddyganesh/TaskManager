import {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import './TodoList.css'


export default function Task({user,setUser}) {
    const [form, setForm] = useState({"task":""});
    const [data, setData] = useState(() => {
        return user.login ? [] : (Array.isArray(user.data) ? user.data : []);
    });

    const [editId, setEditId] = useState(null);
    const [editValue, setEditValue] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        if (!user.login) {
            console.log(user.login, user.data,"i am useEffect in task.jsx")
            setData(Array.isArray(user.data) ? user.data:[]);
        } else {
            fetchTasks();
        }
    }, [user.login]); 


    // using get method for fetching tasks
    const fetchTasks = () =>{
        if (user["login"] === true){
            fetch(`http://127.0.0.1:8000/Tasks/all/`, {
                "method":"GET",
                "headers": {
                    "Authorization":`Bearer ${user['data'].access_token}`,
                    "Content-type":"application/json"
                }
            })
            .then(response=>
                {
                    if(!response.ok)
                    {
                        setData(null);
                        throw response;
                    }
                    return response.json()
                })
            .then(response=>setData(response))
            .catch(error=>
                {
                    if (error.status === 401){
                        setUser(prev=>({...prev,login:false}));
                        navigate('/signin');
                    }
                    console.error(error.message)
                })
        }}




    const handleData = e => {
        const {name, value} = e.target;
        setForm(obj => ({...obj, [name]:value}));
    }

    
    // using post method for adding tasks
    const handleForm = e =>{
        if(e.key==="Enter"&&e.target.value!==""){

            if(user["login"]===true)
            {
                e.target.value = ""
                const formData = new URLSearchParams();
                console.log(form);
                formData.append("task",form.task);
                fetch("http://127.0.0.1:8000/Tasks",
                    {
                        "method":"POST",
                        "headers":{
                            "Authorization":`Bearer ${user['data'].access_token}`,
                            "Content-Type":"application/x-www-form-urlencoded"
                        },
                        "body":formData
                    }
                )
                .then(response => {
                    return response.json()
                }
                )
                .then(response => fetchTasks(1))
                .catch(error => console.error(error))
            }
        else {   
            e.target.value = "";
            
            const nextCount = (user.count || 0) + 1;
            const new_data = {
                "id": nextCount, 
                "task": form.task 
            };
            
            // Ensure we are working with an array for guest tasks
            const currentTasks = Array.isArray(user.data) ? user.data : [];
            const updatedTasks = [...currentTasks, new_data];

            // This triggers App.jsx's useEffect, auto-saving to localStorage!
            setUser(prev => ({
                ...prev,
                count: nextCount,
                data: updatedTasks
            }));
            
            // Keep local component state in sync
            setData(updatedTasks);
        }

        }

    }

    
    // using delete method for deleting tasks
    const deleteTask = e => {
        // console.log("from delete function",e)
        if (typeof(e)==="number"){
            console.log("i am if")
            var id = `${e}`;
            console.log("i am id", typeof(id), id)
        }
        else{
            console.log("i am else")
            var  id = e.target.name;
            console.log("i am id",typeof(id), id)
        }

    
        
    
        if (!user.login) {
            const currentTasks = Array.isArray(user.data) ? user.data : [];
            const updatedTasks = currentTasks.filter(item => `${item.id}` !== id);
            
            setUser(prev => ({ ...prev, data: updatedTasks }));
            setData(updatedTasks);
            return; 
        }

        console.log(e.target.name,parseInt(id),id, "this is the id of task")
        fetch("http://127.0.0.1:8000/Delete_task/" + id,{
            "method":"DELETE",
            "headers":{
                "Authorization":`Bearer ${user['data'].access_token}`
            }

        })
        .then(response=>response.json())
        .then(response=>fetchTasks(1))
        .catch(error=>console.error(error))
    }

    
    // using patch method for updating tasks
    const patchTask = e =>{
        const body = {"task":editValue}
        if (!user.login) 
        {
            const currentTasks = Array.isArray(user.data) ? user.data : [];
            const updatedTasks = currentTasks.map(item=>(item.id===editId)?{...item, task : editValue}:item);
            setUser(prev => ({ ...prev, data: updatedTasks }));
            setData(updatedTasks);
            setEditId(null);
            return; 
        }

        fetch(`http://127.0.0.1:8000/Tasks/update_task/${editId}`,{
                "method":"PATCH",
                "headers":{
                    "Authorization":`Bearer ${user['data'].access_token}`,
                    "Content-Type":"application/json"
                },
                "body":JSON.stringify(body)
        })
        .then(response=>{
            if(!response.ok){
                throw new Error(`we have got new error ${hello}`)
            }
            setEditId(null);
            setEditValue(null);
            return response.json()
        })
        .then(response=>{
            fetchTasks(1);
            console.log(response,"respone after update")
             })
        .catch(error=>console.error(error))
        
    }

    const updateTask = e => {
        setEditValue(e.target.value);
    }    
    
    const store = (id, value) =>{
        setEditId(id);
        setEditValue(value);
        console.log(id, value, "editId, editValue")
    }


return (
    <div className='todo-container'>
        <div className='single-box'>
            <div className='todo-div1'>
                <input name="task" onKeyDown={handleForm} onChange={handleData} placeholder="Enter Your Task Here..." />
            </div>
            
            <div className='todo-div2'>
                {user.login && data && Array.isArray(data.tasks) ? (
                    data.tasks.map((item) => renderTaskRow(item))
                ) : Array.isArray(data) && data.length > 0 ? (
                    data.map((item) => renderTaskRow(item))
                ) : (
                    <p style={{color: "gray", margin: "10px"}}>No tasks yet.</p>
                )}
            </div>
        </div>
    </div>
);

function renderTaskRow(item) {
    const isCurrentlyEditing = editId === item?.id;
    return (
        <div key={item.id} className="sub-div2">
            {isCurrentlyEditing ? (
                <>  
                    <div className="input-div2">
                        <input className="task2" type="checkbox" id={`task-check${item?.id}`} onChange={()=>deleteTask(item?.id)} />
                        <input className="saveTask" value={editValue} size={editValue?.length || 1} onChange={updateTask} />
                    </div>
                    <div className="button-div2">
                        <button onClick={patchTask}>save</button> 
                    </div>
                </>
            ) : (
                <>  
                    <div className="input-div2">
                        <input className="task2" type="checkbox" id={`task-check${item?.id}`} onChange={()=>deleteTask(item?.id)} />
                        <span className="task1-text">{item?.task}</span> 
                    </div>
                    <div className="button-div2"> 
                        <label htmlFor={`task-edit${item?.id}`} className="editImage"><i class="fa-regular fa-pen-to-square"></i></label>
                        <input  className="task-edit" type="checkbox" id={`task-edit${item?.id}`} onChange={()=>store(item?.id, item?.task)} />
                    </div>
                    
                </>
            )}
            
        </div>
    );
}

};



