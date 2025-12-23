const Buscador = () => {
    return (
        <section className="py-4 text-center w-100">
            <div className="container-fluid">
                <div className="d-flex justify-content-center align-items-center gap-3 flex-wrap">

                <i className="bi bi-search text-white fs-4"></i>

                <input
                    type="text"
                    className="form-control w-50 border-light bg-transparent text-white"
                    placeholder="Buscar cursos..."
                />

                <button className="btn btn-warning">Todos</button>

                <select className="form-select w-auto bg-dark text-white border-light">
                    <option selected>Todos</option>
                    <option value="1">Seguridad privada</option>
                    <option value="2">Seguridad marítima</option>
                    <option value="3">Formación OS-10</option>
                </select>

                <i className="bi bi-funnel-fill text-white fs-4"></i>
                </div>
            </div>
        </section>
    )
}
export default Buscador;