import { IconType } from "react-icons";

interface InputBlockProps {
    placeholder: string;
    titulo: string;
    icon?: IconType;
    value: string;
    onChange: (value: string) => void;
}

const InputBlock: React.FC<InputBlockProps> = ({ placeholder, titulo, icon: Icon, value, onChange }) => {
    return (
        <div className="input_block">
            <p className="titulo">{titulo}</p>
            <input
                className="input_text"
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}

export default InputBlock;
