import {IOptions} from "../../../types/types";
import {FC} from "react";


interface MySelectProps {
    defaultValue: string;
    value: string | number;
    options: IOptions[];
    changeOnSort: (arg: string | number) => void;

}


const MySelect: FC<MySelectProps> = ({defaultValue, value, options, changeOnSort}) => {




    return (
        <select value={value} onChange={(e) => {changeOnSort(e.target.value)}}>
            <option value='' disabled>{defaultValue}</option>
            {options.map(option => (
                <option value={option.value} key={option.value}>{option.name}</option>
            ))}
        </select>
    );
};

export default MySelect;