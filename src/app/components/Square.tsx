import styles from './css/square.module.css';

interface SquareProps {
    displayValue: any; // Define the type of displayValue
    buttonId: any;
    className: any;
}

function Square({ displayValue, buttonId, className }: SquareProps) {
    return <button className={`${styles['square']} ${styles[className]}`} data-button-id={buttonId}>
        {displayValue}
    </button>;
}

export default Square;