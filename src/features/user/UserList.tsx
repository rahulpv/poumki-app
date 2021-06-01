import React, { useRef,FC, useState, useEffect } from 'react';
import http from '../../services/api';


import { useSelector } from 'react-redux';
import { setUsers } from '../user/usersSlice';
import {User, UserResponse, Users} from '../../interfaces/user.interface';
import { useAppDispatch } from '../../store';
import { RootState } from '../../rootReducer';
import './user.css';


import Header from "../header/Header";
import Footer from "../footer/Footer";
import dayjs from "dayjs";
import socketIOClient from "socket.io-client";
import {showAlert} from "../../util";

const UserList: FC = () => {
    const { users } = useSelector((state: RootState) => state);

    const dispatch = useAppDispatch();

    const socket = socketIOClient("http://api.exploresuite.com");

    useEffect(() => {


        socket.on("user updated", function (data) {

            http
                .get<null,Users>(`/users`)
                .then((res) => {

                    dispatch(setUsers(res));

                });

        });

        http
                .get<null,Users>(`/users`)
                .then((res) => {

                    dispatch(setUsers(res));

                });
    }, [dispatch]);

    function deleteUser(id:any) {
        http
            .delete<null, UserResponse>('/user/'+id)
            .then((res) => {
                if (res) {

                const { message} = res;
                  showAlert(message, 'success');

                }
            })
            .catch((error) => {
                console.log(error);
            });
    }


    return (
        <div className="container py-3">

            <Header />

            <div className="container mt-5">
                <div className="row g-5">
                    <div className="col-md-7 col-lg-7">
                        <h4 className="mb-3">User list</h4>
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Email</th>
                                <th scope="col">Create At</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users?.data.users.map((user,key) => (
                            <tr key={key}>
                                <th scope="row">{key+1}</th>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{dayjs(user.createdAt).format('DD-MM-YYYY')}</td>
                                <td className="pointer" onClick={() => deleteUser(user._id)} >Delete</td>
                            </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default UserList;
