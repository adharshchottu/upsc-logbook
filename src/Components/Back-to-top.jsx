import React, { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";


export const BackToTop = React.forwardRef((props, ref) => {
    const [showButton, setShowButton] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 100) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return showButton ? (
        <Button onClick={handleClick}
            position="fixed"
            bottom="20px"
            right="20px"
            margin="10px"
            colorScheme={"teal"}
        >
            <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
            >
                <path d="M12 5v14M19 12l-7-7-7 7"></path>
            </svg>
        </Button>
    ) : null;
});
