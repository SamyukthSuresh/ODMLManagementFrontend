import { React, useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    Grommet,
    Text,
    Accordion, AccordionPanel,
    Header, Nav,
    Avatar, Anchor, Form,
    FormField, TextInput,
    InfiniteScroll,
    TextArea
} from 'grommet';
import { CheckboxSelected, Close, FormClose, Info, StatusGood, StatusWarning, User, Validate, Search } from 'grommet-icons';
import { Layer } from 'grommet';
import { grommet } from 'grommet/themes';
const TeacherDashboard = () => {
    const [count, changeCount] = useState(0)
    const [search, setSearch] = useState("");
    useEffect(() => {
        (localStorage.getItem("chairperson") != 'Yes') ? axios.get('http://127.0.0.1:3001/teacherleaverecords/' + localStorage.getItem("tuserid"))
            .then(res => {
                console.log('hi')
                console.log(res.data)
                if (res.data != "No Data Available as of Now") {
                    setStudent(res.data)
                }
                else {
                    setStudent(null)
                }
            }).catch(error => {
                console.log(error)
                alert("Detail Fetch Failure")
            }) : axios.get('http://127.0.0.1:3001/chairleaverecords/' + localStorage.getItem("tuserid").substring(2, 5))
                .then(res => {
                    console.log(res.data)
                    if (res.data != "No Data Available as of Now") {
                        setStudent(res.data)
                    }
                    else {
                        setStudent(null)
                    }
                }).catch(error => {
                    console.log(error)
                    alert("Detail Fetch Failure")
                })

    }, [count]);
    const decisionSubmit = (decision, suserid, dos, doe, reason) => {
        console.log(decision, suserid, dos)
        if (localStorage.getItem("chairperson") == 'Yes') {
            if (decision == "Verified") {
                decision = "Approved"
            }
        }
        axios.post('http://127.0.0.1:3001/decisionteacher', { status: decision, suserid: suserid, dos: dos })
            .then(res => {
                console.log(res.data)
                alert("Success")
                if (decision == "Approved" || decision == "Rejected") {
                    axios.post('http://127.0.0.1:3001/notifystudent', { status: decision, suserid: suserid, dos: dos, doe: doe, reason: reason })
                        .then(res => {
                            alert("SMS Sent")
                        })
                        .catch(err => {
                            alert("Failed tO Send Sms")
                        })
                }
            }).catch(error => {
                console.log(error)
                alert("Detail Fetch Failure")
            })
        changeCount(count + 1)
    }

    const [student, setStudent] = useState()
    const [open, setOpen] = useState(true);
    const onClose = () => setOpen(undefined);
    const items = [
        { label: 'Dashboard', href: '/teacherdashboard' },
        { label: 'Password Change', href: '/teacherchangepassword' },
    ];
    const gravatarSrc =
        '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';
    return (
        <Grommet full theme={grommet} style={{ overflowY: 'scroll' }}>
            <Header background="dark-1" pad="small">
                <Box direction="row" align="center" gap="small">
                    <User />
                    <Anchor color="white" href="#">
                        Welcome {'10CSE345'}
                    </Anchor>
                    <TextInput icon={<Search />} placeholder="search ..." onChange={(event) => setSearch(event.target.value)} />
                </Box>
                <Nav direction="row">
                    {items.map(item => (
                        <Anchor href={item.href} label={item.label} key={item.label} />
                    ))}
                </Nav>
            </Header>
            <div class="flex items-center justify-center pa4 bg-yellow">
                <Info />
                <span class="lh-title ml3">The following are the Student Leave Details, Please verify and take appropriate action</span>
            </div>
            <Box>
                {student ? student.filter(item => item.suserid.toLowerCase().includes(search.toLowerCase())).map((item) => (
                    <Accordion>
                        <AccordionPanel key={item} label={item.suserid}>
                            <Box align="center" pad="large">
                                <Form>
                                    <Box border gap="medium" pad="large" width="medium">
                                        <FormField
                                            htmlFor="info-id"
                                            name="info-demo"
                                            label="Student ID"
                                        >
                                            <TextInput
                                                id="info-id"
                                                value={item.suserid}
                                            />
                                        </FormField>
                                        <FormField
                                            htmlFor="info-id"
                                            name="info-demo"
                                            label="Date of Start"
                                        >
                                            <TextInput
                                                id="dos"
                                                value={new Date(item.dos).toLocaleDateString("sq-AL", { year: 'numeric', day: '2-digit', month: '2-digit' })}
                                            />
                                        </FormField>
                                        <FormField
                                            htmlFor="info-id"
                                            name="info-demo"
                                            label="Date of End"
                                        >
                                            <TextInput
                                                id="doe"
                                                value={new Date(item.doe).toLocaleDateString("sq-AL", { year: 'numeric', day: '2-digit', month: '2-digit' })}
                                            />
                                        </FormField>
                                        <FormField
                                            htmlFor="info-id"
                                            name="info-demo"
                                            label="Reason"
                                        >
                                            <TextArea
                                                value={item.reason}
                                            />
                                        </FormField>
                                        {item.cert != 'NA' ? <FormField
                                            htmlFor="info-id2"
                                            name="info-demo2"
                                            label="Medical Certificate"
                                        >
                                            <TextArea
                                                value={item.cert}
                                            />
                                        </FormField> : null}

                                        <Box direction="row" justify="between">
                                            <a class="f6 link dim br-pill ph3 pv2 mb2 dib white bg-green" onClick={() => decisionSubmit("Verified", item.suserid, new Date(item.dos).toLocaleDateString("sv-SE", { year: 'numeric', day: '2-digit', month: '2-digit' }), new Date(item.doe).toLocaleDateString("sv-SE", { year: 'numeric', day: '2-digit', month: '2-digit' }), item.reason)}>Approve</a>
                                            <a class="f6 link dim br-pill ph3 pv2 mb2 dib white bg-red" onClick={() => decisionSubmit("Rejected", item.suserid, new Date(item.dos).toLocaleDateString("sv-SE", { year: 'numeric', day: '2-digit', month: '2-digit' }), new Date(item.doe).toLocaleDateString("sv-SE", { year: 'numeric', day: '2-digit', month: '2-digit' }), item.reason)}>Reject</a>
                                        </Box>
                                    </Box>
                                </Form>
                            </Box>
                        </AccordionPanel>
                    </Accordion>
                )) : null}
            </Box>
            {
                open && <Layer
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
                        background="status-ok"
                    >
                        <Box align="center" direction="row" gap="xsmall">
                            <StatusGood />
                            <Text>
                                Succcesfully Signed In To Teacher Portal
              </Text>
                        </Box>
                        <Button icon={<FormClose />} onClick={onClose} plain />
                    </Box>
                </Layer>
            }
        </Grommet >
    );
};

export default TeacherDashboard;