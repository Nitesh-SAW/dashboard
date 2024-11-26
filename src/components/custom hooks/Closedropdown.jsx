"use client"
import { useEffect, useRef } from "react";

// Custom Hook
const useOutsideClick = (callback) => {
    const ref = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback(); // Call callback if click is outside
            }
        };

        // Attach the event listener
        document.addEventListener("mousedown", handleClickOutside);

        // Cleanup on unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return ref;
};

export default useOutsideClick;
