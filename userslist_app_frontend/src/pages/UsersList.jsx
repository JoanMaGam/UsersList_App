import { useQuery } from "react-query";
import { Link } from "react-router-dom";

import { getAllUsers } from "../services/users.services";
import '../index.css'


const UsersList = () => {

    const { data, status } = useQuery('users', getAllUsers);

    if (status === 'loading') return <h2>Getting Users..</h2>;
    if (status === 'error') return <h2>Download failed</h2>;

    return (
        <div className="users-list__container">
            <h1 className="users-list__title">LISTA DE USUARIOS</h1>
            <Link className="users-list__navlink" to={`/create`}>
                <button className="users-list__navlink-btn">Nuevo usuario</button>
            </Link>
            {status === 'success' && (
                <div className="users-list__table">
                    <ul className="users-list__table-title">
                        <li className="users-list__table-item">Nº</li>
                        <li className="users-list__table-item">Nombre</li>
                        <li className="users-list__table-item">Email</li>
                        <li className="users-list__table-item">Nombre de usuario</li>
                        <li className="users-list__table-item">Dirección</li>
                    </ul>
                    {data &&
                        data.map((user, index) => (
                            <ul className="users-list__user-items" key={index}>
                                <li className="users-list__user-item">{user.external_id}</li>
                                <li className="users-list__user-item">{user.name}</li>
                                <li className="users-list__user-item">{user.email}</li>
                                <li className="users-list__user-item">{user.username}</li>
                                <li className="users-list__user-item">{user.address.street}</li>
                            </ul>

                        ))}
                </div>
            )}
        </div>
    )
}

export default UsersList;