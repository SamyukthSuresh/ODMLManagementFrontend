import { React, useState } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    Grommet,
    Text,
    Image,
    Anchor,
    Header,
    Nav,
    TextInput,
    FormField,
    Form,
    CheckBox,
    MaskedInput,
    Select
} from 'grommet';
import underConstruction from '../assets/error.svg'

import { FormClose, StatusGood, User } from 'grommet-icons';

import { Layer } from 'grommet';
import { grommet } from 'grommet/themes';
const StudentDashboard = () => {
    const daysInMonth = month => new Date(2021, month, 0).getDate();
    const [open, setOpen] = useState(true);
    const [dos, setDos] = useState('');
    const [doe, setDoe] = useState('');
    const [branch, setBranch] = useState();
    const [tuserid, settuserid] = useState(null);
    const [haveAlias, setHaveAlias] = useState();
    const [teachers, setTeachers] = useState([{ tuserid: "Choose" }]);
    const getTeacherList = (dept) => {
        setBranch(dept)
        axios.get('http://127.0.0.1:3001/teachdept/' + dept).then(res => {
            if (res.data != 'NA') { setTeachers(res.data) }
            else {
                setTeachers([{ tuserid: "Choose" }])
                settuserid(null)
            }
        }).catch(error => {
            alert("Unable To Fetch Teachers")
        })
    }
    const onSubmitLeaveRecord = (value) => {
        if (value && tuserid != null) {
            axios.post('http://127.0.0.1:3001/leaverequest', { suserid: localStorage.getItem("suserid"), tuserid: value.tuserid, dos: value.dos, doe: value.doe, reason: value.reason, cert: value.alias ? value.alias : 'NA', branch: value.branch }).then(res => {
                console.log(res.data)
            }).catch(error => {
                alert("Unable To Submit Request")
            })
        }
    }
    const onClose = () => setOpen(undefined);
    const items = [
        { label: 'Dashboard', href: '/studentDashboard' },
        { label: 'Past Application', href: '#' },
    ];
    return (
        <Grommet full theme={grommet}>
            <Header background="dark-1" pad="small">
                <Box direction="row" align="center" gap="small">
                    <User />
                    <Anchor color="white" href="#">
                        Welcome Samyukth
                    </Anchor>
                </Box>
                <Nav direction="row">
                    {items.map(item => (
                        <Anchor href={item.href} label={item.label} key={item.label} />
                    ))}
                </Nav>
            </Header>
            <Box fill align="center" justify="center">
                <Box width="medium">
                    <Form
                        validate="blur"
                        onSubmit={({ value }) => onSubmitLeaveRecord(value)}
                    >
                        <FormField label="Branch" name="branch" required>
                            <Select
                                options={['CSE', 'ECE', 'EEE', 'EIE', 'MEE', 'AEE', 'CHE', 'PHY', "Choose"]}
                                value={branch}
                                defaultValue={"Choose"}
                                disabled={["Choose"]}
                                onChange={({ option }) => getTeacherList(option)}
                                name="branch"
                            />
                        </FormField>
                        <FormField label="TUserID" name="tuserid" required>
                            <Select
                                options={teachers.map(item => {
                                    return item.tuserid
                                })}
                                value={tuserid}
                                defaultValue={"Choose"}
                                disabled={["Choose"]}
                                onChange={({ option }) => settuserid(option)}
                                name="tuserid"
                            />
                        </FormField>
                        <Box direction="row" justify="between">
                            <FormField style={{ marginRight: "5%" }} label="Date of Start" name="dos" required>
                                <MaskedInput
                                    mask={[
                                        {
                                            length: 4,
                                            options: Array.from({ length: 1 }, (v, k) => 2021 - k),
                                            regexp: /^[1-2]$|^19$|^20$|^19[0-9]$|^20[0-9]$|^19[0-9][0-9]$|^20[0-9][0-9]$/,
                                            placeholder: 'yyyy',
                                        },
                                        { fixed: '-' },
                                        {
                                            length: [1, 2],
                                            options: Array.from({ length: 12 }, (v, k) => k + 1),
                                            regexp: /^1[0,1-2]$|^0?[1-9]$|^0$/,
                                            placeholder: 'mm',
                                        },
                                        { fixed: '-' },
                                        {
                                            length: [1, 2],
                                            options: Array.from(
                                                {
                                                    length: daysInMonth(parseInt(dos.split('/')[0], 10)),
                                                },
                                                (v, k) => k + 1,
                                            ),
                                            regexp: /^[1-2][0-9]$|^3[0-1]$|^0?[1-9]$|^0$/,
                                            placeholder: 'dd',
                                        },

                                    ]}
                                    name='dos'
                                    value={dos}
                                    onChange={event => setDos(event.target.value)}
                                />
                            </FormField>
                            <FormField label="Date of End" name="doe" required>
                                <MaskedInput
                                    mask={[
                                        {
                                            length: 4,
                                            options: Array.from({ length: 1 }, (v, k) => 2021 - k),
                                            regexp: /^[1-2]$|^19$|^20$|^19[0-9]$|^20[0-9]$|^19[0-9][0-9]$|^20[0-9][0-9]$/,
                                            placeholder: 'yyyy',
                                        },
                                        { fixed: '-' },
                                        {
                                            length: [1, 2],
                                            options: Array.from({ length: 12 }, (v, k) => k + 1),
                                            regexp: /^1[0,1-2]$|^0?[1-9]$|^0$/,
                                            placeholder: 'mm',
                                        },
                                        { fixed: '-' },
                                        {
                                            length: [1, 2],
                                            options: Array.from(
                                                {
                                                    length: daysInMonth(parseInt(doe.split('/')[0], 10)),
                                                },
                                                (v, k) => k + 1,
                                            ),
                                            regexp: /^[1-2][0-9]$|^3[0-1]$|^0?[1-9]$|^0$/,
                                            placeholder: 'dd',
                                        },

                                    ]}
                                    name='doe'
                                    value={doe}
                                    onChange={event => setDoe(event.target.value)}
                                />
                            </FormField>
                        </Box>
                        <FormField name="haveAlias">
                            <CheckBox
                                name="haveAlias"
                                label="Medical Leave?"
                                checked={haveAlias}
                                onChange={() => setHaveAlias(!haveAlias)}
                            />
                        </FormField>
                        {haveAlias && (
                            <FormField label="Paste the Google Drive Shareable link of the medical certificate" name="alias" required>
                                <TextInput name="alias" />
                            </FormField>
                        )}
                        <FormField label="Reason" name="reason" required>
                            <TextInput name="reason" />
                        </FormField>
                        <Box direction="row" justify="between" margin={{ top: 'medium' }}>
                            <Button type="reset" label="Reset" />
                            <Button type="submit" label="Submit" primary />
                        </Box>
                    </Form>
                </Box>
            </Box>
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
                    background="status-ok"
                >
                    <Box align="center" direction="row" gap="xsmall">
                        <StatusGood />
                        <Text>
                            Succcesfully Signed In To Student Portal
              </Text>
                    </Box>
                    <Button icon={<FormClose />} onClick={onClose} plain />
                </Box>
            </Layer>}
        </Grommet>
    );
};

export default StudentDashboard;