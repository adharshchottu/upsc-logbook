import { Badge, Box, Grid, GridItem } from "@chakra-ui/react";
import {articles} from "./data/articles";

const Articles = () => {
    const ArticleBox = (props) => {
        const marginLeft = props.articleNo.indexOf("(") == "-1" ? 0 : (props.articleNo.indexOf(")(") == "-1" ? 3 : 6);
        const bgColor = props.articleNo.indexOf("(") == "-1" ? "whatsapp.500" : (props.articleNo.indexOf(")(") == "-1" ? "whatsapp.300" : "whatsapp.100"); ;
        return <>
            <Box maxW='container.xl' minW={[0,'container.xl']} borderWidth='1px' borderRadius='lg' overflow='hidden' my={4} marginLeft={marginLeft} bg={bgColor}>

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

    return <>
        <Grid
            templateColumns='10px 30px 1fr'
            m={"2"}
        >
            {
                articles.map(d => <ArticleItem data={d} key={d.articleNo}/>)
            }
        </Grid>
    </>
}

export default Articles;