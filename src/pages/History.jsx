import { Badge, Box, Center, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { history } from "./data/history";
import { historyBC } from "./data/history_bc";
import { colorCode } from "./data/colorcode";

const History = () => {
    const filterHistory = (data) => {
        const addColor = data.map((d) => {
            const color = colorCode[Math.floor(d.year / 100) % 14]
            return {...d,"color":color}
        })
        return addColor.sort((a, b) => a.year - b.year);
    }

    const filteredHistory = filterHistory(history);
    const filteredHistoryBC = filterHistory(historyBC);

    const HistoryItem = (props) => {
        const removeAfterDot = str => str.substring(0, str.indexOf(".") !== -1 ? str.indexOf(".") : str.length);
        const badgeColor = removeAfterDot(props.item.color);

        return <>
            <GridItem mt='10' marginRight={2}>
                <Badge colorScheme={badgeColor} borderRadius='full' px='3'>{props.item.year}</Badge>
            </GridItem>
            <GridItem mx='auto' w={'10px'} position="relative" top={"5"}>
                <Box h='100%' bg='crimson' w={'2.5'} ></Box>
            </GridItem>
            <GridItem h={'1'} bg='crimson' w={'100%'} mt='12' />
            <Box maxW='container.xl' minW={[0, 'container.xl']} borderWidth='1px' borderRadius='lg' overflow='hidden' my={4} bg={props.item.color}>
                <Box p='2'>
                    <Box
                        mt='1'
                        fontWeight='semibold'
                        lineHeight='tight'
                        textAlign={"justify"}
                        m={1}
                    >
                        {props.item.history}
                    </Box>
                    <Box fontSize='sm'>
                        {props.item.notes}
                    </Box>
                </Box>
            </Box>
        </>
    }

    return <>
        <Center my={"4"}>
            <Text
                bgGradient='linear( orange, green.300)'
                bgClip='text'
                fontSize='6xl'
                fontWeight='extrabold'
                textAlign={"center"}
            >
                History timeline
            </Text>
        </Center>
        <Grid
            m={"5"}
            templateColumns={['18% 10px 30px 1fr', '10% 10px 50px 1fr']}
            justifyItems={["normal", "end"]}
        >
            {
                filteredHistoryBC.reverse().map((e, i) => ({ ...e, "order": i })).map(d => <HistoryItem item={d} key={d.order} />)
            }
        </Grid>
        <Center>
            <Heading as='h2' my={5} size='lg' marginLeft={10}>Christmas🎄🌟❄️</Heading>
        </Center>
        <Grid
            m={"5"}
            templateColumns={['18% 10px 30px 1fr', '10% 10px 50px 1fr']}
            justifyItems={["normal", "end"]}
        >

            {
                filteredHistory.map((e, i) => ({ ...e, "order": i })).map(d => <HistoryItem item={d} key={d.order} />)
            }
        </Grid>
    </>
}

export default History;