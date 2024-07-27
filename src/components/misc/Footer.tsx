import styles from "../../assets/styles/misc/footer.module.scss";

export default function Footer() {
    return (
        <>
            <div className={styles.footerBox} />
            <div className={styles.footer}>
                <div className={styles.mid}>
                    <header>
                        <a href={"https://www.facebook.com/privacy/policy/?entry_point=facebook_page_footer"}>Privacy Policy</a>
                        <a href={"https://about.meta.com/"}>About</a>
                        <a href={"https://developers.facebook.com/?ref=pf"}>Developers</a>
                        <a href={"https://www.facebook.com/policies/cookies/"}>Cookies</a>
                        <a href={"https://www.facebook.com/policies?ref=pf"}>Terms</a>
                    </header>
                    <hr />
                    <footer>
                        <p>Meta @ 2023</p>
                    </footer>
                </div>
            </div>
        </>
    );
}
