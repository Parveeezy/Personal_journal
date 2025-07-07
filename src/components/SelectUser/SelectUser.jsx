import { useContext } from "react";
import { UserContext } from "../../context/user.context";
import s from './SelectUser.module.css'

export const SelectUser = () => {
  const { userId, setUserId } = useContext(UserContext);
  const changeUser = (e) => {
    setUserId(Number(e.target.value));
  };

  return (
    <select
      className={s["select"]}
      name="user"
      id="user"
      value={userId}
      onChange={changeUser}
    >
      <option value="1">Parviz</option>
      <option value="2">Melya</option>
    </select>
  );
};
