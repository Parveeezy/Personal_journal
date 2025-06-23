import CardButton from "../CardButton/CardButton";
import "./JournalAddButton.css";
import add from "../../assets/add.svg";
export const JournalAddButton = () => {
  return (
    <CardButton className={"journal-add"}>
      <img src={add} alt="Add" />
      Новое восспоминание
    </CardButton>
  );
};
