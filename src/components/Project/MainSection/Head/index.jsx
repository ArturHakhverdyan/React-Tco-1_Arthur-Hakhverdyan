
import { HeadRight } from "./HeadRight";
import "./styles.css";
export const Head = ({setTasks,setFilterField}) => {
  
  return <div className="main-section-head">

        <HeadRight setTasks = {setTasks} setFilterField = {setFilterField}/>
  </div>;
};
