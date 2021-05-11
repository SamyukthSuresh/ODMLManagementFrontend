import { React, useState } from 'react';
import axios from 'axios';
import { Box, Grommet, Text, Button, Image, Header, Nav, Anchor, Form, FormField, Select, TextInput, MaskedInput } from 'grommet';
import { grommet } from 'grommet/themes';
import { Update, Checkmark, Close, StatusWarning, FormClose } from 'grommet-icons'
import empty from '../assets/empty.svg'
import { StatusGood, User } from 'grommet-icons';
import { Layer } from 'grommet';
import passImage from '../assets/lock.svg'
export const RevokeAccess = () => {
    const [id, setId] = useState('')
    const [userid, setUserId] = useState()
    const items = [
        { label: 'Verify Teacher', href: '/adminteacherverify' },
        { label: 'Revoke Access', href: '/adminrevoke' },
    ];
    const revoke = () => {
        if (id && userid) {
            axios.post('http://127.0.0.1:3001/revoke', { id: id, userid: userid })
                .then(res => {
                    alert("Success")
                }).catch(error => {
                    alert("Failure")
                })
        }
    }
    const options = ['student', 'teacher']
    return (
        <Grommet full theme={grommet}>
            <Header background="dark-1" pad="small">
                <Box direction="row" align="center" gap="small">
                    <User />
                    <Anchor color="white" >
                        Welcome Admin
                </Anchor>
                </Box>
                <Nav direction="row">
                    {items.map(item => (
                        <Anchor href={item.href} label={item.label} key={item.label} />
                    ))}
                </Nav>
            </Header>
            <Box fill align="center" justify="center">
                <Box height="small" width="large" style={{
                    marginBottom: "3%",
                }}>
                    <Image src={passImage} fit="contain" />
                </Box>

                <Box width="medium">
                    <Box
                        width="large"
                        direction="row"
                        align="center"
                        round="small"
                        border
                    >
                        <TextInput
                            plain
                            placeholder="Enter Registered ID"
                            name="userid" type="text"
                            //eslint-disable-next-line react/jsx-no-duplicate-props
                            type={'text'}
                            value={userid}
                            onChange={(event) => setUserId(event.target.value)}
                        />
                        <Select
                            id="select"
                            name="id"
                            placeholder="Choose.."
                            value={id}
                            options={options}
                            onChange={({ option }) => setId(option)}
                        />
                    </Box>

                    <Box direction="row" justify="center" margin={{ top: 'medium' }}>
                        <Button active={true} onClick={revoke} type="submit" label="Revoke" primary />
                    </Box>
                </Box>
            </Box>
        </Grommet>)
}

export default RevokeAccess;