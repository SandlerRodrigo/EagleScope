
export interface TextFieldWithIconsProps {
  onTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: React.ReactNode;
  placeholder: string;
  className?: string;
  label?: string;
  border?: boolean;
}

const TextFieldWithIcons: React.FC<TextFieldWithIconsProps> = ({
  onTextChange,
  icon,
  placeholder,
  className,
  label,
  border
}) => {
  return (
    <>
    {label && (
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
    )}
      <label className={`focus:border-none input ${border && "border-[#D6D9DE]"} ${className} flex items-center `}>
        {icon}
        <input  
          placeholder={placeholder}
          className={"input w-full border-none "} 
          onChange={onTextChange}
          />
      </label>
      </>
  );
}

export default TextFieldWithIcons;