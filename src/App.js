
import { DIV1 } from "./DIV1/DIV1"
import {DIV} from "./DIV/DIV"
import { TOP_BLOCK } from "./TOP_BlOCK/TOP_BLOCK";
import { MID } from "./MIDDLE_BLOCK/MIDDLE_BLOCK";
import { HeadBlock } from "./Header_block";
import { ImgWrap } from "./Img_Block";
 


function App() {
  return (
    <div className="App" id="barev">
        <DIV1 />
        <DIV />
        <TOP_BLOCK />
        <MID />
        <HeadBlock />
        <ImgWrap />
    </div>
  );
}

export default App;
