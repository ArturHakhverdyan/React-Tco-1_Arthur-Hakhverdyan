import './styles.css'
import { Input, Button } from "reactstrap"
import { useState } from 'react'


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
 export const ModalButton = () => {
    return (
        <div className='modal-button' > 
            <h1>
                Modal functionality
            </h1>
        </div>
    )
}



export const HeadRight = () => {
    const [modal,setModal] = useState(false)
    return (
        <div className="head-right">
             <div>
                {modal && <ModalButton />}
            </div>
            <div className='head-right-tools'>
            <Button 
                style={{width:'100%'}}
                color="info"
                outline
                onClick={() => {
                    setModal(!modal)
                }}
            >
                info
            </Button>
            <SortSelect />
            <SearchInput />
            </div>
        </div>
    )
}