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
    const [registerPassword, setRegisterPassword] = useState('');
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
            const response = await fetch('/api/auth/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: registerEmail, password: registerPassword }),
            });
            const data = await response.json();
            if (response.ok) {
                showSuccessToast('Registration successful! Please log in.');
                index = 0; // Switch to login tab
                setEmail(registerEmail); // Prefill email
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
                                            <div className="form-group">
                                                <label>Your email address:</label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="Your Email address *"
                                                    value={registerEmail}
                                                    onChange={(e) => setRegisterEmail(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Password:</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="Password *"
                                                    value={registerPassword}
                                                    onChange={(e) => setRegisterPassword(e.target.value)}
                                                    required
                                                />
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
