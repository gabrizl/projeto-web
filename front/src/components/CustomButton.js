import styles from '../styles/button.module.css';

function CustomButton(props) {
  return (
    <button className={`${styles.button}`} style={props.styled} onClick={props.onClick}>
        {props.iconUrl && (
          <img src={props.iconUrl} alt='icon' width={30}/>
        )}
        
        <span>{props.text}</span>
        </button>
  );
}

export default CustomButton;