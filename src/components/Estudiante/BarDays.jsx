const BarDays = ({setDia,dia}) => {
    const dias = ["Lunes","Martes","Miercoles","Jueves","Viernes"];

    return (
        <div className="dias-container">
            {dias.map((d) => (
                <button
                    key={d}
                    className={`dia-btn ${dia === d ? "active" : ""}`}
                    onClick={() => setDia(d)}
                >
                    {d}
                </button>
            ))}
        </div>
    )
}
export default BarDays;