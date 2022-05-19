import './styles.css'
import { Input, Button } from "reactstrap"
import { useState } from 'react'
import { SharedModal } from '../../../../../shared/sharedModal'
import { BACKEND_URL } from '../../../../../consts'


const SortSelect = () => {
    return (
        <Input name="sort_by" type="select">
            <option>Sort By</option>
            <option>Newest First</option>
            <option>Oldest First</option>
            <option>Todo at Newest</option>
        </Input>
    )
}




export const HeadRight = ({setTasks}) => {
    const [isShowAddTaskModal, setIsShowAddTaskModal] = useState(false);
    const handleBtnClick = () => {
        if(isShowAddTaskModal) {
            setIsShowAddTaskModal(false)
        } else {
            setIsShowAddTaskModal(true)
        }
    }
    const searchTask = (e) => {
        fetch(`${BACKEND_URL}/task?search=${e.target.value}`)
        .then((res) => res.json())
        .then(data => setTasks(data) )
    }
    
    
    return (
        <div className="head-right">
            <Button
                style={{ width: '100%' }}
                color="info"
                outline
                onClick={handleBtnClick}
            >
                Add Task
            </Button>
            <SortSelect />
            <Input type="serach" name="search" placeholder="search" onChange={searchTask}/>
            {isShowAddTaskModal && (<SharedModal  onClose = {() => {
                setIsShowAddTaskModal(false)
            }} 
            setTasks = {setTasks}/>)}
            
        </div>
    )
}