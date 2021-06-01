import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { User, UserResponse } from '../../interfaces/user.interface';
import * as Yup from 'yup';
import http from '../../services/api';
import { setUser } from './userSlice';
import { useAppDispatch } from '../../store';


import Header from "../header/Header";
import Footer from "../footer/Footer";
import {showAlert} from "../../util";
import socketIOClient from "socket.io-client";


const schema = Yup.object().shape({
    firstName: Yup.string().required('First Name required'),
    lastName: Yup.string().required('Last Name required'),
    email: Yup.string().required('Email required').email('Please provide a valid email address (abc@xy.z)'),
});


const UserAdd: FC = () => {

    const { handleSubmit, register, reset, formState: { errors } } = useForm<User>({
        resolver: yupResolver(schema),

    });

    const [loading, setLoading] = useState(false);

    const submitForm = (data: User) => {
        const path = '/users';
        http
            .post<User, UserResponse>(path, data)
            .then((res) => {
                if (res) {
                    reset();
                    const { message} = res;

                    showAlert(message, 'success');

                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };


    return (
        <div className="container py-3">

            <Header />

            <div className="container mt-5">
                <div className="row g-5">
                    <div className="col-md-7 col-lg-7">
                        <h4 className="mb-3">Add user</h4>
                        <form onSubmit={handleSubmit(submitForm)}>
                            <div className="row g-3">
                                <div className="col-sm-6">
                                    <label htmlFor="firstName" className="form-label">First name</label>
                                    <input {...register("firstName")} type="text" className={Object.keys(errors).length === 0? "form-control": errors.firstName? "form-control is-invalid": "form-control is-valid"} name="firstName" placeholder="firstName"/>

                                    {errors && errors.firstName && (
                                        <div className="invalid-feedback show"> {errors.firstName.message} </div>
                                    )}

                                </div>

                                <div className="col-sm-6">
                                    <label htmlFor="lastName" className="form-label">Last name</label>
                                    <input {...register("lastName")} type="text" className={Object.keys(errors).length === 0? "form-control": errors.lastName? "form-control is-invalid": "form-control is-valid"}  name="lastName" placeholder=""
                                    />
                                    {errors && errors.lastName && (
                                        <div className="invalid-feedback show"> {errors.lastName.message} </div>
                                    )}
                                </div>

                                <div className="col-12">
                                    <label htmlFor="email" className="form-label">Email </label>
                                    <input {...register("email")} type="email" className={Object.keys(errors).length === 0? "form-control": errors.email? "form-control is-invalid": "form-control is-valid"}  name="email"
                                           placeholder="you@example.com" />
                                    {errors && errors.email && (
                                        <div className="invalid-feedback show"> {errors.email.message} </div>
                                    )}
                                </div>

                            </div>

                            <hr className="my-4" />

                            <button className="w-100 btn btn-primary btn-lg" type="submit">Add
                            </button>
                        </form>
                    </div>
                </div>
            </div>


            <Footer />
        </div>
    );
};

export default UserAdd;
