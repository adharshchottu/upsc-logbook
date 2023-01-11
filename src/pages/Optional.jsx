import {
    Tabs, TabList, TabPanels, Tab, TabPanel, Box,
    UnorderedList, ListItem, Heading, Button, Center, 
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, 
    ModalBody, ModalFooter, useDisclosure, Input, Flex, HStack
} from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { FirebaseContext } from '../contexts/FirebaseContext'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { collection, doc, getDocs, getFirestore, setDoc } from 'firebase/firestore'
const db = getFirestore();
const LogContext = React.createContext({ logData: {} })


const dummy =
{
    "WmXUrn2k82bnnlgyHkiEgeKtzau1": [
        { "01072022": ["ant", "thro", "polo"] },
        { "02072022": ["gy", "ker", "at"] },
        { "14072022": ["joseph", "edward", "stephen"] },
        { "21072022": ["dominic", "peter", "vincent"] },
        { "01082022": ["a", "b", "c"] },
        { "20082022": ["d", "e", "f"] },
        { "30082022": ["g", "h", "i"] },
        { "14082022": ["j", "k", "l"] },
        { "21092022": ["m", "n", "o"] },
        { "15092022": ["p", "q", "r"] },
        { "04092022": ["s", "t", "v"] },
    ],

    "lKkzOLyHSJatiy919w5IKPSkaLU2": [
        { "11072022": ["sant", "osh", "reju"] },
        { "02072022": ["shar", "ker", "onut"] },
        { "31072022": ["edison", "sajan", "kg"] },
        { "20072022": ["roy", "roentegen", "vin"] }
    ]
}


const OptionalList = (props) => {
    const author = props.author
    const [loadedData, setLoadedData] = useState([])
    const [count, setCount] = useState(5)
    const [disable, setDisable] = useState(false)
    const logData = useContext(LogContext)



    const LoadMore = () => {
        const months = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
        const data = logData && logData[author]
            .map((item, index) => {
                const key = Object.keys(item)
                const listArray = logData[author][index][key]
                const order = `${String(key[0]).substring(4, 8)}${String(key[0]).substring(2, 4)}${String(key[0]).substring(0, 2)}`
                return ({ "date": `${String(key).substring(0, 2)}-${months[Number(String(key).substring(2, 4)) - 1]}-${String(key).substring(4)}`, "data": listArray, "order": order })
            })
            .sort((a, b) => b.order - a.order)
        const newData = data?.slice(0, count)
        setLoadedData(newData)
        setCount(count + 5)
        if (newData.length < count) {
            setDisable(true)
        }
        else {
            setDisable(false)
        }
    }

    return <>
        {
            loadedData && loadedData.map((d) => {
                return (
                    <Box key={d.date} m={2} mb={8}>
                        <Heading size={"md"} color="tomato">{d.date}</Heading>
                        <Box ms={5} mt={2}>
                            <UnorderedList>
                                {d.data.map((list) => {
                                    return <ListItem key={list}>{list}</ListItem>
                                })}
                            </UnorderedList>
                        </Box>
                    </Box>
                )
            })
        }
        <Center>
            <Button onClick={LoadMore} isDisabled={disable}>Load more!</Button>
        </Center>
    </>
}

const General = () => {
    return <>
        <Tabs isLazy isFitted variant='enclosed-colored'>
            <TabList>
                <Tab>Evan</Tab>
                <Tab>Augù</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <OptionalList author="WmXUrn2k82bnnlgyHkiEgeKtzau1" />
                </TabPanel>
                <TabPanel>
                    <OptionalList author="lKkzOLyHSJatiy919w5IKPSkaLU2" />
                </TabPanel>
            </TabPanels>
        </Tabs>
    </>
}

