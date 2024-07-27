import styles from "@/assets/styles/sidebar/sidebar.module.scss";
import useAuth from "@/hooks/use-auth.ts";

interface Sidebar {
  children: JSX.Element;
  title: string;
}

export default function Sidebar({ children, title }: Sidebar) {
  const { auth } = useAuth();

  if (auth)
    return (
      <>
        <div className={styles.barSpace} />
        <div className={styles.bar}>
          <header>
            <div className={styles.bio}>
              <h2>{title}</h2>
            </div>
          </header>
          <hr />
          <div className={styles.content}>{children}</div>
        </div>
      </>
    );
}
