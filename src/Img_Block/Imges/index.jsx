import './styles.css';

export function Imges (props) {
    return(
        <div className='imges'>
            <img src={props.ImgUrl} alt="" className='imges-img'/>
        </div>
    )
}