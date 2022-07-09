import {
    Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel,
    Box, Button, Flex, Heading, Input, ListItem, UnorderedList, useToast
} from "@chakra-ui/react"
import React, { useContext, useEffect, useState } from "react"
import { DeleteIcon, AddIcon } from "@chakra-ui/icons"
import { FirebaseContext } from "../contexts/FirebaseContext"
import { doc, getFirestore, setDoc } from "firebase/firestore"
import { useNavigate } from "react-router"

const LogContext = React.createContext({ logdata: {}, setLogdata: () => { } })
const db = getFirestore();


const Loglist = (props) => {
    const { logdata, setLogdata } = useContext(LogContext);
    const [data, setData] = useState([])

    const deleteItem = (index) => {
        const newData = data.filter(v => v.id != index)
        setData(newData);
    }

    const addItem = () => {
        const idMax = data.reduce((a, v) => a < v.id ? v.id : a, 0)
        const newData = [...data, { "id": idMax + 1, "value": "" }]
        setData(newData);
    }

    const updateItem = (value, i) => {
        const newData = data.map((v) => v.id == i ? { "id": i, "value": value } : v)
        setData(newData);
    }

    useEffect(() => {
        const items = data.length ? data.map((item) => item.value).filter((item) => item) : [];
        const itemName = String(props.name).toLowerCase().replace(" ", "_");
        const dataObject = { [itemName]: items }
        const newData = { ...logdata, ...dataObject }
        setLogdata(newData)
    }, [data])

    return <>
        <UnorderedList spacing={2}>
            {
                data.map((d) => {
                    return (<ListItem key={d.id}>
                        <Flex>
                            <Input type='text' defaultValue={d.value} onChange={(e) => updateItem(e.target.value, d.id)} />
                            <Box onClick={() => deleteItem(d.id)} style={{ cursor: "pointer" }}>
                                <DeleteIcon p={2} boxSize={8} />
                            </Box>
                        </Flex>
                    </ListItem>
                    )
                })
            }
            <Button colorScheme={'whatsapp'} rightIcon={<AddIcon />} onClick={addItem}>Add new</Button>
        </UnorderedList>
    </>
}

const CustomAccordianItem = (props) => {
    return <>
        <AccordionItem mb={3}>
            <h2>
                <AccordionButton _expanded={{ bg: 'tomato', color: 'white' }}>
                    <Box flex='1' textAlign='left'>
                        {props.name}
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
                <Loglist name={props.name} />
            </AccordionPanel>
        </AccordionItem>
    </>
}

const Adddailylog = () => {
    const user = useContext(FirebaseContext);
    const [today, setToday] = useState("");
    const [disableSubmit, setDisableSubmit] = useState(false);
    const current = new Date();
    const month = current.getMonth() + 1;
    const currentMonth = month < 10 ? `0${month}` : month;
    const rawDate = current.getDate()
    const currentDate = rawDate < 10 ? `0${rawDate}` : rawDate;
    const date = `${current.getFullYear()}-${currentMonth}-${currentDate}`;
    const [logdata, setLogdata] = useState({});
    const valueForContext = { logdata, setLogdata }
    const months = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
    const navigate = useNavigate();
    const toast = useToast();


    const Calcualatefinaldata = async () => {
        const processed = Object.entries(logdata)
            .filter(d => d[1].length)
            .reduce((c, v) => c = { ...c, ...{ [v[0]]: v[1] } }, {})
        const logdate = today.split("-").reverse().join("")
        const document = `dailylog_${months[Number(logdate.substring(2, 4)) - 1]}${logdate.substring(4)}`;
        const dataToSend = { [logdate]: processed }
        const collection = user?.user.uid;
        const canProceed = Object.values(processed).length;
        if (canProceed) {
            setDisableSubmit(true);
            await setDoc(doc(db, document, collection), dataToSend, { merge: true });
            navigate("/dailylog", { replace: true })
        }
        else {
            toast({
                title: 'No data found.',
                description: "Add the log before submitting.",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
    }

    useEffect(() => setToday(date), []);

    return <>
        <LogContext.Provider value={valueForContext}>
            <Box m={12}>
                <Flex justify={"center"}>
                    <Heading size={"xl"}>
                        Add log for
                    </Heading>
                    <Box ms={6} mt={1}>
                        <Input type={"date"} defaultValue={today} onChange={(e) => setToday(e.target.value)} />
                    </Box>
                </Flex>

                <Box boxShadow='2xl' p='6' rounded='md' bg='white' mt={6}>
                    <Accordion allowToggle >
                        <CustomAccordianItem name="Indian History" />

                        <CustomAccordianItem name="World History" />
                    </Accordion>
                </Box>

                <Box boxShadow='2xl' p='6' rounded='md' bg='white' mt={6}>
                    <Accordion allowToggle >
                        <CustomAccordianItem name="Physical Geography" />

                        <CustomAccordianItem name="Indian Geography" />

                        <CustomAccordianItem name="World Geography" />

                        <CustomAccordianItem name="Human Geography" />
                    </Accordion>
                </Box>

                <Box boxShadow='2xl' p='6' rounded='md' bg='white' mt={6}>
                    <Accordion allowToggle >
                        <CustomAccordianItem name="Indian Polity" />
                    </Accordion>
                </Box>

                <Box boxShadow='2xl' p='6' rounded='md' bg='white' mt={6}>
                    <Accordion allowToggle >
                        <CustomAccordianItem name="Indian Economy" />
                    </Accordion>
                </Box>

                <Box boxShadow='2xl' p='6' rounded='md' bg='white' mt={6}>
                    <Accordion allowToggle >
                        <CustomAccordianItem name="Indian Society" />

                        <CustomAccordianItem name="Internal Security" />

                        <CustomAccordianItem name="Governance" />

                        <CustomAccordianItem name="International Relations" />

                        <CustomAccordianItem name="Disaster Management" />
                    </Accordion>
                </Box>

                <Box boxShadow='2xl' p='6' rounded='md' bg='white' mt={6}>
                    <Accordion allowToggle >
                        <CustomAccordianItem name="Environment" />
                    </Accordion>
                </Box>

                <Box boxShadow='2xl' p='6' rounded='md' bg='white' mt={6}>
                    <Accordion allowToggle >
                        <CustomAccordianItem name="Ethics" />
                    </Accordion>

                </Box>

                <Box boxShadow='2xl' p='6' rounded='md' bg='white' mt={6}>
                    <Accordion allowToggle >
                        <CustomAccordianItem name="Current Affairs" />
                    </Accordion>

                </Box>
            </Box>
            <Flex justify={"center"} mb="3">
                {user && <Button onClick={Calcualatefinaldata} colorScheme={'twitter'} isDisabled={disableSubmit}>{!disableSubmit ? "Submit entry" : "submitting"}</Button>}
            </Flex>
        </LogContext.Provider>
    </>
}

export default Adddailylog