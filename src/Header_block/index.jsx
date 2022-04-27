import "./styles.css";
import { Text } from "./TextContent";

export function HeadBlock () {
    const h1 = 'ԼԱՎԱԳՈՒՅՆ ԽԱՆՈՒԹՆԵՐ'
    const p1 = 'Միջազգային օնլայն խանութների 90%-ը առաքում չեն իրականացնում դեպի Հայաստանսակայն ONEX-ի միջոցով կարող եք ստանալ Ձեր առաքանիները Հայաստանում ու Արցախում՝ արագ և ապահով'
    return (
        <div className="header">
            <Text textH1 = {h1} textp = {p1}/>
        </div>
    )
}