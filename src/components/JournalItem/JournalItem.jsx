import "./JournalItem.css";

export const JournalItem = ({ data }) => {
  const date = new Intl.DateTimeFormat("ru-RU").format(data.date);
  return (
    <>
      <h2 className="journal-item__header">{data.title}</h2>
      <h2 className="journal-item__body">
        <div className="journal-item__date">{date}</div>
        <div className="journal-item__text">{data.text}</div>
      </h2>
    </>
  );
};
