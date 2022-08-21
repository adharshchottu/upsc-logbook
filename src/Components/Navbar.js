import React, { useContext, useEffect, useState } from 'react'
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import { Link, useNavigate } from 'react-router-dom'
import { Button, useBreakpointValue, Flex, ButtonGroup, Menu, MenuButton, MenuItem, MenuList, Box, Spacer, Text, HStack } from '@chakra-ui/react'
import { FirebaseContext } from '../contexts/FirebaseContext'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const MenuListDesktop = (props) => {
    if (props.external) {
        return <a href={`${props.href}`}>
            <Button colorScheme='teal' variant={'solid'} borderRadius={15}>
                {props.name}
            </Button>
        </a>
    }
    else {
        return <Link to={`${props.href}`}>
            <Button colorScheme='teal' variant={'solid'} borderRadius={15}>
                {props.name}
            </Button>
        </Link>
    }
}

const MenuListSignIn = (props) => {
    const menuLocation = props.menu;
    const { firebaseapp } = useContext(FirebaseContext);
    const signInWithGoogle = () => {
        const auth = getAuth(firebaseapp);
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    }
    const user = useContext(FirebaseContext);

    return <>
        {
            !(user.user) && (menuLocation === "mobile" ?
                <MenuItem onClick={signInWithGoogle}>Sign in</MenuItem> :
                <Button onClick={signInWithGoogle} colorScheme='teal' variant={'solid'} borderRadius={15}>Sign in</Button>)
        }

    </>
}

const MenuListOptional = (props) => {
    const menuLocation = props.menu;
    const user = useContext(FirebaseContext);
    const [optional, setOptional] = useState("")
    useEffect(() => {
        if (user.user) {
            if (user.user.uid === "WmXUrn2k82bnnlgyHkiEgeKtzau1") setOptional("Anthropology")
            else if (user.user.uid === "lKkzOLyHSJatiy919w5IKPSkaLU2") setOptional("Physics")
        }
    }, [user.user])
    let navigate = useNavigate();
    const navigateTo = () => {
        navigate("/optional", { replace: true });
    }

    return <>
        {
            (user.user) && (menuLocation === "mobile" ?
                <MenuItem onClick={navigateTo}>{optional}</MenuItem> :
                <Button onClick={navigateTo} colorScheme='teal' variant={'solid'} borderRadius={15}>{optional}</Button>)
        }

    </>
}

const CollapseMenu = () => {

    return (<>
        <Menu>
            {({ isOpen }) => (
                <>
                    <MenuButton as={Button} >
                        {!isOpen ? <HamburgerIcon /> : <CloseIcon />}
                    </MenuButton>
                    <MenuList>
                        <MenuListSignIn menu="mobile" />
                        <Link to="/"><MenuItem>Why</MenuItem></Link>
                        <Link to="/dailylog"><MenuItem>Daily log</MenuItem></Link>
                        <a href="https://dodb.cu.ma"><MenuItem>Write</MenuItem></a>
                        <MenuListOptional menu="mobile" />
                    </MenuList>
                </>
            )}
        </Menu>
    </>)
}

const DesktopMenu = () => {
    return <>
        <ButtonGroup gap='2'>
            <MenuListSignIn menu="desktop" />
            <MenuListDesktop name="Why" href="/" />
            <MenuListOptional menu="desktop" />
            <MenuListDesktop name="Daily log" href="/dailylog" />
            <MenuListDesktop name="Write" href="https://dodb.cu.ma" external={true} />
        </ButtonGroup>
    </>
}

const Navbar = () => {
    const showCollapse = useBreakpointValue({ base: true, md: false });

    // user
    const user = useContext(FirebaseContext);


    // daysLeftComponent
    const Daysleft = () => {
        const [daysLeft, setDaysLeft] = useState("")

        // days left
        const oneDay = 24 * 60 * 60 * 1000;
        const today = new Date();
        const evanDate = new Date(2022, 11, 31);
        const auguDate = new Date(2024, 5, 31);
        const evanDays = Math.round((evanDate - today) / oneDay);
        const auguDays = Math.round((auguDate - today) / oneDay);

        useEffect(() => {
            if (user.user) {
                if (user.user.uid === "WmXUrn2k82bnnlgyHkiEgeKtzau1") {
                    const daysData = { "author": "Evan", "days": evanDays }
                    setDaysLeft(daysData)
                }
                else if (user.user.uid === "lKkzOLyHSJatiy919w5IKPSkaLU2") {
                    const daysData = { "author": "Augù", "days": auguDays }
                    setDaysLeft(daysData)
                }
            }

        }, [evanDays, auguDays])

        return <>
            {
                daysLeft.days > 0
                    ?
                    <HStack>
                        <Text fontSize={['xl', '3xl']} color="green">{daysLeft.author} you have </Text><Text fontSize={['3xl', '5xl']} color="red" fontWeight="bold">{daysLeft.days}</Text><Text fontSize={['xl', '3xl']} color="green">  days left</Text>
                    </HStack>
                    :
                    <Text fontSize={['xl', '4xl']} color="red">{daysLeft.author} your dates are over</Text>
            }

        </>


    }




    return <>
        <Flex m={3}>
            <Box>
                {user.user && <Daysleft />}
            </Box>
            <Spacer />
            <Box>
                {
                    showCollapse ? <CollapseMenu /> : <DesktopMenu />
                }
            </Box>
        </Flex>
    </>
}


export default Navbar