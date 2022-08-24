import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import { useParams } from 'react-router-dom';

const Profile = () => {
    const { id } = useParams();
    const [errors, setErrors] = useState({});
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });

    const [userShipping, setUserShipping] = useState({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        phoneNumber: '',
    });

    const [userBilling, setUserBilling] = useState({
        fullName: '',
        cardNumber: '',
        expirationDate: '',
    });

    // Basic user information on change handle
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    // Shipping information on change handle
    const handleShippingChange = (e) => {
        setUserShipping({
            ...userShipping,
            [e.target.name]: e.target.value,
        });
    };

    // Billing information on change handle
    const handleBillingchange = (e) => {
        setUserBilling({
            ...userBilling,
            [e.target.name]: e.target.value,
        });
    };

    // Get current user
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/user", { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
                setUserShipping(res.data.shippingAddress);
                setUserBilling(res.data.billingInformation);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // Handle for editing main profile data
    const submitProfileHandler = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:8000/api/users/${id}`, user, { credentials: 'include', withCredentials: true })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err.response);
                setErrors(err.data);
            })
    };

    // Handle for editing shipping info
    const submitShippingHandler = (e) => {
        console.log(userShipping);
        e.preventDefault();
        axios
            .put(`http://localhost:8000/api/users/${id}`, 
            {
                shippingAddress: {...userShipping}
            }, 
            { credentials: 'include', withCredentials: true })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err.response);
                setErrors(err.data);
            })
    };

    // Handle for editing billing info
    const submitBillingHandler = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:8000/api/users/${id}`, 
            {
                billingInformation: {...userBilling}
            }, 
            { credentials: 'include', withCredentials: true })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err.response);
                setErrors(err.data);
            })
    };

    return (
        <div>
            <Header />
            <div className='container profileContainer'>
                <div className='row'>
                    <h1 className='mt-2'>Your Profile Page</h1>
                </div>
                <div>
                    <form className='form d-flex justify-content-center my-3' onSubmit={submitProfileHandler}>
                        <div className='col-4 mx-5'>
                            <div className='row my-4'>
                                <div className='col'>
                                    <div className='form-floating'>
                                        <input
                                            type="text"
                                            name='firstName'
                                            id='firstName'
                                            value={user.firstName}
                                            className='form-control'
                                            onChange={handleChange}
                                            required
                                        />
                                    <label htmlFor="firstName">First Name</label>
                                    {errors.firstName && <span className="text-danger">{errors.firstName.message}</span>}
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className='form-floating'>
                                        <input
                                            type="text"
                                            name='lastName'
                                            id='lastName'
                                            value={user.lastName}
                                            className='form-control'
                                            onChange={handleChange}
                                            required
                                        />
                                        <label htmlFor="lastName">Last Name</label>
                                        {errors.lastName && <span className="text-danger">{errors.lastName.message}</span>}
                                    </div>
                                </div>
                            </div>
                            <div className='row align-items-center'>
                                <div className='form-floating'>
                                    <input
                                        type="email"
                                        name='email'
                                        id='email'
                                        value={user.email}
                                        className='form-control'
                                        onChange={handleChange}
                                        required
                                    />
                                    <label htmlFor="email" className='px-4'>Email</label>
                                    {errors.email && <span className="text-danger">{errors.email.message}</span>}
                                </div>
                            </div>
                            <div className='align-items-center mt-4 mb-4'>
                                <button className='btn btn-primary'>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className='d-flex justify-content-between'>
                    <div className='col-5'>
                        <h2>Shipping Information</h2>
                        <form onSubmit={submitShippingHandler}>
                            <div className=''>
                                <div className='row align-items-center'>
                                    <div className='form-floating my-3'>
                                        <input
                                            type="text"
                                            name='street'
                                            value={userShipping.street}
                                            className='form-control'
                                            onChange={handleShippingChange}
                                            required
                                        />
                                        <label htmlFor="fullName" className='px-4'>Street</label>
                                        {errors.street && <span className="text-danger">{errors.street.message}</span>}
                                    </div>
                                </div>
                                <div className='align-items-center py-2'>
                                    <div className='row'>
                                        <div className='form-floating col my-3'>
                                            <input
                                                type="text"
                                                name='city'
                                                value={userShipping.city}
                                                className='form-control'
                                                onChange={handleShippingChange}
                                                required
                                            />
                                            <label htmlFor="fullName" className='px-4'>City</label>
                                            {errors.city && <span className="text-danger">{errors.city.message}</span>}
                                        </div>
                                        <div className='form-floating col my-3'>
                                            <input
                                                type="text"
                                                name='state'
                                                value={userShipping.state}
                                                className='form-control'
                                                onChange={handleShippingChange}
                                                required
                                            />
                                            <label htmlFor="fullName" className='px-4'>State</label>
                                            {errors.state && <span className="text-danger">{errors.state.message}</span>}
                                        </div>
                                        <div className='form-floating col my-2'>
                                            <input
                                                type="number"
                                                name='zipCode'
                                                value={userShipping.zipCode}
                                                className='form-control'
                                                onChange={handleShippingChange}
                                                required
                                            />
                                            <label htmlFor="fullName" className='px-4'>Zip Code</label>
                                            {errors.zipCode && <span className="text-danger">{errors.zipCode.message}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className='row align-items-center'>
                                    <div className='form-floating'>
                                        <input
                                            type="tel"
                                            name='phoneNumber'
                                            value={userShipping.phoneNumber}
                                            className='form-control'
                                            onChange={handleShippingChange}
                                            required
                                        />
                                        <label htmlFor="fullName" className='px-4'>Phone Number</label>
                                        {errors.phoneNumber && <span className="text-danger">{errors.phoneNumber.message}</span>}
                                    </div>
                                    <div className='align-items-center mt-4 mb-4'>
                                        <button className='btn btn-success'>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className='col-5'>
                        <h2>Billing Information</h2>
                        <form onSubmit={submitBillingHandler}>
                            <div>
                                <div className='d-flex row align-items-center'>
                                    <div className='form-floating my-3'>
                                        <input
                                            type="text"
                                            name='fullName'
                                            id='fullName'
                                            value={userBilling.fullName}
                                            className='form-control'
                                            onChange={handleBillingchange}
                                            required
                                        />
                                        <label htmlFor="fullName" className='px-4'>Full Name</label>
                                        {errors.fullName && <span className="text-danger">{errors.fullName.message}</span>}
                                    </div>
                                </div>
                                <div className='d-flex row align-items-center'>
                                    <div className='form-floating my-3'>
                                        <input
                                            type="number"
                                            name='cardNumber'
                                            id='cardNumber'
                                            value={userBilling.cardNumber}
                                            className='form-control'
                                            onChange={handleBillingchange}
                                            required
                                        />
                                        <label htmlFor="cardNumber" className='px-4'>Card Number</label>
                                        {errors.cardNumber && <span className="text-danger">{errors.cardNumber.message}</span>}
                                    </div>
                                    <div className='d-flex form-floating my-3'>
                                        <input
                                            type="date"
                                            name='expirationDate'
                                            id='expirationDate'
                                            value={userBilling.expirationDate}
                                            className='form-control'
                                            onChange={handleBillingchange}
                                            required
                                        />
                                        <label htmlFor="expirationDate" className='px-4'>Card expiration date</label>
                                        {errors.expirationDate && <span className="text-danger">{errors.expirationDate.message}</span>}
                                    </div>
                                </div>
                            </div>
                            <div className='align-items-center mt-4 mb-4'>
                                <button className='btn btn-success'>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
