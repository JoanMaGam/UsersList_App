import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";

import { createUser } from "../services/users.services";
import '../index.css'


const CreateUser = () => {

    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const sendForm = async (values) => {
        const response = await createUser(values);

        if (response.fatal) {
            return alert(response.fatal);
        }

        alert('Registro correcto');

        navigate('/');
    }

    return (
        <div className="create-user__container">
            <h1 className="create-user__title">CREACIÓN USUARIO NUEVO</h1>

            <Link className="create-user__navlink" to={`/`}>
                <button className="create-user__navlink-btn">Volver a Lista de usuarios</button>
            </Link>
            <form className="create-user__form" onSubmit={handleSubmit(sendForm)}>
                <div className="create-user__form-group">
                    <label className="create-user__form-label">Nombre</label>
                    <input type="text" className="create-user__form-input"
                        {...register('name', { required: 'Campo requerido' })} />
                </div>
                <div className="create-user__form-group">
                    <label className="create-user__form-label">Nombre de usuario</label>
                    <input className="create-user__form-input" type="text"
                        {...register('username', { required: 'Campo requerido' })} />
                </div>
                <div className="create-user__form-group">
                    <label className="create-user__form-label">Email</label>
                    <input className="create-user__form-input" type="email"
                        {...register('email', { required: 'Campo requerido' })} />
                </div>
                <div className="create-user__form-group">
                    <label className="create-user__form-label">ID externa</label>
                    <input className="create-user__form-input" type="text"
                        {...register('external_id')} />
                </div>
                <div className="create-user__form-group">
                    <label className="create-user__form-label">Dirección</label>
                    <input className="create-user__form-input" type="text"
                        {...register('address.street')} />
                </div>
                <input className="create-user__form-btn" type="submit" value="Guardar" />
            </form>
        </div>
    )
}

export default CreateUser;