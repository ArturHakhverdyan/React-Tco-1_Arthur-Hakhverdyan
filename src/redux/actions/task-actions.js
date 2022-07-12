import { getTasksRequest } from "../../api"
import { BACKEND_URL } from "../../consts"
import { getToken } from "../../helpers"

export const setTasksAction = (tasks) => {
    return {
        type: "SET_TASKS",
        payload: tasks
    }
}

export const removeMultipleTasksAction = (taskIds) => {
    return {
        type: "REMOVE_MULTIPLE_TASKS",
        payload: taskIds
    }
}

export const addNewTaskAction = (newTask) => {
    return {
        type: "ADD_NEW_TASK",
        payload: newTask
    }
}

export const deleteSingleCardAction = (taskId) => {
    return {
        type: "DELETE_SINGLE_CARD",
        payload: taskId
    }
}
export const taskStatusChangeAction = (taskId) => {
    return {
        type: "TASK_STATUS_CHANGE",
        payload: taskId
    }
}

export const editTaskAction = (newTask) => {
    return {
        type: "EDIT_TASK_ACTION",
        payload: newTask
    }
}

export const setTasksThunk = (query) => (dispatch, getState) => {
    getTasksRequest(query)
        .then(data => {
            dispatch(setTasksAction(data))
        })
}

export const addNewTaskThunk = (formData,onSubmitCallback) => (dispatch, getState) => {

    fetch(`${BACKEND_URL}/task`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${getToken()}`

        },
        body: JSON.stringify(formData),
    })
        .then((response) => response.json())
        .then((data) => {
            if(data.error) {
                throw data.error
            }
            dispatch(addNewTaskAction(data))
            onSubmitCallback();
        })
        .catch(err => console.log(err))
}
export const removeMultipleTasksThunk = (batchDelTasks) => (dispatch,getState) => {
    fetch(`${BACKEND_URL}/task`, {
        method: "PATCH",
        body: JSON.stringify({
          tasks: batchDelTasks,
        }),
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${getToken()}`

        },
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(removeMultipleTasksAction(batchDelTasks))
        });
}

export const deleteSingleCardThunk = (_id) => (dispatch,getState) => {
    fetch(`http://localhost:3001/task/${_id}`, {
        method: "DELETE",
      })
        .then(res => res.json())
        .then(() => {
          dispatch(deleteSingleCardAction(_id))    
        })
}


export const editTaskThunk = (_id,formEdit,onSubmitCallback) => (dispatch) => {
    fetch(`${BACKEND_URL}/task/${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json",
        authorization: `Bearer ${getToken()}`
    },
        body: JSON.stringify(formEdit),
    })
        .then((res) => res.json())
        .then((data) => {
            dispatch(editTaskAction(data))
            onSubmitCallback && onSubmitCallback()
        })

}

export const getTasksStatusThunk = (status) => (dispatch) => {
    
    fetch(`${BACKEND_URL}/task?status=${status}`,{
        headers: { "Content-Type": "application/json",
        authorization: `Bearer ${getToken()}`
    },
    })
    .then(res => res.json())
    .then(data => dispatch(setTasksAction(data)))
}

export const logOutThunk = (token) => () => {
    fetch(`${BACKEND_URL}/user/sign-out`,{
        method:"POST",
        headers:{"Content-Type": "application/json"},
        body:JSON.stringify({jwt:token})
    })
    .then(res => res.json())
    .then(() => {
        localStorage.removeItem("token")
        localStorage.removeItem("refreshToken")
    })
}