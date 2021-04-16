import { React, useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import {
    Box,
    Button,
    Grommet,
    TextInput,
    Image,
} from 'grommet';
import { Hide, View } from 'grommet-icons';
import signImage from '../assets/adminSignIn.svg'
import { grommet } from 'grommet/themes';
const AdminSignIn = () => {
    const history = useHistory();
    const [password, setPassword] = useState("")
    const [reveal, setReveal] = useState(false);
    const onSubmitSignIn = () => {
        if (password) {
            axios.post('http://127.0.0.1:3001/signinadmin', { password: password })
                .then(res => {
                    console.log(res)
                    history.replace('/adminteacherverify')
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
                    >
                        <TextInput
                            plain
                            placeholder="Enter Master Key"
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

                    <Box direction="row" justify="center" margin={{ top: 'medium' }}>
                        <Button data-testid="button" active={true} onClick={onSubmitSignIn} type="submit" label="Log In" primary />
                    </Box>
                </Box>
            </Box>
        </Grommet >
    );
};

export default AdminSignIn;