import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../contexts/FirebaseContext";
import {
    Tabs, TabList, TabPanels, Tab, TabPanel, Box,
    UnorderedList, ListItem, Heading, Button, Center
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { Link } from "react-router-dom";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const DataContext = React.createContext({ data: {} })
const LoadMoreContext = React.createContext({ count: 1, setCount: () => { } })
const months = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
const dummy = {
    "evan": {
        "21062022":
        {
            "indian_polity": ["ds", "fds"],
            "physical_geography": ["atomos dfhds", "winds and moemennts"],
            "indian_economy": ["liberalisation", "why it was done?"]
        },
        "22062022":
        {
            "indian_polity": ["1ds", "1fds"],
            "physical_geography": ["1atomos dfhds", "1winds and moemennts"],
            "indian_economy": ["1liberalisation", "1why it was done?"]
        },
    },
    "augu": {
        "21062022":
        {
            "indian_polity": ["sdadasd", "fdsdsddsdsadsd"],
            "physical_geography": ["dsdd dsdsad atomos dfhds", "w       inds and moemennts"],
            "indian_economy": ["liberal    isation", "why it wa       s done?"]
        }
    }
}

const LoadMoreButton = () => {
    const LoadContext = useContext(LoadMoreContext)
    const { count, setCount } = LoadContext

    const loadMore = () => {
        if (count.month > 0) {
            setCount({ month: count.month - 1, year: count.year })
        }
        else {
            setCount({ month: 11, year: count.year - 1 })
        }
    }

    return <>
        <Button onClick={loadMore} isDisabled={count.next}>{count.next ? "That's the end" : "Load More"}</Button>
    </>
}

const Entrylist = (props) => {
    const rawdata = props.data;
    const data = Object.keys(rawdata).map((key) => {
        const title = key.split("_").join(" ").toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
        return { "title": title, "data": rawdata[key] }
    });

    const InsideList = (props) => {
        const rawdata = props.data;
        return <> {
            rawdata && rawdata.map((d) => {
                return <ListItem key={d}>{d}</ListItem>
            })
        }
        </>
    }

    return <>
        {data && data.map((d) => {
            return (
                <Box key={d.title}>
                    <Heading as='h5' size='sm'>{d.title}</Heading>
                    <Box ms={4} mb={4}>
                        <UnorderedList>
                            <InsideList data={d.data} />
                        </UnorderedList>
                    </Box>
                </Box>
            )
        })}
    </>
}

const Subjectwiselist = (props) => {

    const processData = props.data.sort((a,b) => a.date - b.date)

    const InsideList = (props) => {
        const rawdata = props.data;
        return <> {
            rawdata && rawdata.map((d) => {
                return <ListItem key={d}>{d}</ListItem>
            })
        }
        </>
    }

    return <>
        {processData.map((d) => {
            return <Box key={`${d.date}4`}>
                <Heading as='h5' size='sm'>{`${d.date.substring(0, 2)}-${d.date.substring(2, 4)}-${d.date.substring(4)}`}</Heading>
                <Box ms={4} mb={4}>
                    <UnorderedList>
                        <InsideList data={d.value} />
                    </UnorderedList>
                </Box>
            </Box>

        })
        }
        <Center>
            <LoadMoreButton />
        </Center>
    </>


}

const Datewise = (props) => {
    const dataFromContext = useContext(DataContext)
    const rawdata = dataFromContext[props.author];
    const data = rawdata && Object.keys(rawdata)
        .map((key) => ({ "date": `${String(key).substring(0, 2)}-${months[Number(String(key).substring(2, 4)) - 1]}-${String(key).substring(4)}`, "data": rawdata[key], "order": key }))
        .sort((a, b) => a.order - b.order)

    return <>
        {
            data && data.map((d) => {
                return (
                    <Box key={d.date} m={2} mb={8}>
                        <Heading size={"md"} color="tomato">{d.date}</Heading>
                        <Box ms={5} mt={2}>
                            <Entrylist data={d.data} />
                        </Box>
                    </Box>
                )
            })
        }
        <Center>
            <LoadMoreButton />
        </Center>
    </>
}

const Subjectwise = (props) => {
    const subjects = ["Current Affairs", "Indian History", "World History",
        "Physical Geography", "Indian Geography", "Human Geography", "World Geography",
        "Indian Polity", "Indian Economy", "Indian Society", "Internal Security",
        "Governance", "International Relations", "Disaster Management",
        "Environment", "Science and Technology", "Ethics"
    ];
    const dataFromContext = useContext(DataContext)
    const rawdata = dataFromContext[props.author]

    const subjectkeys = subjects.map(s => s.toLowerCase().replace(" ", "_"))
    let dates = rawdata && Object.keys(rawdata)
    const data = subjectkeys.map((s) => {
        const items = []
        dates && dates.forEach((date) => {
            rawdata[date][s] && items.push({ "date": date, "value": rawdata[date][s] })

        })
        return { [s]: items }
    })
    const processedData = data.reduce((c, v) => ({ ...c, ...v }), {})

    return <>
        <Tabs size='sm'>
            <Box style={{ "overflowX": "scroll" }}>
                <TabList>
                    {subjects.map((d) => { return (<Tab key={d}>{d}</Tab>) })}
                </TabList>
            </Box>
            <TabPanels>
                {subjectkeys.map((d) => {
                    return (
                        <TabPanel key={d}>
                            <Subjectwiselist data={processedData[d]} />
                        </TabPanel>
                    )
                })
                }
            </TabPanels>
        </Tabs>

    </>
}

const Addlog = () => {
    return <>
        <Link to={"/adddailylog"}>
            <Button colorScheme='whatsapp' variant='solid' leftIcon={<AddIcon />}>
                Add log
            </Button>
        </Link>
    </>
}

const Insidertab = (props) => {
    return <>
        <Tabs isLazy isFitted variant='enclosed-colored' colorScheme='green'>
            <TabList>
                <Tab _selected={{ color: 'white', bg: 'green.400' }}>Date wise</Tab>
                <Tab _selected={{ color: 'white', bg: 'green.400' }}>Subject wise</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <Datewise author={props.author} />
                </TabPanel>
                <TabPanel>
                    <Subjectwise author={props.author} />
                </TabPanel>
            </TabPanels>
        </Tabs>
    </>
}

const Dailylog = () => {
    const user = useContext(FirebaseContext);
    const [data, setDate] = useState({})
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const [count, setCount] = useState({ month: currentMonth, year: currentYear, next: false });
    const countValue = { count, setCount }


    const getDataFromServer = async (document) => {
        const db = getFirestore();
        const dbRef = collection(db, document);
        const dataFromServer = await getDocs(dbRef);
        if (dataFromServer.empty) {
            const currentMonth = new Date().getMonth();
            const searchedMonth = document.substring(9).split("").reverse().join("").substring(4).split("").reverse().join("");
            const searchedIndex = months.indexOf(searchedMonth);
            if (currentMonth === searchedIndex) {
                setCount({ ...count, ...{ "next": false } })
            }
            else {
                setCount({ ...count, ...{ "next": true } })
            }
        }
        else {
            setCount({ ...count, ...{ "next": false } })
        }
        if (!dataFromServer.empty) {
            const docs = dataFromServer.docs;
            const userDocs = docs.map(d => {
                const dateEntries = d._document.data.value.mapValue.fields;
                if (dateEntries) {
                    const subjectEntries = Object.entries(dateEntries).map(e => {
                        const key = e[0]
                        const value = e[1].mapValue.fields
                        return { [key]: value }
                    })
                    const refinedSubjectEntries = subjectEntries.map(e => {
                        const entries = Object.entries(e).map(f => {
                            const rawData = Object.entries(f[1]).map(r => {
                                const key = r[0]
                                const values = r[1].arrayValue.values.map(a => a.stringValue)
                                return { [key]: values }
                            }).reduce((c, v) => ({ ...c, ...v }), {})
                            return rawData
                        }).reduce((c, v) => ({ ...c, ...v }), {})
                        const dateKey = Object.keys(e)[0]
                        return { [dateKey]: entries }
                    })
                        .reduce((c, v) => ({ ...c, ...v }), {})
                    return { [d.id]: refinedSubjectEntries }
                }
                else {
                    return { [d.id]: [] }
                }
            }).reduce((c, v) => ({ ...c, ...v }), {})
            setDate(userDocs)
        }
    }

    useEffect(() => {
        const documentName = `dailylog_${months[count.month]}${count.year}`
        getDataFromServer(documentName);
    }, [count.month]);

    return <>
        <DataContext.Provider value={data}>
            <LoadMoreContext.Provider value={countValue}>
                <Box m={12}>{user && <Addlog />}</Box>
                <Box m={10}>
                    <Tabs isLazy isFitted variant='enclosed-colored'>
                        <TabList>
                            <Tab>Evan</Tab>
                            <Tab>Augù</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <Insidertab author="WmXUrn2k82bnnlgyHkiEgeKtzau1" />
                            </TabPanel>
                            <TabPanel>
                                <Insidertab author="lKkzOLyHSJatiy919w5IKPSkaLU2" />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </LoadMoreContext.Provider>
        </DataContext.Provider>
    </>
}



export default Dailylog;