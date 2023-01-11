import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Center, Heading, ListItem, OrderedList, UnorderedList } from "@chakra-ui/react"

const Resources = () => {
    return <>
        <Box m={5}>
            <Center><Heading size={"lg"} color="black">Resources</Heading></Center>
            <Box m={5}>
                <Accordion allowToggle>
                    <AccordionItem>
                        <h2>
                            <AccordionButton _expanded={{ bg: 'LimeGreen', color: 'white' }}>
                                <Box flex='1' textAlign='left'>
                                    History
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel>
                            <UnorderedList>
                                <ListItem sx={{ fontWeight: "bold" }}>Ancient Indian History</ListItem>
                                <OrderedList>
                                    <ListItem>Class 6 NCERT by Romila Thapar</ListItem>
                                    <ListItem>Class 6 New NCERT (Our Past 1)</ListItem>
                                    <ListItem>Class 11 New NCERT - Themes in Indian History - 1</ListItem>
                                    <ListItem>RS Sharma</ListItem>
                                </OrderedList>
                                <br />
                                <ListItem sx={{ fontWeight: "bold" }}>Medieval Indian History</ListItem>
                                <OrderedList>
                                    <ListItem>Class 7 NCERT by Romila Thapar</ListItem>
                                    <ListItem>Class 7 New NCERT - Our past 2</ListItem>
                                    <ListItem>Class 11 New NCERT - Themes in Indian History</ListItem>
                                    <ListItem>Satish Chandra - Medieval India</ListItem>
                                </OrderedList>
                                <br />
                                <ListItem sx={{ fontWeight: "bold" }}>Modern Indian History</ListItem>
                                <OrderedList>
                                    <ListItem>Class 12 NCERT - Modern India by Bipin Chandra</ListItem>
                                    <ListItem>Class 12 New NCERT - Themes in Indian History 111</ListItem>
                                    <ListItem>The Gazzeter of India - Volume 2 </ListItem>
                                    <ListItem>From Plassey to Partition by Shekhar Bandopadhyay </ListItem>
                                </OrderedList>
                                <br />
                                <ListItem sx={{ fontWeight: "bold" }}>World History</ListItem>
                                <OrderedList>
                                    <ListItem>Jain and Mathur</ListItem>
                                </OrderedList>
                                <br />
                                <ListItem sx={{ fontWeight: "bold" }}> Post Independence India</ListItem>
                                <OrderedList>
                                    <ListItem>Class 12 NCERT Politics in India</ListItem>
                                </OrderedList>
                            </UnorderedList>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </Box>
            <Box m={5}>
                <Accordion allowToggle>
                    <AccordionItem>
                        <h2>
                            <AccordionButton _expanded={{ bg: 'LimeGreen', color: 'white' }}>
                                <Box flex='1' textAlign='left'>
                                    Geography
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel>
                            <OrderedList>
                                <ListItem>PMF IAS</ListItem>
                                <ListItem>Amit Sengupta</ListItem>
                            </OrderedList>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </Box>
            <Box m={5}>
                <Accordion allowToggle>
                    <AccordionItem>
                        <h2>
                            <AccordionButton _expanded={{ bg: 'LimeGreen', color: 'white' }}>
                                <Box flex='1' textAlign='left'>
                                    Polity
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel>
                            <OrderedList>
                                <ListItem>Our Parliament - Subhash Kashyap</ListItem>
                                <ListItem>Our Constitution - Subhash Kashyap</ListItem>
                                <ListItem>Our Political System - Subhash Kashyap</ListItem>
                                <ListItem>MP Jain</ListItem>
                            </OrderedList>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </Box>
            <Box m={5}>
                <Accordion allowToggle>
                    <AccordionItem>
                        <h2>
                            <AccordionButton _expanded={{ bg: 'LimeGreen', color: 'white' }}>
                                <Box flex='1' textAlign='left'>
                                    Economics
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel>
                            <OrderedList>
                                <ListItem>The Indian Economy - Sanjiv Verma </ListItem>
                                <ListItem>Indian Economy - Mishra and Puri</ListItem>
                                <ListItem>Indian Economy Since Independence - Uma Kapila</ListItem>
                            </OrderedList>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </Box>
            <Box m={5}>
                <Accordion allowToggle>
                    <AccordionItem>
                        <h2>
                            <AccordionButton _expanded={{ bg: 'LimeGreen', color: 'white' }}>
                                <Box flex='1' textAlign='left'>
                                    Ethics
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel>
                            <OrderedList>
                                <ListItem>Ethics, Integrity and Aptitude - Atul garg</ListItem>
                                <ListItem>Case studies - Ethical dilemma of a civil servant</ListItem>
                                <ListItem>Small things matter - Deepak Gupta</ListItem>
                            </OrderedList>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </Box>
        </Box>
    </>
}

export default Resources