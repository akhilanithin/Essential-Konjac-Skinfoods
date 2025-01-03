import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import Modal from 'react-modal';
import ALink from '~/components/features/custom-link';

import { showSuccessToast, showWarningToast, showInfoToast, showErrorToast } from '~/pages/api/auth/tost'

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        display: 'flex',
    },
};

let index = 0;

Modal.setAppElement('#__next');

const LoginModal: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPhone, setRegisterPhone] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerFirstName, setRegisterFirstName] = useState('');
    const [registerLastName, setRegisterLastName] = useState('');
    const [registerConfirmPsw, setRegisterConfirmPsw] = useState('');
    const [registerAddress, setRegisterAddress] = useState('');
    const [registerCity, setRegisterCity] = useState('');
    const [registercountry, setRegistercountry] = useState('');

    

    
    


    const router = useRouter();

    const closeModal = () => {
        setTimeout(() => {
            setOpen(false);
        }, 330);
    };

    const openModal = (e: React.MouseEvent<HTMLAnchorElement>, loginIndex = 0) => {
        e.preventDefault();
        index = loginIndex;
        setOpen(true);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();


            if (response.ok) {
                // Save token and user data (localStorage or cookies)
                localStorage.setItem('token', data?.token);
                localStorage.setItem('user', JSON.stringify(data?.user));



                // Redirect to the account page
                router.push('/pages/account/');
            } else {
                showWarningToast(data.message || 'Login failed!');
            }


        } catch (error) {
            // console.error('Error logging in:', error);
            showInfoToast('Something went wrong. Please try again.');
        }
    };



    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('https://essentialkonjacskinfoods.com/api/v1/en/customer/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone: registerPhone,
                    email: registerEmail,
                    password: registerPassword,
                    firstName: registerFirstName,
                    lastName: registerLastName,
                    confirmPassword:registerConfirmPsw,
                    address:registerAddress,
                    city:registerCity,
                    country:registercountry
                }),


            });

            const data = await response.json();
            if (response.ok) {
                showSuccessToast(data.message || 'Registration successful! Please log in.');
                index = 0; // Switch to login tab
                setEmail(registerEmail);

            } else {
                showWarningToast(data.message || 'Registration failed!');
            }
        } catch (error) {
            // console.error('Error registering:', error);
            showInfoToast('Something went wrong. Please try again.');
        }
    };


    return (
        <>
            <a className="login-link" href="#" onClick={(e) => openModal(e)}>
                <i className="d-icon-user"></i>Login
            </a>

            {open && (
                <Modal
                    isOpen={open}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Login Modal"
                    className="login-popup"
                    overlayClassName="login-popup-overlay"
                    shouldReturnFocusAfterClose={false}
                    id="login-modal"
                >
                    <div className="form-box">
                        <div className="tab tab-nav-simple tab-nav-boxed form-tab">
                            <Tabs selectedTabClassName="active" selectedTabPanelClassName="active" defaultIndex={index}>
                                <TabList className="nav nav-tabs nav-fill align-items-center border-no justify-content-center mb-5">
                                    <Tab className="nav-item">
                                        <span className="nav-link border-no lh-1 ls-normal">Sign in</span>
                                    </Tab>
                                    <li className="delimiter">or</li>
                                    <Tab className="nav-item">
                                        <span className="nav-link border-no lh-1 ls-normal">Register</span>
                                    </Tab>
                                </TabList>

                                <div className="tab-content">
                                    <TabPanel className="tab-pane">
                                        <form onSubmit={handleLogin}>

                                            <div className="form-group mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Username or Email Address *"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="Password *"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                />
                                            </div>

                                            <button className="btn btn-dark btn-block btn-rounded" type="submit">
                                                Login
                                            </button>
                                        </form>
                                    </TabPanel>

                                    <TabPanel className="tab-pane">
                                        <form onSubmit={handleRegister}>

                                            {/* Phone number */}

                                            <div className="form-group">
                                                <label>Your Phone number *:</label>
                                                <input
                                                    type="phonenumber"
                                                    className="form-control"
                                                    placeholder="Your Phone number with code *"
                                                    value={registerPhone}
                                                    onChange={(e) => setRegisterPhone(e.target.value)}
                                                    required
                                                />
                                            </div>

                                            {/* Email */}

                                            <div className="form-group">
                                                <label>Your email address *:</label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="Your Email address *"
                                                    value={registerEmail}
                                                    onChange={(e) => setRegisterEmail(e.target.value)}
                                                    required
                                                />
                                            </div>

                                            {/* Password */}

                                            <div className="row">
                                                <div className="col-xs-6">
                                                    <div className="form-group">
                                                        <label>Password:</label>
                                                        <input
                                                            type="password"
                                                            className="form-control"
                                                            placeholder="Password"
                                                            value={registerPassword}
                                                            onChange={(e) => setRegisterPassword(e.target.value)}
                                                        
                                                        />
                                                    </div>
                                                </div>

                                                {/* Confirm Password */}

                                                <div className="col-xs-6">
                                                    <div className="form-group">
                                                        <label htmlFor="email-address">Confirm Password : </label>
                                                        <input
                                                            type="password"
                                                            className="form-control"
                                                            placeholder="Confirm Password"
                                                            value={registerConfirmPsw}
                                                            onChange={(e) => setRegisterConfirmPsw(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* First Name */}

                                            <div className="row">
                                                <div className="col-xs-6">
                                                    <div className="form-group">
                                                        <label>FirstName:</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="FirstName"
                                                            value={registerFirstName}
                                                            onChange={(e) => setRegisterFirstName(e.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Last Name */}


                                                <div className="col-xs-6">
                                                    <div className="form-group">
                                                        <label htmlFor="email-address">LastName : </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="LastName"
                                                            value={registerLastName}
                                                            onChange={(e) => setRegisterLastName(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

{/* Address */}
                                            <div className="form-group">
                                                <label>Address:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Address"
                                                    value={registerAddress}
                                                    onChange={(e) => setRegisterAddress(e.target.value)}
                                               
                                                />
                                            </div>



{/* city */}


                                            <div className="row">
                                                <div className="col-xs-6">
                                                    <div className="form-group">
                                                        <label>City:</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="City"
                                                            value={registerCity}
                                                            onChange={(e) => setRegisterCity(e.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                                {/* country */}


                                                <div className="col-xs-6">
                                                    <div className="form-group">
                                                        <label htmlFor="email-address">Country : </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Country"
                                                            value={registercountry}
                                                            onChange={(e) => setRegistercountry(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>



                                            <button className="btn btn-dark btn-block btn-rounded" type="submit">
                                                Register
                                            </button>
                                        </form>
                                    </TabPanel>
                                </div>
                            </Tabs>
                        </div>
                    </div>
                    <button title="Close (Esc)" type="button" className="mfp-close" onClick={closeModal}>
                        <span>×</span>
                    </button>
                </Modal>
            )}
        </>
    );
};

export default LoginModal;
