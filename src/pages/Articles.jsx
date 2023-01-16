import { Badge, Box, Center, Checkbox, Grid, GridItem, Stack, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { articles } from "./data/articles";
import { parts } from "./data/parts";

const Articles = () => {
    const intialState = { articles: true, clauses: true, subclauses: true }
    const intialPartState = Object.assign({}, ...[...parts.keys()].map((d) => ({ [d]: true })));
    const [filter, setFilter] = useState(intialState);
    const [partFilter, setPartFilter] = useState(intialPartState);

    const [data, setData] = useState(articles)

    const ArticleBox = (props) => {
        const partColor = parts.get(props.part).color;
        const marginLeft = props.articleNo.indexOf("(") == "-1" ? 0 : (props.articleNo.indexOf(")(") == "-1" ? 3 : 6);
        const bgColor = props.articleNo.indexOf("(") == "-1" ? partColor : (props.articleNo.indexOf(")(") == "-1" ? partColor : partColor);
        const bgFilter = props.articleNo.indexOf("(") == "-1" ? "filter:brightness(1)" : (props.articleNo.indexOf(")(") == "-1" ? "filter:brightness(1.5)" : "filter:brightness(1.8)");

        return <>
            <Box maxW='container.xl' minW={[0, 'container.xl']} borderWidth='1px' borderRadius='lg' overflow='hidden' my={4} marginLeft={marginLeft} bg={bgColor} css={bgFilter}>

                <Box p='6'>
                    <Box display='flex' alignItems='baseline'>
                        <Badge borderRadius='full' px='2' colorScheme='teal'>
                            Article {props.articleNo}
                        </Badge>
                        <Box
                            color='gray.700'
                            fontWeight='semibold'
                            letterSpacing='wide'
                            fontSize='xs'
                            textTransform='uppercase'
                            ml='2'
                        >
                            Part {props.part}
                        </Box>
                    </Box>

                    <Box
                        mt='1'
                        fontWeight='semibold'
                        lineHeight='tight'
                        textAlign={"justify"}
                        m={3}
                    >
                        {props.article}
                    </Box>
                </Box>
            </Box>
        </>

    }

    const ArticleItem = (props) => {
        return <>
            <GridItem mx='auto' w={'10px'} position="relative" top={"5"}>
                <Box h='100%' bg='tomato' w={'2.5'} ></Box>
            </GridItem>
            <GridItem h={'1'} bg='tomato' w={'500%'} mt='12' />
            <ArticleBox articleNo={props.data.articleNo} part={props.data.part} article={props.data.article} key={props.data.order} />
        </>

    }

    const Parts = () => {
        const partsObject = Array.from(parts).map(d => {
            return { partNo: d[0], ...d[1] }
        })

        const handleCheckboxChange = (key) => {
            const newCheckboxes = { ...partFilter };
            newCheckboxes[key] = !newCheckboxes[key];
            setPartFilter(newCheckboxes);
        }

        const PartsList = (props) => {
            return <>
                <Checkbox size='lg' colorScheme='whatsapp' isChecked={partFilter[props.partNo]} onChange={(e) => handleCheckboxChange(props.partNo)}>
                    <Box color={props.color}>Part {props.partNo}: {props.item}</Box>
                </Checkbox>
            </>
        }


        return <>
            <Center>
                <Grid templateColumns='repeat(2, 1fr)' gap={3} my={"6"} mx={6}>
                    {partsObject.map((d) => <PartsList item={d.part} partNo={d.partNo} key={d.partNo} color={d.color} />)}
                </Grid>
            </Center>
        </>
    }

    useEffect(() => {
        const filterData = (filter, data) => {
            const filterArticles = data.filter((d) => {
                return (d.articleNo.indexOf("(") == "-1") && filter.articles
            })
            const filterClauses = data.filter((d) => {
                return (d.articleNo.indexOf("(") != "-1") && (d.articleNo.indexOf(")(") == "-1") && filter.clauses
            })
            const filterSubclauses = data.filter((d) => {
                return (d.articleNo.indexOf(")(") != "-1") && filter.subclauses
            })
            // console.log(filterArticles, filterClauses, filterSubclauses)
            const unSorted = [...filterArticles, ...filterClauses, ...filterSubclauses]
            const sorted = unSorted.sort(function (a, b) {
                let aNum = parseInt(a.articleNo.match(/\d+/)[0]);
                let bNum = parseInt(b.articleNo.match(/\d+/)[0]);
                if (aNum === bNum) {
                    return a.articleNo.localeCompare(b.articleNo);
                }
                return aNum - bNum;
            });
            return sorted;
        }
        const filteredData = filterData(filter, articles)

        const filterDataForParts = (partFilter, data) => {
            const filterData = data.filter((d) => {
                return partFilter[d.part]
            })
            return [...filterData]
        }
        const filteredDataForPart = filterDataForParts(partFilter, filteredData)
        setData(filteredDataForPart)
    }, [filter, partFilter])

    return <>
        <Center my={"4"}>
            <Text
                bgGradient='linear(to-l, #7928CA, whatsapp.500)'
                bgClip='text'
                fontSize='6xl'
                fontWeight='extrabold'
            >
                Articles
            </Text>
        </Center>
        <Center>
            <Stack spacing={[1, 5]} direction={['column', 'row']} mx={"2"}>
                <Checkbox size='lg' colorScheme='linkedin' defaultChecked
                    onChange={(e) => setFilter({ articles: !filter.articles, clauses: filter.clauses, subclauses: filter.subclauses })}>
                    Articles
                </Checkbox>
                <Checkbox size='lg' colorScheme='linkedin' defaultChecked
                    onChange={(e) => setFilter({ articles: filter.articles, clauses: !filter.clauses, subclauses: filter.subclauses })}>
                    Clauses
                </Checkbox>
                <Checkbox size='lg' colorScheme='linkedin' defaultChecked
                    onChange={(e) => setFilter({ articles: filter.articles, clauses: filter.clauses, subclauses: !filter.subclauses })}>
                    Sub-clauses
                </Checkbox>
            </Stack>
        </Center>
        <Parts />
        <Grid
            templateColumns='10px 30px 1fr'
            m={"2"}
        >
            {
                data.map(d => <ArticleItem data={d} key={d.articleNo} />)
            }
        </Grid>
    </>
}

export default Articles;