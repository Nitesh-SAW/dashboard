// components/Header.js
import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Header = () => {
    const { title, buttons = [] } = useSelector((state) => state.header);

    return (
        <header className="w-full flex justify-between items-center p-1">
            <h1 className="text-2xl">{title}</h1>
            <div>
                {buttons.map((button, index) => (
                    <Link key={index} href={button.href || "#"} className="gap-2">
                        <Button>
                            {button.label}
                        </Button>
                    </Link>
                ))}
            </div>
        </header>
    );
};

export default Header;