const Individual = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const subject = props.author === "WmXUrn2k82bnnlgyHkiEgeKtzau1" ? "Anthropology" : (props.author === "lKkzOLyHSJatiy919w5IKPSkaLU2" ? "Physics" : "Nothing")
    const mergedData = { data: [] }

    const [today, setToday] = useState("");
    const current = new Date();
    const month = current.getMonth() + 1;
    const currentMonth = month < 10 ? `0${month}` : month;
    const rawDate = current.getDate()
    const currentDate = rawDate < 10 ? `0${rawDate}` : rawDate;
    const date = `${current.getFullYear()}-${currentMonth}-${currentDate}`;


    const EditableList = (props) => {
        const [data, setData] = useState([]);

        const deleteItem = (index) => {
            const newData = data.filter(v => v.id !== index)
            setData(newData);
            updateData(newData)
        }

        const addItem = () => {
            const idMax = data.reduce((a, v) => a < v.id ? v.id : a, 0)
            const newData = [...data, { "id": idMax + 1, "value": "" }]
            setData(newData);
            updateData(newData)
        }

        const updateItem = (value, i) => {
            const newData = data.map((v) => v.id === i ? { "id": i, "value": value } : v)
            setData(newData);
            updateData(newData)
        }

        const updateData = (d) => {
            const processedData = d.map(e => e.value).filter(f => f)
            props.sendData(processedData)
        }


        return <>
            {
                data.map((d) => {
                    return (<ListItem key={d.id}>
                        <Flex>
                            <Input type='text' defaultValue={d.value} onChange={(e) => updateItem(e.target.value, d.id)} /> <Box onClick={() => deleteItem(d.id)} style={{ cursor: "pointer" }}><DeleteIcon p={2} boxSize={8} /></Box>
                        </Flex>
                    </ListItem>
                    )
                })
            }
            <Button colorScheme={'whatsapp'} rightIcon={<AddIcon />} onClick={addItem}>Add new</Button>
        </>
    }

    const saveData = async () => {
        const revertDate = `${today.substring(8)}${today.substring(5, 7)}${today.substring(0, 4)}`
        const dataToSend = { [revertDate]: mergedData.data }
        if (mergedData.data.length) {
            await setDoc(doc(db, "optional", props.author), dataToSend, { merge: true });
        }
        onClose();
    }

    const childData = (childData) => {
        mergedData.data = childData
    }

    useEffect(() => setToday(date), [date]);

    return <>
        <Box m={5}>
            <Center>
                <Heading size={"lg"} color="black">{subject}</Heading>
            </Center>
            <Button colorScheme='whatsapp' variant='solid' onClick={onOpen} leftIcon={<AddIcon />}>
                Add log
            </Button>
            <Box m={6}>
                <OptionalList author={props.author} />
            </Box>
        </Box>

        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size={"xl"}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <HStack>
                        <Box>Add optional log for </Box>
                        <Box><Input type={"date"} defaultValue={today} onChange={(e) => setToday(e.target.value)} /></Box>
                    </HStack>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <UnorderedList spacing={2}>
                        <EditableList sendData={childData} />
                    </UnorderedList>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={saveData}>
                        Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
}

const Optional = () => {
    const user = useContext(FirebaseContext);
    const [logData, setLogdata] = useState([])


    const getDataFromServer = async () => {
        const dbRef = collection(db, "optional");
        const dataFromServer = await getDocs(dbRef);
        if (!dataFromServer.empty) {
            const docs = dataFromServer.docs;
            const fpData = docs.map(d => {
                const values = d._document.data.value.mapValue.fields
                const getStringValues = (data) => {
                    return data.map(e => e.stringValue)
                }
                const getArrayValues = (data) => {
                    const innerValue = (k) => {
                        const tempvalues = values[k].arrayValue.values
                        return getStringValues(tempvalues)
                    }
                    const output = data ? Object.keys(data).map(f => ({ [f]: innerValue(f) })) : []
                    return output
                }
                return { [d.id]: getArrayValues(values) }
            }).reduce((c, v) => {
                const [key] = Object.entries(v)
                c[key[0]] = key[1];
                return c
            }, {})
            setLogdata(fpData)
        }
        else {
            setLogdata([])
        }
    }

    useState(() => {
        getDataFromServer()
    })

    return <>
        <LogContext.Provider value={logData}>
            {
                user.user ? <Individual author={user.user.uid} /> : <General />
            }
        </LogContext.Provider>
    </>
}

export default Optional