import './styles.css'

export function Text (props) {
    return (
        <div className='text'>
            <h1>{props.textH1}</h1>
            <p>{props.textp}</p>
        </div>
    )
}