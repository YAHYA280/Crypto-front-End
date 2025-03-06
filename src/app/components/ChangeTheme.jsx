"use client";

import { useEffect } from "react";
import { getCookie } from "cookies-next";

export default function UseThemeFromCookie() {
    useEffect(() => {
        // const theme = getCookie("theme") || "dark";
        const theme = "dark";
        localStorage.setItem("theme", theme); // Store in localStorage
        document.documentElement.setAttribute("data-theme", theme); // Optional: Apply theme
    }, []);

    return null;
}
