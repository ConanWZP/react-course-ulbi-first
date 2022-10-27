// @ts-ignore
import styles from './MyInput.module.css';
// @ts-ignore
import React, {FC} from "react";

interface MyInputProps {
    props?: any;
    ref?: HTMLInputElement;
}


const MyInput:FC<MyInputProps> = React.forwardRef((props, ref) => {
    return (
        <input ref={ref} {...props}  className={styles.myInput}/>
    );
});

export default MyInput;