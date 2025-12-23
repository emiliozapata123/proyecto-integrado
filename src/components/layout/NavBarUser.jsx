const NavBarUser = ({ sidebarOpen }) => {
    return (
        <nav className="navbar-mobile d-flex align-items-center justify-content-between px-3">
            
            <button className="btn text-white" onClick={() => sidebarOpen(true)}>
                <i className="bi bi-list fs-3"></i>
            </button>

            <h4 className="logo mb-0">Prevy<span>Seg</span></h4>

            <div className="profile-circle">
                MA
            </div>
        </nav>
    );
};

export default NavBarUser;
