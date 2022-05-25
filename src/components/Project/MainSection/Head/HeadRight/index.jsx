import './styles.css'
import { Input, Button } from "reactstrap"
import { useState } from 'react'
import { SharedModal } from '../../../../../shared/sharedModal'
import { SORT_FIELDS } from '../../../../../consts'


  const SortSelect = ({ onChange }) => {
        return (
            <Input name="sort_by" type="select" onChange={onChange}>
                {SORT_FIELDS.map(({value,label}) => {
                    return <option value={value} key = {label} >
                        {label}
                    </option>
                })}
            </Input>
        )
    }

export const HeadRight = ({ setTasks,setFilterField }) => {
    const [isShowAddTaskModal, setIsShowAddTaskModal] = useState(false);
    const handleBtnClick = () => {
        if (isShowAddTaskModal) {
            setIsShowAddTaskModal(false)
        } else {
            setIsShowAddTaskModal(true)
        }
    }

    const sortTask = (e) => {
        const { value } = e.target
        setFilterField(['sort',value])
    }

    const searchTask = (e) => {
        const { value } = e.target
        setFilterField(['search',value])
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
            <SortSelect onChange={sortTask} />
            <Input type="serach" name="search" placeholder="search" onChange={searchTask} />
            {isShowAddTaskModal && (<SharedModal onClose={() => {
                setIsShowAddTaskModal(false)
            }}
                setTasks={setTasks} />)}
        </div>
    )
}