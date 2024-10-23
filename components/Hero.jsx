"use client";

import hero from "@styles/hero.module.scss";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Logo from "@components/Logo";
import Login from "./Login";
import { isUserExist } from "@util/functions";
import { usePathname } from "next/navigation";

const Hero = ({ name, image }) => {
    const [mobileNav, setMobileNav] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [userExist, setUserExist] = useState(false);

    useEffect(() => {
        setUserExist(isUserExist());
    }, []);

    const setLogin = () => {
        setIsLogin(!isLogin);
    };

    const setLogOut = () => {
        localStorage.removeItem("email");
        setUserExist(false);
    };


    const background = {
        backgroundImage: `
      linear-gradient(
        180deg,
        #000000 0%,
        rgba(0, 0, 0, 0) 33.33%,
        rgba(0, 0, 0, 0) 66.67%,
        #000000 100%
      ),
      url(${image})
    `,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    }


    const checkLength = (name) => {
        return name.split(" ").length > 1;
    };

    const splitName = (name) => {
        let splitedName = name.split(" ");
        let firstText = splitedName[0];

        let otherString = "";

        for (let i = 1; i < splitedName.length; i++) {
            otherString = otherString + " " + splitedName[i];
        }

        return `${firstText}<br/>${otherString}`;
    };

    return (
        <main style={background} className={hero.wrapper}>
            <div className={hero.navbar}>
                <nav className={`container`}>
                    <Logo />

                    <div className={hero.links}>
                        {userExist && (
                            <Link href="/civil-library/file/1-mUzNBGS-gf0XxLc7yGUoOxFIniFsJUN">
                                / Library
                            </Link>
                        )}
                        <Link href="/achievements">Achievements</Link>
                        <Link href="/gallery">Gallery</Link>
                        <Link href="/faculty">Faculty</Link>
                        <Link href="/association">Association</Link>
                        {/* <Link href="/facilities">/ Facilities</Link> */}
                        {/* {userExist ? (
              <Link href="#" onClick={setLogOut}>
                / Logout
              </Link>
            ) : (
              <Link href="#" onClick={setLogin}>
                / Login
              </Link>
            )} */}
                    </div>

                    {/* <Login/> */}

                    {mobileNav ? (
                        <div className={hero.mobile_links}>
                            <h1 style={{ cursor: "pointer" }} onClick={() => setMobileNav(false)}>X</h1>
                            {userExist && (
                                <Link href="/civil-library/file/1-mUzNBGS-gf0XxLc7yGUoOxFIniFsJUN">
                                    / Library
                                </Link>
                            )}
                            <Link href="/placements">Library</Link>
                            <Link href="/achievements">Achievements</Link>
                            <Link href="/gallery">Gallery</Link>
                            <Link href="/faculty">Faculty</Link>
                            {/* <Link href="/facilities">/ Facilities</Link> */}
                            {!!userExist ? (
                                <Link href="#" onClick={setLogOut}>
                                    / Logout
                                </Link>
                            ) : (
                                <Link href="#" onClick={setLogin}>
                                    / Login
                                </Link>
                            )}
                        </div>
                    ) : (
                        <p style={{ cursor: "pointer" }} className="d_lg_none" onClick={() => setMobileNav(true)}>
                            / Menu
                        </p>
                    )}
                </nav>
                <div className={`container sm_d_none ${hero.line}`} />
            </div>
            <div className={`container ${hero.hero_text}`}>
                <h1 className={hero.hero_heading}>
                    Welcome to Department of <br />
                    <span>Electrical & Electronics Engineering</span>
                </h1>
            </div>
            {isLogin && (
                <Login
                    setUserExist={setUserExist}
                    isLogin={isLogin}
                    setLogin={setLogin}
                />
            )}
        </main>
    );
};

export default Hero;
