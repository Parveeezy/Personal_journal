import "./Button.css";

export const Button = ({ text, onClick }) => {
  // const [text, setText] = useState("Сохранить");
  // const clicked = () => {
  //   setText((t) => t + "!");
  // };

  return (
    <button className="button accent" onClick={onClick}>
      {text}
    </button>
  );
};
