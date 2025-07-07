import CardButton from "../CardButton/CardButton";
import "./JournalAddButton.css";
import add from "../../assets/add.svg";
export const JournalAddButton = ({clearForm}) => {
  return (
    <CardButton className={"journal-add"} onClick={clearForm}>
      <img src={add} alt="Add" />
      Новое восспоминание
    </CardButton>
  );
};
