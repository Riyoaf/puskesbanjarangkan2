import { SearchIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";

interface InputSearchProps {
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function InputSearch({
  placeholder,
  value,
  onChange,
}: InputSearchProps) {
  return (
    <InputGroup>
      <InputGroupInput
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full"
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  );
}
