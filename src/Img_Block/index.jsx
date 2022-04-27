import { Imges } from './Imges';
import './styles.css';

export function ImgWrap () {
    const imgUrl1 = "https://onex.am/images/shops/svg/amazon.svg";
    const imgUrl2 = "https://onex.am/images/shops/svg/aliexpress.svg";
    const imgUrl3 = "https://onex.am/images/shops/svg/ebay.svg";
    const imgUrl4 = "https://onex.am/images/shops/svg/carters.svg";
    const imgUrl5= "https://onex.am/images/shops/svg/vs.svg";
    const imgUrl6 = "https://onex.am/images/shops/svg/gap.svg";
    const imgUrl7 = "https://onex.am/images/shops/svg/mk.svg";
    const imgUrl8 = "https://onex.am/images/shops/svg/forever21.svg";
    const imgUrl9 = "https://onex.am/images/shops/svg/hm.svg";
    const imgUrl10 = "https://onex.am/images/shops/svg/rl.svg";
    const imgUrl11 = "https://onex.am/images/shops/svg/ozon.svg";
    const imgUrl12 = "https://onex.am/images/shops/svg/taobao.svg";
    return (
        <div className='img-block'>
            <div className='img-block-1'>
            <Imges ImgUrl ={imgUrl1}/>
            <Imges ImgUrl ={imgUrl2}/>
            <Imges ImgUrl ={imgUrl3}/>
            <Imges ImgUrl ={imgUrl4}/>
            <Imges ImgUrl ={imgUrl5}/>
            <Imges ImgUrl ={imgUrl6}/>
            </div>
            <div className='img-block-2'>
            <Imges ImgUrl ={imgUrl7}/>
            <Imges ImgUrl ={imgUrl8}/>
            <Imges ImgUrl ={imgUrl9}/>
            <Imges ImgUrl ={imgUrl10}/>
            <Imges ImgUrl ={imgUrl11}/>
            <Imges ImgUrl ={imgUrl12}/>
            </div>
            <button>Բոլոր խանութները -»</button>
        </div>
        
    )
}