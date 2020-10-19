import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import Header from './Header';
import Footer from './Footer';
import InfoToolTip from './InfoTooltip';

export default function Login({ handleLogin, isInfoToolOpen, onClose, forInfoTool }) {

    const validationSchema = yup.object().shape({
        username: yup.string().typeError('Type will be String').required('Обязательное поле'),
        password: yup.string().typeError('Type will be String').required('Обязательное поле')
    });

    return (
        <>
            <InfoToolTip isOpen={isInfoToolOpen} onClose={onClose} text={forInfoTool.message} icon={forInfoTool.icon} />
            <Header />
            <Formik
                initialValues={{
                    username: '',
                    password: ''
                }}
                validateOnBlur
                onSubmit={(values) => {
                    handleLogin(values.username, values.password);
                    values.username = '';
                    values.password = '';
                }}
                validationSchema={validationSchema}
                
            >
                {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
                    <section className='auth-section'>
                        <h2 className='auth-section__title'>Вход</h2>
                        <form className='auth-section__form' onSubmit={handleSubmit} noValidate>
                            <input
                                className='auth-section__input'
                                type='text'
                                placeholder='Username'
                                value={values.username}
                                name='username'
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <p className='pop-up__form-error'>{touched.username && errors.username && errors.username}</p>
                            <input
                                className='auth-section__input'
                                type='password'
                                placeholder='Password'
                                value={values.password}
                                name='password'
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <p className='pop-up__form-error'>{touched.password && errors.password && errors.password}</p>
                            <button
                                type='submit'
                                className='auth-section__button'
                                disabled={!isValid || !dirty}
                            >
                                Войти
                            </button>
                        </form>
                    </section>
                )}
            </Formik>
            <Footer />
        </>
    )
}
