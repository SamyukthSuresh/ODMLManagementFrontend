import { React, useState } from 'react';
import axios from 'axios';
import { Box, Grommet, Text, Button, Image, Header, Nav, Anchor } from 'grommet';
import { grommet } from 'grommet/themes';
import { Update, Checkmark, Close, StatusWarning, FormClose } from 'grommet-icons'
import empty from '../assets/empty.svg'
import { StatusGood, User } from 'grommet-icons';
import { Layer } from 'grommet';
export const AdminTeacherVerify = () => {
    const [open, setOpen] = useState(true);
    const [message, setMessage] = useState("Succcesfully Signed In To Admin Portal")
    const [msgstatus, setMsgStatus] = useState("status-ok")
    const onClose = () => setOpen(undefined);
    const items = [
        { label: 'Verify Teacher', href: '/adminteacherverify' },
        { label: 'Revoke Access', href: '/adminrevoke' },
    ];
    const getDetails = () => {
        axios.get('http://127.0.0.1:3001/forms')
            .then(res => {
                console.log(res.data)
                if (res.data.length > 0) { setTeacher(res.data) }
                else {
                    setTeacher(null)
                }

            }).catch(error => {
                console.log(error)
                alert("Detail Fetch Failure")
            })
    }
    const verifyTeacher = (userid, status) => {
        axios.post('http://127.0.0.1:3001/decision', { tuserid: userid, status: status })
            .then(res => {
                if (status == "APPROVED") {
                    setMessage("Approved User Registration")
                    setOpen(true)
                    setMsgStatus("status-ok")
                }
                else {
                    setMessage("Rejected User Registration")
                    setOpen(true)
                    setMsgStatus("status-critical")
                }
                console.log(res.data)
                getDetails()
            }).catch(error => {
                console.log(error)
                alert("Verification Failure")
            })
    }
    const [teacher, setTeacher] = useState()
    return (<Grommet theme={grommet} themeMode="dark-3">
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
        <Box pad="small" direction="column">
            <div className="f2 w-100 pa2">
                <Text>Fetch the Teachers Details for Registration Approval</Text>
            </div>
            <div className="f2 w-100 pa2">
                <Button data-testid="button" icon={<Update />} label="Fetch" onClick={getDetails} primary />
            </div>
        </Box>
        {teacher ?
            teacher.map((a) => {
                return (
                    <div className="pa1" key={a.tuserid}>
                        <div className="overflow-auto">
                            <table className="f5 w-100 mw8 center" cellSpacing="0">
                                <tbody className="lh-copy">
                                    <tr>
                                        <td className="fw6 bb b--black-20 tl pb3 pr3 bg-white">{a.firstname}</td>
                                        <td className="fw6 bb b--black-20 tl pb3 pr3 bg-white">{a.lastname}</td>
                                        <td className="fw6 bb b--black-20 tl pb3 pr3 bg-white">{a.tuserid}</td>
                                        <td className="fw6 bb b--black-20 tl pb3 pr3 bg-white">{a.email}</td>
                                        <td className="fw6 bb b--black-20 tl pb3 pr3 bg-dark">{a.doj.substring(0, 10)}</td>
                                        <Button icon={<Checkmark />} pad="medium" primary onClick={() => verifyTeacher(a.tuserid, "APPROVED")} />
                                        <Button icon={<Close />} color="status-critical" onClick={() => verifyTeacher(a.tuserid, "REJECTED")} />
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            })
            :
            <Box fill align="center" justify="center">
                <Box height="small" width="large" style={{ marginTop: "10%" }}>
                    <Image src={empty} fit="contain" />
                </Box>
            </Box>}
        {open && <Layer
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

    </Grommet >);
}


AdminTeacherVerify.parameters = {
    chromatic: { disable: true },
};

export default AdminTeacherVerify;