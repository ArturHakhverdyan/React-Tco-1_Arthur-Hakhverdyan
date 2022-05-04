import Styled from './styles.module.css'
export const Input = ({changeValue}) => {
    return (
        <div className={Styled['input-box']}>
            <input type="text"  className={Styled.input} onChange = {changeValue}/>
        </div>
    )
}