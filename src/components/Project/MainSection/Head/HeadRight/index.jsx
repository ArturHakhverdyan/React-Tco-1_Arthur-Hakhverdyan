import './styles.css'
import { Input, Button } from "reactstrap"
import { useEffect, useState } from 'react'
import { SharedModal } from '../../../../../shared/sharedModal'
import { BACKEND_URL } from '../../../../../consts'

  const SortSelect = ({ onChange }) => {
        return (
            <Input name="sort_by" type="select" onChange={onChange}>
                <option >Sort By</option>
                <option value={'creation_date_newest'}>Created Newest</option>
                <option value={'creation_date_oldest'}>Created Oldest</option>
                <option value={'completion_date_newest'}>Completed Newest</option>
                <option value={'completion_date_oldest'}>Completed Oldest</option>
                <option value={'a-z'}>A-Z</option>
                <option value={'z-a'}>Z-A</option>
            </Input>
        )
    }

export const HeadRight = ({ setTasks }) => {
    const [isShowAddTaskModal, setIsShowAddTaskModal] = useState(false);
    const [sortTaskFilter, setSortTaskFilter] = useState()
    const [searchTaskFilter, setSearchTaskFilter] = useState()
    const handleBtnClick = () => {
        if (isShowAddTaskModal) {
            setIsShowAddTaskModal(false)
        } else {
            setIsShowAddTaskModal(true)
        }
    }

    const sortTask = (e) => {
        const { value } = e.target
        setSortTaskFilter(value)
    }

    const searchTask = (e) => {
        const { value } = e.target
        setSearchTaskFilter(value)
    }
    useEffect(()=> {
        if (sortTaskFilter && searchTaskFilter) {
            fetch(`${BACKEND_URL}/task/?sort=${sortTaskFilter}&search=${searchTaskFilter} `)
                .then(res => res.json())
                .then(data => setTasks(data))
        } else if (sortTaskFilter) {
            fetch(`${BACKEND_URL}/task/?sort=${sortTaskFilter}`)
                .then(res => res.json())
                .then(data => setTasks(data))
    
        } else if (searchTaskFilter) {
            fetch(`${BACKEND_URL}/task/?search=${searchTaskFilter}`)
                .then(res => res.json())
                .then(data => setTasks(data))
        }
    },[sortTaskFilter,searchTaskFilter])

    

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