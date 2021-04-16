import { React, useState } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    Grommet,
    TextInput,
    Image,
} from 'grommet';
import passwordImage from '../assets/password.svg'
import { grommet } from 'grommet/themes';
const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const onSubmitForgotPassword = () => {
        if (email) {
            axios.post('http://127.0.0.1:3001/requestpassword', { email: email })
                .then(res => {
                    console.log(res)
                    alert("Successful Check your Email")
                }).catch(error => {
                    console.log(error)
                    alert("Failed Try Again")
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
                    <Image src={passwordImage} fit="contain" />
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
                            placeholder="Enter Registered Email"
                            name="email" type="email"
                            //eslint-disable-next-line react/jsx-no-duplicate-props
                            type={'text'}
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </Box>

                    <Box direction="row" justify="center" margin={{ top: 'medium' }}>
                        <Button active={true} onClick={onSubmitForgotPassword} type="submit" label="Get Password" primary />
                    </Box>
                </Box>
            </Box>
        </Grommet >
    );
};

export default ForgotPassword;