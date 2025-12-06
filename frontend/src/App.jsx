import { useEffect, useState } from 'react'

function App() {
  const [todos, settodos] = useState([]);
  const [loading, setloading] = useState(false);
  const [title,settitle]=useState('');
  const [description,setdescription]=useState('');
  useEffect(() => {
    getalltodos();
  }, [])

      async function getalltodos() {
      try {
        setloading(true);
        const response = await fetch('http://localhost:8000/getalltask');
        const data = await response.json();
        console.log(data.allTodo);
        settodos(data.allTodo);
      }
      catch (error) {
        console.log('Error while getalltodos', error);
      }
      finally {
        setloading(false);
        console.log('Finally ghus gy..')
      }
    }
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log('title',title);
    console.log('description',description);
    try {
      const response = await fetch('http://localhost:8000/createtask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/JSON',
        },
        body:JSON.stringify({title,description}),
        credentials: 'include'
      })
      const data = await response.json();
      console.log(data.newTodo);
      if(response.ok){
        alert('New task created Successfully!!')
        getalltodos();
      }
      else{
        alert('Task does not created Successfully!')
      }
    }
    catch (error) { 
      console.log('Error while creating Task',error);
    }
    finally {
        console.log('task create wala finally block me pahuch gy');
    }
  }

  return (
    <>
      <div className='w-3/6 mx-auto bg-orange-400 p-2 my-5'>
        <h1 className='text-black text-center text-2xl text-bold'>
          Welcome to our Chotu App!!
        </h1>
        <form onSubmit={submitHandler} className='flex flex-col'>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" onChange={(e)=>settitle(e.target.value)}/>
          <label htmlFor='description'>Description</label>
          <input type='text' name='description' id='description' onChange={(e)=>setdescription(e.target.value)}></input>
          <button className='p-2 m-3 bg-orange-700'>Submit</button>
        </form>
      </div>
      <div className='w-4/5 mx-auto'>
        {loading ? (
          <>
            <h1>loading all tasks... Please wait.</h1>
          </>
        ) : (
          <>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
              {
                todos.map((todo) => {
                  return <div id={todo._id} className='w-2/3 bg-pink-400 p-2 m-4'>
                    <h1>{todo.title}</h1>
                    <h2>{todo.description}</h2>
                  </div>
                })
              }
            </div>
          </>
        )}
      </div>

    </>
  )
}

export default App
