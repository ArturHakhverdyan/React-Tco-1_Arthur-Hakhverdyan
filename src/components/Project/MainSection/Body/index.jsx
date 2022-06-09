import { useCallback } from "react";
import { useState } from "react";
import { Button } from "reactstrap";
import { CardComponent } from "../../CardComponent";
import "./styles.css";
import { BACKEND_URL } from "../../../../consts";
import { connect } from "react-redux";
import { deleteSingleCardAction, removeMultipleTasksAction, taskStatusChangeAction } from "../../../../redux/actions/task-actions";

const ConnectedBody = ({ tasks, removeMultipleTasks,deleteSingleCard,taskStatusChange }) => {
  const [deletedTasksSet, setDeletedTasksSet] = useState(new Set());

  const taskStatusChangeHendler = useCallback((_id, status) => {

    fetch(`http://localhost:3001/task/${_id}`, {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify({
        status,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        taskStatusChange(data)
      });
  }, [taskStatusChange])


  const deleteCardHendler = useCallback((_id) => {
    fetch(`http://localhost:3001/task/${_id}`, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then(() => {
        deleteSingleCard(_id)
        
      })


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
    fetch(`${BACKEND_URL}/task`, {
      method: "PATCH",
      body: JSON.stringify({
        tasks: batchDelTasks,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        removeMultipleTasks(batchDelTasks)
      });
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
  removeMultipleTasks: (deletedTasksIds) => dispatch(removeMultipleTasksAction(deletedTasksIds)),
  deleteSingleCard:(taskId) => dispatch(deleteSingleCardAction(taskId)),
  taskStatusChange : (taskStatus) => dispatch(taskStatusChangeAction(taskStatus))
})

export const Body = connect(mapStateToProps, mapDispatchToProps)(ConnectedBody)
