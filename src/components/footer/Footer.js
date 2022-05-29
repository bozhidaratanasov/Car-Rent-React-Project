const styles = {
    width: '100%',
    position: 'fixed',
    bottom: 0
};

export function Footer() {
    return (
        <div className="footer navbar-light bg-light" style={styles}>
            Car-Rental 2022 &copy;
        </div>
    );
}