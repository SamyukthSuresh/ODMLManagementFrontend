import { React, useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import {
    Box,
    Button,
    Grommet,
    TextInput,
    Image,
    Anchor,
    Header,
    Nav,
    Text,
    Heading,
    Layer,
    Form,
    FormField,
    MaskedInput,

} from 'grommet';
import { Hide, View, User, StatusWarning, StatusGood, FormClose } from 'grommet-icons';
import passImage from '../assets/teacherpass.svg'
import { grommet } from 'grommet/themes';
const TeacherPasswordChange = () => {
    const history = useHistory();
    const [password, setPassword] = useState("")
    const [newpass, setPass] = useState('')
    const [email, setEmail] = useState("")
    const [reveal, setReveal] = useState(false);
    const [open, setOpen] = useState(false);
    const [otp, setOtp] = useState();
    const [notifyopen, setNotifyOpen] = useState(false);
    const [message, setMessage] = useState("")
    const [msgstatus, setMsgStatus] = useState("status-ok")
    const onClose = () => setNotifyOpen(false);
    const items = [
        { label: 'Dashboard', href: '/teacherdashboard' },
        { label: 'Password Change', href: '/teacherchangepassword' },
    ];
    const onSubmitPass = () => {
        if (email && password) {
            axios.post('http://127.0.0.1:3001/changepassword', {
                tuserid: localStorage.getItem('tuserid'),
                password: password,
                email: email,
            }).then(res => {
                setOpen(true)
                setEmail('')
                setPassword('')
            }).catch(error => {
                setMessage("Password Change Unsuccessful")
                setNotifyOpen(true)
                setMsgStatus("status-critical")
            })
        }
    }
    const onOTPSubmit = () => {
        setOpen(false)
        if (newpass && otp) {
            axios.post('http://127.0.0.1:3001/verifyteacherotp', {
                tuserid: localStorage.getItem('tuserid'),
                password: newpass,
                otp: otp
            }).then(res => {
                setMessage("Password Change Successful")
                setNotifyOpen(true)
                setMsgStatus("status-ok")
            }).catch(error => {
                setMessage("Password Change Unsuccessful")
                setNotifyOpen(true)
                setMsgStatus("status-critical")
            })
        }
    }
    return (
        <Grommet theme={grommet}>
            <Header background="dark-1" pad="small">
                <Box direction="row" align="center" gap="small">
                    <User />
                    <Anchor color="white" href="#">
                        Welcome {localStorage.getItem('tuserid')}
                    </Anchor>
                </Box>
                <Nav direction="row">
                    {items.map(item => (
                        <Anchor href={item.href} label={item.label} key={item.label} />
                    ))}
                </Nav>
            </Header>
            <Box style={{ marginTop: "7%" }} fill align="center" justify="center">
                <Box height="small" width="large" style={{
                    marginBottom: "3%",
                }}>
                    <Image src={passImage} fit="contain" />
                </Box>
                <Form>
                    <Box width="medium" justify="center" >
                        <FormField label="Email" name="email">
                            <MaskedInput
                                name="email"
                                placeholder='example@gmail.com'
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                            />
                        </FormField>
                        <FormField label="Old Password" name="passsword">
                            <Box direction="row" justify="between" margin={{ top: 'xxsmall' }}>
                                <TextInput
                                    plain
                                    type={reveal ? 'text' : 'password'}
                                    value={password}
                                    onChange={event => setPassword(event.target.value)}
                                />
                                <Button
                                    icon={reveal ? <View size="medium" /> : <Hide size="medium" />}
                                    onClick={() => setReveal(!reveal)}
                                />
                            </Box>
                        </FormField>
                        <Box direction="row" justify="center" margin={{ top: 'medium' }}>
                            <Button data-testid="button" active={true} type="submit" label="Request Password Change" onClick={onSubmitPass} primary />
                        </Box>
                    </Box>
                </Form>
                {open ? (
                    <Layer position="center">
                        <Box pad="medium" gap="small" width="medium">
                            <Heading level={3} margin="none">
                                EMAIL OTP VERIFICATION
                            </Heading>
                            <Text>Enter the OTP</Text>
                            <TextInput
                                name="otp"
                                value={otp}
                                onChange={event => setOtp(event.target.value)}
                                placeholder='One Time Pass'
                            />
                            <TextInput
                                name="newpass"
                                value={newpass}
                                onChange={event => setPass(event.target.value)}
                                placeholder='Enter Preferred Password'
                            />
                            <Box
                                as="footer"
                                gap="small"
                                direction="row"
                                align="center"
                                justify="end"
                                pad={{ top: 'medium', bottom: 'small' }}
                            >
                                <Button label="Submit" onClick={onOTPSubmit} color="dark-3" />
                                <Button
                                    label={
                                        <Text color="white">
                                            <strong>Cancel</strong>
                                        </Text>
                                    }
                                    onClick={() => { setOpen(false) }}
                                    primary
                                    color="status-critical"
                                />
                            </Box>
                        </Box>
                    </Layer>
                ) : null}
                {notifyopen && <Layer
                    position="bottom"
                    modal={false}
                    margin={{ vertical: 'medium', horizontal: 'small' }}
                    onEsc={onClose}
                    responsive={false}
                    plain
                >
                    <Box
                        align="center"
                        direction="row"
                        gap="small"
                        justify="between"
                        round="medium"
                        elevation="medium"
                        pad={{ vertical: 'xsmall', horizontal: 'small' }}
                        background={msgstatus}
                    >
                        <Box align="center" direction="row" gap="xsmall">
                            {msgstatus === "status-ok" ? <StatusGood /> : <StatusWarning />}
                            <Text>
                                {message}
                            </Text>
                        </Box>
                        <Button icon={<FormClose />} onClick={onClose} plain />
                    </Box>
                </Layer>}
            </Box>
        </Grommet>
    );
};

export default TeacherPasswordChange;