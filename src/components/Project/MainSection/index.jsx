import { Body } from "./Body";
import { Head } from "./Head";
import "./styles.css";
export const MainSection = ({tasks,setTasks}) => {
 
  return (
    <div className="main-section">
      <Head setTasks = {setTasks}/>
      <Body tasks = {tasks} setTasks = {setTasks}/>
    </div>
  );
};
