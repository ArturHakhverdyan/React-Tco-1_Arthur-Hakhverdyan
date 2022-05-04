import Styled from './styles.module.css'
export const Result = ({value}) => {
    return (
        <div className={Styled['result-box']}>
            <p className={Styled.result}>Result :: {value} </p>
        </div>
    )
}