import User from '../User';
import classes from './Header.module.css';

export default async function Header() {
  return (
    <div className={classes.header}>
      <h3>老吴手工艺品展馆</h3>
      <User />
    </div>
  );
}
