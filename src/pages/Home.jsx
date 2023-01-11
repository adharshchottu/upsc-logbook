import {
    Box, Text, Accordion, AccordionItem, AccordionButton, AccordionPanel,
    AccordionIcon, UnorderedList, ListItem, Button, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, useDisclosure, Input, Flex, Spacer
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { collection, setDoc, getDocs, doc, getFirestore } from "firebase/firestore";
import { DeleteIcon, AddIcon } from "@chakra-ui/icons"
import { FirebaseContext } from "../contexts/FirebaseContext";


const db = getFirestore();

const FetchDataTriggerContext = React.createContext({ fetchData: false, setFetchData: () => { } });


const Item = (props) => {
    let items = props.item;
    return <>
        {
            items && items.map((a) => {
                return <ListItem key={a}>{a}</ListItem>
            })
        }
    </>
}

const EditableList = (props) => {
    const [data, setData] = useState([]);

    const deleteItem = (index) => {
        const newData = data.filter(v => v.id !== index)
        setData(newData);
        props.sendData(newData);
    }

    const addItem = () => {
        const idMax = data.reduce((a, v) => a < v.id ? v.id : a, 0)
        const newData = [...data, { "id": idMax + 1, "value": "" }]
        setData(newData);
        props.sendData(newData);
    }

    const updateItem = (value, i) => {
        const newData = data.map((v) => v.id === i ? { "id": i, "value": value } : v)
        setData(newData);
        props.sendData(newData);
    }

    useEffect(() => {
        const newObject = props.data.reduce((a, v, i) => [...a, { "id": i, "value": v }], [])
        setData(newObject)
    }, [props.data]);

    return <>
        {
            data.map((d, i) => {
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

const Edit = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [list, setList] = useState([]);
    const [newData, setNewData] = useState([]);
    const { fetchData, setFetchData } = useContext(FetchDataTriggerContext);

    useEffect(() => {
        let uid = props.uid.user?.uid;
        let data = props.data;
        uid && data[uid] && setList(data[uid])
    }, [props, isOpen])

    const saveData = async () => {
        if (newData.length) {
            const dataToSend = newData.map((v) => v.value);
            const objectToSend = { ...dataToSend };
            await setDoc(doc(db, "why_doc", props.uid.user.uid), objectToSend);
            setFetchData(!fetchData);
        }
        onClose();
    }

    const childData = (childData) => {
        setNewData(childData)
    }

    return <>
        <Button colorScheme='green' variant='solid' onClick={onOpen}>
            Edit
        </Button>
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Why do you want to join Civil Service?</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <UnorderedList spacing={2}>
                        <EditableList data={list} sendData={childData} />
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

const Home = () => {
    const user = useContext(FirebaseContext);
    const [data, setData] = useState([{ "lKkzOLyHSJatiy919w5IKPSkaLU2": [1, 2, 3], "WmXUrn2k82bnnlgyHkiEgeKtzau1": [4, 5, 6] }]);
    const [fetchData, setFetchData] = useState(false);
    const valueForContext = { fetchData, setFetchData };


    //fetch data
    useEffect(() => {
        const getWhyData = async () => {
            const dbRef = collection(db, "why_doc");
            const getData = await getDocs(dbRef);
            const whyData = {};
            getData.docs.forEach((d) => {
                let fields = d._document.data.value.mapValue.fields;
                let whyArray = [];
                for (let i in fields) {
                    whyArray.push(fields[i].stringValue)
                }
                whyData[d.id] = whyArray;
            });
            setData(whyData);
        }
        getWhyData();
    }, [user, fetchData]);




    return <>
        <FetchDataTriggerContext.Provider value={valueForContext}>
            <Box pos="">
                <Flex mx={5}>
                    <Text fontSize={22} fontWeight={"bold"} textAlign={"center"}>Why Civil Service?</Text>
                    <Spacer />
                    {user.user && <Edit data={data} uid={user} />}
                </Flex>
                <Box m={[3, 15]}>
                    <Accordion allowToggle allowMultiple defaultIndex={[0]}>
                        <AccordionItem>
                            <h2>
                                <AccordionButton _expanded={{ bg: 'tomato', color: 'white' }}>
                                    <Box flex='1' textAlign='left'>
                                        Evan Emdor
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel>
                                <UnorderedList>
                                    <Item item={data["WmXUrn2k82bnnlgyHkiEgeKtzau1"]} />
                                </UnorderedList>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                    <Accordion allowToggle mt={5} allowMultiple defaultIndex={[0]}>
                        <AccordionItem>
                            <h2>
                                <AccordionButton _expanded={{ bg: 'tomato', color: 'white' }}>
                                    <Box flex='1' textAlign='left'>
                                        Augù
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel>
                                <UnorderedList>
                                    <Item item={data["lKkzOLyHSJatiy919w5IKPSkaLU2"]} />
                                </UnorderedList>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </Box>
            </Box>
        </FetchDataTriggerContext.Provider>

    </>
}



export default Home;