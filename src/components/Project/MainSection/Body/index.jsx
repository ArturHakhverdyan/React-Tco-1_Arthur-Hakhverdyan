import { useCallback } from "react";
import { useState } from "react";
import { Button } from "reactstrap";
import { CardComponent } from "../../CardComponent";
import "./styles.css";
import { connect } from "react-redux";
import {  deleteSingleCardThunk, removeMultipleTasksThunk, taskStatusChangeThunk } from "../../../../redux/actions/task-actions";

const ConnectedBody = ({ tasks, removeMultipleTasks,deleteSingleCard,taskStatusChange }) => {
  const [deletedTasksSet, setDeletedTasksSet] = useState(new Set());

  const taskStatusChangeHendler = useCallback((_id, status) => {

    taskStatusChange(_id,status)
  }, [taskStatusChange])


  const deleteCardHendler = useCallback((_id) => { 
    deleteSingleCard(_id)
  }, [deleteSingleCard])

  const toggleDeletedTask = useCallback((_id) => {
    setDeletedTasksSet((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(_id)) {
        newSet.delete(_id);
      } else {
        newSet.add(_id);
      }
      return newSet;
      
    });
    
  }, []);

  const handleBatchDelete = () => {
    const batchDelTasks = Array.from(deletedTasksSet);
    removeMultipleTasks(batchDelTasks)
      setDeletedTasksSet(new Set())

  };

  return (
    <>
      <div>
        {!!deletedTasksSet.size && (
          <Button color="danger" onClick={handleBatchDelete}>
            Delete All
          </Button>
        )}
      </div>
      <div className="main-section-body">
        {tasks.map((todo) => {
          return (
            <CardComponent
              key={todo._id}
              todo={todo}
              toggleDeletedTask={toggleDeletedTask}
              taskStatusChangeHendler = {taskStatusChangeHendler}
              deleteCardHendler= {deleteCardHendler}
            />
          );
        })}
      </div>
    </>
  );
};


const mapStateToProps = (state) => ({
  tasks: state.taskReducerState.tasks
})
const mapDispatchToProps = (dispatch) => ({
  removeMultipleTasks: (deletedTasksIds) => dispatch(removeMultipleTasksThunk(deletedTasksIds)),
  deleteSingleCard:(taskId) => dispatch(deleteSingleCardThunk(taskId)),
  taskStatusChange : (taskStatus) => dispatch(taskStatusChangeThunk(taskStatus))
})

export const Body = connect(mapStateToProps, mapDispatchToProps)(ConnectedBody)
