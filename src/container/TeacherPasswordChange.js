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
    Nav
} from 'grommet';
import { Hide, View, User } from 'grommet-icons';
import passImage from '../assets/teacherpass.svg'
import { grommet } from 'grommet/themes';
const TeacherPasswordChange = () => {
    const records = [
        {
            "suserid": "CB.EN.U4CSE18456",
            "tuserid": "10CSE345",
            "dos": "2020-01-12",
            "doe": "2010-01-15",
            "branch": "CSE",
            "reason": "fever"
        },
        {
            "suserid": "CB.EN.U4CSE18451",
            "tuserid": "10CSE345",
            "dos": "2020-03-12",
            "doe": "2010-03-15",
            "branch": "MEE",
            "reason": "Gokulashtrami Practice Drama So i will not be attending the class"
        },
    ]
    const history = useHistory();
    const [password, setPassword] = useState("")
    const [reveal, setReveal] = useState(false);
    const items = [
        { label: 'Dashboard', href: '/teacherdashboard' },
        { label: 'Password Change', href: '/teacherchangepassword' },
    ];
    return (
        <Grommet theme={grommet}>
            <Header background="dark-1" pad="small">
                <Box direction="row" align="center" gap="small">
                    <User />
                    <Anchor color="white" href="#">
                        Welcome {records[0].tuserid}
                    </Anchor>
                </Box>
                <Nav direction="row">
                    {items.map(item => (
                        <Anchor href={item.href} label={item.label} key={item.label} />
                    ))}
                </Nav>
            </Header>
            <Box style={{ marginTop: "10%" }} fill align="center" justify="center">
                <Box height="small" width="large" style={{
                    marginBottom: "3%",
                }}>
                    <Image src={passImage} fit="contain" />
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
                            placeholder="Enter Preferred Change"
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
                        <Button data-testid="button" active={true} type="submit" label="Request Password Change" primary />
                    </Box>
                </Box>
            </Box>
        </Grommet >
    );
};

export default TeacherPasswordChange;