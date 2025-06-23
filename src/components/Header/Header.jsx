import s from "./Header.module.css";
import logo from "../../../public/PersonalJournal.svg";

export const Header = () => {
  return (
    <header className={s.header}>
      <img className={s.logo} src={logo} alt="logo" />
    </header>
  );
};
