import { React, useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    Grommet,
    Text,
    Anchor,
    Header,
    Nav,
    TextInput,
    Card,
    CardFooter,
    CardBody,
    Select
} from 'grommet';
import { grommet } from 'grommet/themes';
import '../Theme/StudentPastApplication.css'
import { User, Search, Info, Favorite, ShareOption, Filter, Close, WifiNone } from 'grommet-icons';
const StudentPastApplication = () => {
    const [search, setSearch] = useState("");
    const [student, setStudent] = useState();
    const [count, setCount] = useState(0)
    const [filter, setFilter] = useState('Reason')
    const allOptions = ['Reason', 'Start Date']
    const items = [
        { label: 'Dashboard', href: '/studentDashboard' },
        { label: 'Past Application', href: '/studentpastapplication' },
    ];
    useEffect(() => {
        axios.get('http://127.0.0.1:3001/leavestatus/' + localStorage.getItem("suserid"))
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

    const cancelLeave = (value) => {
        axios.delete('http://127.0.0.1:3001/cancelleaverequest', {
            headers: {
                Authorization: null
            },
            data: { suserid: localStorage.getItem("suserid"), dos: new Date(value.dos).toLocaleDateString("sq-AL", { year: 'numeric', day: '2-digit', month: '2-digit' }), reason: value.reason }
        }).then(res => {
            alert(res.data.status)
        }).catch(error => {
            alert("Unable To Cancel Request")
        })
    }

    return (
        <Grommet full theme={grommet} style={{ overflowY: 'scroll' }}>
            <Header background="dark-1" pad="small">
                <Box direction="row" align="center" gap="small">
                    <User />
                    <Anchor color="white" href="#">
                        Welcome {localStorage.getItem('suserid')}
                    </Anchor>
                    <TextInput icon={<Search />} placeholder="search ..." onChange={(event) => setSearch(event.target.value)} />
                    <Select
                        icon={Filter}
                        options={allOptions}
                        value={filter}
                        onChange={({ option }) => setFilter(option)}
                    />
                </Box>
                <Nav direction="row">
                    {items.map(item => (
                        <Anchor href={item.href} label={item.label} key={item.label} />
                    ))}
                </Nav>
            </Header>
            <Box
                direction="row"
                round="medium"
                pad={{ vertical: 'medium' }}
            >
                {student ?
                    student.filter(item => filter === "Reason" ? item.reason.toLowerCase().includes(search.toLowerCase()) : new Date(item.dos).toLocaleDateString("sq-AL", { year: 'numeric', day: '2-digit', month: '2-digit' }).includes(search)).map((item, key) => (<Box align="center" direction="row" gap="xsmall">
                        <Card style={{ 'marginLeft': "6%" }} height="small" width="medium" background="light-1">
                            <CardBody pad="medium" background={item.approval != 'Rejected' ? item.approval == "Approved" ? 'status-ok' : 'status-warning' : 'status-critical'}>
                                <Text weight="bold">LEAVE ID:{key}</Text>
                                <Text weight="bold">DOS: {new Date(item.dos).toLocaleDateString("sq-AL", { year: 'numeric', day: '2-digit', month: '2-digit' })}</Text>
                                <Text weight="bold">DOE: {new Date(item.doe).toLocaleDateString("sq-AL", { year: 'numeric', day: '2-digit', month: '2-digit' })}</Text>
                                <Text weight="bold">REASON: {item.reason}</Text>
                            </CardBody>
                            <CardFooter background="light-2" >
                                <Button margin="small" style={{ 'marginLeft': "26%" }} label="Cancel Request" icon={<Close color="red" />} hoverIndicator plain={true} onClick={() => { cancelLeave(item) }} />
                            </CardFooter></Card>
                    </Box>
                    )) : null}
            </Box>
        </Grommet>
    )
}
export default StudentPastApplication;