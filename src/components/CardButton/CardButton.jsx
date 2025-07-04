import "./CardButton.css";

const CardButton = ({ children, className, ...props }) => {
  const cl = `card-button ${className ? className : ""}`;
  return (
    <button className={cl} {...props}>
      {children}
    </button>
  );
};

export default CardButton;
