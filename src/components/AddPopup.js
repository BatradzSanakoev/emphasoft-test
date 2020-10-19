import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import Close from '../images/close.png';

function AddPopup({ isOpen, onClose, onAddUser }) {

    const [initialValues, setInitialValues] = React.useState({
        id: '',
        username: '',
        first_name: '',
        last_name: '',
        password: '',
        is_active: false,
        last_login: '',
        is_superuser: false
    });

    const validationSchema = yup.object().shape({
        username: yup.string().typeError('Type will be String').min(1, 'Минимальное количество букв 1').max(150, 'Максимальное количество букв 150').matches('^[\\w.@+-]+$', 'Неверно введен ник пользователя').required('Обязательное поле'),
        first_name: yup.string().typeError('Type will be String').max(30, 'Максимальное количество букв 30'),
        last_name: yup.string().typeError('Type will be String').max(150, 'Максимальное количество букв 150'),
        password: yup.string().typeError('Type will be String').min(1, 'Минимальное количество букв 1').max(128, 'Максимальное количество букв 128').matches('^(?=.*[A-Z])(?=.*\\d).{8,}$', 'Неправильно введен пароль').required('Обязательное поле'),
        is_active: yup.boolean().typeError('Type will be Bool')
    });

    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validateOnBlur
            validationSchema={validationSchema}
            onSubmit={(values) => {
                onAddUser(values.username, values.first_name, values.last_name, values.password, values.is_active);
                setInitialValues({
                    id: '',
                    username: '',
                    first_name: '',
                    last_name: '',
                    password: '',
                    is_active: false
                });
            }}
        >
            {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
                <section className={`pop-up add-pop ${isOpen && 'pops-visible'}`}>
                    <div className='pop-up__container'>
                        <button className='pop-up__close-button' onClick={onClose}>
                            <img src={Close} alt='закрыть' className='pop-up__close-icon' />
                        </button>
                        <form className={`pop-up__form pop-up__form_add`} onSubmit={handleSubmit} noValidate>
                            <h2 className='pop-up__form-title'>Добавить пользователя</h2>
                            <fieldset className={'pop-up__form-input'}>
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
                                <div className='pop-up__input-item'>
                                    <p className='pop-up__label'>Password:</p>
                                    <input
                                        type='password'
                                        name='password'
                                        value={values.password}
                                        placeholder='Password'
                                        className='pop-up__input pop-up__input_edit-password'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                                <p className='pop-up__form-error'>{touched.password && errors.password && errors.password}</p>
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
                                <button
                                    type='submit'
                                    className='pop-up__button'
                                    disabled={!isValid || !dirty}
                                >
                                    Добавить
                            </button>
                            </fieldset>
                        </form>
                    </div>
                </section>
            )}
        </Formik>
    )
}

export default AddPopup;