import { React, useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import {
    Box,
    Button,
    Grommet,
    TextInput,
    Image,
    Text
} from 'grommet';
import { Hide, View } from 'grommet-icons';
import signImage from '../assets/teacher.svg'
import { grommet } from 'grommet/themes';
const TeacherSignIn = () => {
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
    const [reveal, setReveal] = useState(false);
    const onSubmitSignIn = () => {
        if (username && password) {
            axios.post('http://127.0.0.1:3001/signinteacher', { tuserid: username, password: password })
                .then(res => {
                    if ((res.data.status).length > 0) {
                        localStorage.setItem("tuserid", res.data.tuserid)
                        localStorage.setItem("chairperson", res.data.chairperson)
                        history.replace('/teacherdashboard')
                    }
                }).catch(error => {
                    console.log(error)
                    alert("Sign In Failed")
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

                <Box width="medium">
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
                        <Text color="purple" onClick={() => { history.push('/teacherregister') }} >Not Signed Up?</Text>
                        <Button data-testid="button" active={true} onClick={onSubmitSignIn} type="submit" label="Log In" primary />
                    </Box>
                </Box>
            </Box>
        </Grommet >
    );
};

export default (TeacherSignIn);