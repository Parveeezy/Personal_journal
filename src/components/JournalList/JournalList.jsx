import { useContext } from "react";
import { UserContext } from "../../context/user.context";
import CardButton from "../CardButton/CardButton";
import { JournalItem } from "../JournalItem/JournalItem";
import "./JournalList.css";

export const JournalList = ({ data }) => {
  const { userId } = useContext(UserContext);

  const sortedData = [...data]
    .filter((i) => i.userId === userId)
    .sort((a, b) => b.date - a.date);

  return (
    <div className="journal-list">
      {sortedData.length === 0 && (
        <div className="empty-data">Записи отсутствуют</div>
      )}
      {sortedData.length > 0 &&
        sortedData.map((el) => {
          return (
            <CardButton key={el.id}>
              <JournalItem data={el} />
            </CardButton>
          );
        })}
    </div>
  );
};
