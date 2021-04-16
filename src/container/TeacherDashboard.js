import { React, useState } from 'react';
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
import { CheckboxSelected, Close, FormClose, Info, StatusGood, StatusWarning, User, Validate } from 'grommet-icons';
import { Layer } from 'grommet';
import { grommet } from 'grommet/themes';
const TeacherDashboard = () => {
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
    const submitTrue = () => {
        alert("Button Clicked")
    }
    const [open, setOpen] = useState(true);
    const onClose = () => setOpen(undefined);
    const items = [
        { label: 'Dashboard', href: '/teacherdashboard' },
        { label: 'Password Change', href: '/teacherchangepassword' },
    ];
    const gravatarSrc =
        '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';
    return (
        <Grommet full theme={grommet}>
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
            <div class="flex items-center justify-center pa4 bg-yellow">
                <Info />
                <span class="lh-title ml3">The following are the Student Leave Details, Please verify and take appropriate action</span>
            </div>
            <Box>
                <InfiniteScroll items={records} step={10}>
                    {(item) => (
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
                                                    value={item.dos}
                                                />
                                            </FormField>
                                            <FormField
                                                htmlFor="info-id"
                                                name="info-demo"
                                                label="Date of End"
                                            >
                                                <TextInput
                                                    id="doe"
                                                    value={item.doe}
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
                                            <Box direction="row" justify="between">
                                                <a class="f6 link dim br-pill ph3 pv2 mb2 dib white bg-green" href="#0" onClick={submitTrue}>Approve</a>
                                                <a class="f6 link dim br-pill ph3 pv2 mb2 dib white bg-red" href="#0">Reject</a>
                                            </Box>
                                        </Box>
                                    </Form>
                                </Box>
                            </AccordionPanel>
                        </Accordion>
                    )}
                </InfiniteScroll>
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