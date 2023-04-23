import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Divider, Heading, Radio, RadioGroup, Stack, StackDivider, Text } from "@chakra-ui/react"
import { useState } from "react"
import { articles } from "./data/articles";
import { highlight } from "./data/highlight";

const quizGenerator = () => {
    // select which data to use - full article or highlighted article
    const dataSet = (Math.floor(Math.random() * 20) + 1) % 2 === 0 ? articles : highlight;
    // select which method - article number as question or answer
    const numberMethod = (Math.floor(Math.random() * 20) + 1) % 2 === 0 ? true : false;
    // generate four unique index for aricles from the data set
    function generateUniqueRandomIntegers(num) {
        let nums = [];
        while (nums.length < 4) {
            let rand = Math.floor(Math.random() * num);
            if (!nums.includes(rand)) {
                nums.push(rand);
            }
        }
        return nums;
    }
    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
    const generateRandomString = (length) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    const randomString = generateRandomString(6);

    const articlesIndexArray = generateUniqueRandomIntegers(dataSet.length);
    const selectedArticlesObject = articlesIndexArray.map(d => dataSet[d]);
    const question = numberMethod ? selectedArticlesObject[0].articleNo : selectedArticlesObject[0].article;
    const unHashedAnswer = !numberMethod ? selectedArticlesObject[0].articleNo : selectedArticlesObject[0].article.replace(/\n\s*/g, '');
    const answer = `${unHashedAnswer}-${randomString}`;
    const unshuffledOptions = numberMethod ? selectedArticlesObject.map(d => d.article) : selectedArticlesObject.map(d => d.articleNo);
    const options = shuffleArray(unshuffledOptions).map(d => d.replace(/\n\s*/g, '')).map(d => `${d}-${randomString}`);
    return { question, answer, options, numberMethod, randomString }
}

const Options = (option, handleChange, handleOptionChange, numberMethod, randomString) => {
    const pattern = `-${randomString}`;
    const unHashedOption = option.replace(pattern,"")
    return <Box p={3} key={option} onClick={() => handleOptionChange(option)} className="optionsBox">
        <Radio size='lg' name='options' colorScheme='blue' value={option} onChange={handleChange}>
            <Text fontSize='sm'>
                {!numberMethod ? `Article ${unHashedOption}` : unHashedOption}
            </Text>
        </Radio>
    </Box>
}

const Quiz = () => {
    const [optionChecked, setOptionChecked] = useState(false);
    const [answerChecked, setAnswerChecked] = useState(false);
    const [quizData, setQuizData] = useState(quizGenerator());
    const [selectedOption, setSelectedOption] = useState(null);

    const handleChange = (event) => {
        setOptionChecked(event.target.checked);
    };

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    const answer = quizData.answer;

    const handleCheckAnswer = () => {
        if (!answerChecked) {
            const selectedBox = document.querySelector(`input[name="options"][value="${selectedOption}"]`).parentElement;
            if (selectedOption == answer) {
                selectedBox.parentNode.style.backgroundColor = "var(--chakra-colors-green-400)";
            } else {
                selectedBox.parentNode.style.backgroundColor = "var(--chakra-colors-red-400)";
            }
            const answerBox = document.querySelector(`input[name="options"][value="${answer}"]`).parentElement;
            answerBox.parentNode.style.backgroundColor = "var(--chakra-colors-green-400)";
            setAnswerChecked(true);
        }
    };

    const nextQuestion = () => {
        setAnswerChecked(false);
        setOptionChecked(false);
        setSelectedOption(null);
        setQuizData(quizGenerator());
        document.querySelectorAll(".optionsBox").forEach(d => d.style.backgroundColor = "");
    }

    return <Card m={5}>
        <CardHeader>
            <Heading size='md'>{quizData.numberMethod ? `Article ${quizData.question}` : quizData.question}</Heading>
        </CardHeader>

        <CardBody>
            <RadioGroup defaultValue=''>
                <Stack divider={<StackDivider />} spacing='4'>
                    {
                        quizData.options.map((d) => Options(d, handleChange, handleOptionChange, quizData.numberMethod, quizData.randomString))
                    }
                </Stack>
            </RadioGroup>
        </CardBody>
        <Divider />
        <CardFooter>
            <ButtonGroup spacing='2'>
                {!answerChecked && (<Button variant='solid' colorScheme='blue' isDisabled={!optionChecked} onClick={handleCheckAnswer}>
                    Check Answer
                </Button>)
                }
                <Button variant='ghost' colorScheme='blue' onClick={nextQuestion}>
                    Next
                </Button>
            </ButtonGroup>
        </CardFooter>
    </Card>
}

export default Quiz