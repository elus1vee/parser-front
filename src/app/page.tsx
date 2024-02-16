import LoginComponent from '@/components/login/login';
import styles from "./page.module.css";


export default function Home() {
  return (
    <main className={styles.main}>
      <LoginComponent/>
    </main>
  );
}
