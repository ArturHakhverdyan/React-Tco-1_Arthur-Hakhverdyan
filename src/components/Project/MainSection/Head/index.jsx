
import { HeadRight } from "./HeadRight";
import "./styles.css";
export const Head = ({setTasks}) => {
  
  return <div className="main-section-head">

        <HeadRight setTasks = {setTasks}/>
  </div>;
};
