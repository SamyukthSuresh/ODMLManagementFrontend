import { React, useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'
import {
    Box,
    Button,
    Grommet,
    Text,
    TextInput,
    Image,
    Tabs,
    Tab
} from 'grommet';
import { Hide, View } from 'grommet-icons';
import signImage from '../assets/signIn.svg'
import { grommet } from 'grommet/themes';
const SignIn = () => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
    const [reveal, setReveal] = useState(false);
    const [get, setGet] = useState(true)
    const [otp, setOTP] = useState()
    const [roll, setRoll] = useState()
    const onSubmitSignIn = () => {
        console.log(username, password)
        if (username && password) {
            axios.post('http://127.0.0.1:3001/signinstudent', { suserid: username, password: password })
                .then(res => {
                    if ((res.data.status).length > 0) {
                        localStorage.setItem("suserid", res.data.suserid)
                        history.replace('/studentDashboard')
                    }
                }).catch(error => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Check your Credentials',
                        footer: 'Forgot Password? Try logging in with OTP!</a>'
                    })
                })
        }
    }
    const onSendOTP = () => {
        if (roll) {
            axios.post('http://127.0.0.1:3001/getotpsignin', { userid: roll })
                .then(res => {
                    if ((res.data)) {
                        setGet(false)
                    }
                }).catch(error => {
                    Toast.fire({
                        icon: 'error',
                        title: 'Invalid ID'
                    })
                })
        }
    }

    const onSubmitOTP = () => {
        if (otp) {
            axios.post('http://127.0.0.1:3001/verifysigninotp', { otp: otp })
                .then(res => {
                    if ((res.data)) {
                        localStorage.setItem("suserid", roll)
                        history.replace('/studentDashboard')
                    }
                }).catch(error => {
                    Toast.fire({
                        icon: 'error',
                        title: 'Wrong OTP'
                    })
                })
        }
    }

    document.body.style.overflow = "hidden"
    return (
        <Grommet full theme={grommet}>
            <Box fill align="center" justify="center">
                <Box height="small" width="large" style={{
                    marginBottom: "3%",
                }}>
                    <Image src={signImage} fit="contain" />
                </Box>
                <Tabs>
                    <Tab title="Credentials">
                        <Box pad="small" width="medium">
                            <Box
                                width="medium"
                                direction="row"
                                align="center"
                                round="small"
                                border
                                style={{
                                    marginBottom: "10%",
                                }}>
                                <TextInput
                                    plain
                                    placeholder="Username"
                                    name="username" type="name"
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}

                                />
                            </Box>

                            <Box
                                width="medium"
                                direction="row"
                                align="center"
                                round="small"
                                border
                            >
                                <TextInput
                                    plain
                                    placeholder="Password"
                                    name="password" type="password"
                                    // eslint-disable-next-line react/jsx-no-duplicate-props
                                    type={reveal ? 'text' : 'password'}
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                                <Button
                                    icon={reveal ? <View size="medium" /> : <Hide size="medium" />}
                                    onClick={() => setReveal(!reveal)}
                                />
                            </Box>

                            <Box direction="row" justify="between" margin={{ top: 'medium' }}>
                                <Button hoverIndicator="light-1" onClick={() => { }}>
                                    <Box data-testid="button3" pad="small" direction="row" align="center" gap="small">
                                        <Text color="purple" onClick={() => { history.push('/forgotpassword') }} >Forgot password</Text>
                                    </Box>
                                </Button>
                                <Button data-testid="button" active={true} onClick={onSubmitSignIn} type="submit" label="Log In" primary />
                            </Box>
                            <Box data-testid="button2" pad="medium" justify="center" align="center" gap="medium">
                                <Button hoverIndicator="light-1" onClick={() => { }}>
                                    <Text color="purple" onClick={() => { history.push('/signup') }} >Not Signed Up?</Text>
                                </Button>
                            </Box>
                        </Box>
                    </Tab>
                    <Tab title="OTP">
                        {get ?
                            <div>
                                <TextInput

                                    style={{ marginTop: "10%" }}
                                    placeholder="Enter Roll No"
                                    name="roll"
                                    // eslint-disable-next-line react/jsx-no-duplicate-props
                                    type={'text'}
                                    value={roll}
                                    onChange={(event) => setRoll(event.target.value)}
                                />
                                <Button style={{ marginTop: "7%" }} active={true} onClick={onSendOTP} type="submit" label="Get OTP" primary /></div> : <Box pad="small" width="medium">
                                <Box
                                    width="medium"
                                    direction="row"
                                    align="center"
                                    round="small"
                                    border
                                >
                                    <TextInput
                                        plain
                                        placeholder="Enter OTP"
                                        name="otp" type="password"
                                        // eslint-disable-next-line react/jsx-no-duplicate-props
                                        type={reveal ? 'text' : 'password'}
                                        value={otp}
                                        onChange={(event) => setOTP(event.target.value)}
                                    />
                                    <Button
                                        icon={reveal ? <View size="medium" /> : <Hide size="medium" />}
                                        onClick={() => setReveal(!reveal)}
                                    />
                                </Box>

                                <Box direction="row" justify="between" margin={{ top: 'medium' }}>
                                    <Button hoverIndicator="light-1" onClick={() => { }}>
                                        <Box data-testid="button3" pad="small" direction="row" align="center" gap="small">
                                            <Text color="purple" onClick={() => { setGet(true) }} >Cancel</Text>
                                        </Box>
                                    </Button>
                                    <Button data-testid="button" active={true} onClick={onSubmitOTP} type="submit" label="Submit OTP" primary />
                                </Box>
                            </Box>}
                    </Tab>
                </Tabs>
            </Box>
        </Grommet>
    );
};

export default (SignIn);