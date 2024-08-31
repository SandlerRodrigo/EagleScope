import { IconType } from "react-icons";
 


function InputBlock(props : {placeholder: string, titulo: string, icon?: IconType}){
    return (
        <div className="input_block">
            <p className="titulo">{props.titulo}</p>
            <input className="input_text" type="text" placeholder={props.placeholder} />
        </div>
    )
}

export default InputBlock;