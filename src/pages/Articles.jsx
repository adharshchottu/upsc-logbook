import { Badge, Box, Center, Checkbox, Grid, GridItem, Stack, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { articles } from "./data/articles";

const Articles = () => {
    const intialState = { articles: true, clauses: true, subclauses: true }
    const [filter, setFilter] = useState(intialState)

    const [data, setData] = useState(articles)

    const ArticleBox = (props) => {
        const marginLeft = props.articleNo.indexOf("(") == "-1" ? 0 : (props.articleNo.indexOf(")(") == "-1" ? 3 : 6);
        const bgColor = props.articleNo.indexOf("(") == "-1" ? "whatsapp.500" : (props.articleNo.indexOf(")(") == "-1" ? "whatsapp.300" : "whatsapp.100");
        
        return <>
            <Box maxW='container.xl' minW={[0, 'container.xl']} borderWidth='1px' borderRadius='lg' overflow='hidden' my={4} marginLeft={marginLeft} bg={bgColor} >

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
        setData(filteredData)
    })

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