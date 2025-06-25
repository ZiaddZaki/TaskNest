import NewProject from './components/NewProject.jsx';
import { useState } from 'react';
import NoProjectSelected from './components/NoProjectSelected.jsx';
import Sidebar from './components/Sidebar.jsx'
import SelectedProject from './components/SelectedProject'
function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });

  function handelAddTask(text){
        setProjectsState(prevState=> {
          const taskId = Math.random();
          const newTask= {
            text: text,
            projectId: prevState.selectedProjectId,
            id: taskId
          }
      return{
        ...prevState,
        tasks: [newTask, ...prevState.tasks]
      }
    })
  }
  function handelDeleteTask(id){
    setProjectsState(prevState=>{
      return{
        ...prevState,
        tasks: task.filter((task) => task.id !== id)
      }
    });
  }

  function handelSelectProject(id){
    setProjectsState(prevState=>{
      return{
        ...prevState,
        selectedProjectId: id,
      }
    });
  }

  function handelStartAddProject(){
    setProjectsState(prevState=>{
      return{
        ...prevState,
        selectedProjectId: null,
      }
    });
  }
  function handelCancelAddProject(){
    setProjectsState(prevState=>{
      return{
        ...prevState,
        selectedProjectId: undefined,
      }
    });
  }

  function handelAddProject(projectData){
    setProjectsState(prevState=> {
      const newProject= {
        ...projectData,
        id: Math.random()
      }
      return{
        ...prevState,
        selectedProjectId: undefined,
        projects:[...prevState.projects, newProject]
      }
    })
  }

function handelDeleteProject(){
  setProjectsState(prevState=>{
    return{
      ...prevState,
      selectedProjectId: undefined,
      projects: prevState.projects.filter((project) => project.id !== prevState.selectedProjectId)
    }
  });
}

  const selectedProject =projectsState.projects.find(project=> project.id=== projectsState.selectedProjectId);

  let content = (<SelectedProject project={selectedProject}
    onDelete={handelDeleteProject}
    onAddTask ={handelAddTask}
    onDeleteTask={handelDeleteTask}
    tasks={projectsState.tasks}/>);

  if(projectsState.selectedProjectId===null){
    content =<NewProject onAdd={handelAddProject} onCancel={handelCancelAddProject}/>
  }else if(projectsState.selectedProjectId===undefined){
    content = <NoProjectSelected 
    onStartAddProject={handelStartAddProject}/>
  }

  return (
    <main className='h-screen my-8 flex gap-8' >
    <Sidebar projects={projectsState.projects}
    onStartAddProject={handelStartAddProject}
    onSelectProject={handelSelectProject}
    selectedProjectId={projectsState.selectedProjectId}
    />
    {content}
    </main>
  );
}

export default App;
