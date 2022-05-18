import './styles.css'
import { Input, Button } from "reactstrap"
import { useState } from 'react'
import { SharedModal } from '../../../../../shared/sharedModal'


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

const SearchInput = () => {
    return (
        <Input type="serach" name="search" placeholder="search" />
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
            <SearchInput />
            {isShowAddTaskModal && (<SharedModal  onClose = {() => {
                setIsShowAddTaskModal(false)
            }} 
            setTasks = {setTasks}/>)}
            
        </div>
    )
}