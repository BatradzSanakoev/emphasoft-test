import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import * as Api from './Api';
import Close from '../images/close.png';

export default function EditPopup({ isOpen, onClose, onUpdateUser, ID }) {

    const [initialValues, setInitialValues] = React.useState({
        id: '',
        username: '',
        first_name: '',
        last_name: '',
        is_active: false,
        last_login: '',
        is_superuser: false
    });

    const validationSchema = yup.object().shape({
        id: yup.number().typeError('Type will be String').required('Обязательное поле'),
        username: yup.string().typeError('Type will be String').min(1, 'Минимальное количество букв 1').max(150, 'Максимальное количество букв 150').matches('^[\\w.@+-]+$', 'Неверно введен ник пользователя').required('Обязательное поле'),
        first_name: yup.string().typeError('Type will be String').max(30, 'Максимальное количество букв 30'),
        last_name: yup.string().typeError('Type will be String').max(150, 'Максимальное количество букв 150'),
        // password: yup.string().typeError('Type will be String').min(1, 'Минимальное количество букв 1').max(128, 'Максимальное количество букв 128').matches('^(?=.*[A-Z])(?=.*\d).{8,}$', 'Неправильно введен пароль').required('Обязательное поле'),
        is_active: yup.boolean().typeError('Type will be Bool'),
        last_login: yup.string().typeError('Type will be String'),
        is_superuser: yup.boolean().typeError('Type will be Bool')
    });

    React.useEffect(() => {
        Api.loadUserInfo(ID)
            .then((user) => {
                setInitialValues({
                    id: user.id,
                    username: user.username,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    is_active: (user.is_active && true),
                    last_login: user.last_login ? user.last_login : '',
                    is_superuser: (user.is_superuser && true)
                });
            })
            .catch((err) => console.log({ message: err }));
    }, [ID]);


    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validateOnBlur
            validationSchema={validationSchema}
            onSubmit={(values) => {
                onUpdateUser(values.id, values.username, values.first_name, values.last_name, values.is_active);
            }}
        >
            {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
                <section className={`pop-up edit-pop ${isOpen && 'pops-visible'}`}>
                    <div className='pop-up__container'>
                        <button className='pop-up__close-button' onClick={onClose}>
                            <img src={Close} alt='закрыть' className='pop-up__close-icon' />
                        </button>
                        <form className={`pop-up__form pop-up__form_edit`} onSubmit={handleSubmit} noValidate>
                            <h2 className='pop-up__form-title'>Редактировать пользователя</h2>
                            <fieldset className={'pop-up__form-input'}>
                                <div className='pop-up__input-item'>
                                    <p className='pop-up__label'>ID:</p>
                                    <input
                                        type='text'
                                        name='id'
                                        value={values.id}
                                        placeholder='ID'
                                        className='pop-up__input pop-up__input_edit-id' id='edit-id-input'
                                        readOnly
                                    />
                                </div>
                                <div className='pop-up__input-item'>
                                    <p className='pop-up__label'>Username:</p>
                                    <input
                                        type='text'
                                        name='username'
                                        value={values.username}
                                        placeholder='Username'
                                        className='pop-up__input pop-up__input_edit-username'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                                <p className='pop-up__form-error'>{touched.username && errors.username && errors.username}</p>
                                <div className='pop-up__input-item'>
                                    <p className='pop-up__label'>First name:</p>
                                    <input
                                        type='text'
                                        name='first_name'
                                        value={values.first_name}
                                        placeholder='First name'
                                        className='pop-up__input pop-up__input_edit-first_name'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                                <p className='pop-up__form-error'>{touched.first_name && errors.first_name && errors.first_name}</p>
                                <div className='pop-up__input-item'>
                                    <p className='pop-up__label'>Last name:</p>
                                    <input
                                        type='text'
                                        name='last_name'
                                        value={values.last_name}
                                        placeholder='Last name'
                                        className='pop-up__input pop-up__input_edit-last_name'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                                <p className='pop-up__form-error'>{touched.last_name && errors.last_name && errors.last_name}</p>
                                <div className='pop-up__input-checkbox'>
                                    <p className='pop-up__label'>isActive:</p>
                                    <input
                                        type='checkbox'
                                        name='is_active'
                                        value={values.is_active}
                                        className='pop-up__checkbox pop-up__input_edit-isActive'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        checked={values.is_active}
                                    />
                                </div>
                                <p className='pop-up__form-error'>{touched.is_active && errors.is_active && errors.is_active}</p>
                                <div className='pop-up__input-item'>
                                    <p className='pop-up__label'>Last login:</p>
                                    <input
                                        type='text'
                                        name='last_login'
                                        value={values.last_login}
                                        placeholder='Last login'
                                        className='pop-up__input pop-up__input_edit-last_login'
                                        readOnly
                                    />
                                </div>
                                <div className='pop-up__input-item'>
                                    <p className='pop-up__label'>Is Superuser:</p>
                                    <input
                                        type='text'
                                        name='is_superuser'
                                        value={values.is_superuser}
                                        placeholder='Is Superuser'
                                        className='pop-up__input pop-up__input_edit-is_superuser'
                                        readOnly
                                    />
                                </div>
                                <button
                                    type='submit'
                                    className='pop-up__button'
                                    disabled={!isValid || !dirty}
                                >
                                    Изменить
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </section>
            )}
        </Formik>
    )
}