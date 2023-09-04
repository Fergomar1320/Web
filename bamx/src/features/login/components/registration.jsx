import { useRef, useState, useEffect } from "react";
import { RegistrationStyles } from "../styles/registrationStyles";
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]),{8,24}$/;
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/

const Registration = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validUser, setValidUser] = useState(false)
    const [userFocus, setUserFocus] = useState(false)

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() =>{
        const result = USER_REGEX.test(user);
        console.log(user);
        console.log(result);
        setValidUser(result);
    }, [user])

    useEffect(() => {
        const pwdResult = PWD_REGEX.test(pwd);
        console.log(pwdResult);
        console.log(pwd);
        setValidPwd(pwdResult);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    useEffect(() =>{
        setErrMsg('');
    }, [user, pwd, errMsg])

    return(
        <Section style={RegistrationStyles.screen}>
            <div style={RegistrationStyles.logo}>
                <img width={'100%'} src = "https://s3-alpha-sig.figma.com/img/7949/0c4c/693a1740b876bde5ffe4761ed71a036b?Expires=1694390400&Signature=NxieEW4JVXhMt7Kr7OjYgiY9ut6Apy~~a0EXC-RtiVvyH5JUiDpLvMecYZFZLNJz6RAI2~2GvfvRnE3A2dEaum6s4sJwr8BZ~BzGV9s1BHZN1xoaFyY2RzhK47cz~UOL1pJ4gAbVUvd7gn9x0PKcwgJelVR487fCqDefILrXt4F-wTqdVARhbiWnCVaMo~FIKhl4F13ZmSqz0LWoKpoz0G8VOjBOP8U61I1tmdsicvbrzoUTbtAC7NFD-Ef8RRbB6ky5tTgmje8BZToD7lzDGT~4Cwj6Ou5DR15KkyhEPscli7b5CGmGt6HEkA0pQy05djzn8Eodt7axdkNbXlCJHg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="BAMX logo"/>
            </div>
            <p ref = {errRef} className = {errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1 className="loginText">¡Bienvenido!</h1>
            <form>
                <label className="welcome" htmlFor="username">
                    Username:
                </label>

                <input
                    //style={RegistrationStyles.input}
                    type ="text"
                    id = "username"
                    ref = {userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    required
                    aria-invalid = {validUser ? "false":"true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                    />

                <span style={validUser ? RegistrationStyles.feedback.valid : RegistrationStyles.hide}>
                    <p>VALIDO</p>
                </span>

                <span style={validUser || !user ? RegistrationStyles.hide : RegistrationStyles.invalid}>
                    <p>NO VALIDO</p>
                </span>
                

                <p id="uidnote" style={userFocus && user && !validUser ? RegistrationStyles.feedback : RegistrationStyles.hide}>
                    Tu nombre de usuario debe contener entre 4 y 24 caracteres. <br/>
                    Debe comenzar con una letra. <br/>
                    Letras, numeros, y '_' permitidos.
                </p>

                <label className="welcome" htmlFor="password">
                    Password:
                </label>

                <input
                    //style={RegistrationStyles.input}
                    type ="text"
                    id = "password"
                    ref = {userRef}
                    autoComplete="off"
                    onChange={(e) => setPwd(e.target.value)}
                    required
                    aria-invalid = {validPwd ? "false":"true"}
                    aria-describedby="uidnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                    />

                <span className={validPwd ? "valid" : "hide"}>
                    <p>VALIDO</p>
                </span>

                <span className={validPwd || !pwd ? "hide" : "invalid"}>
                    <p>NO VALIDO</p>
                </span>
                

                <p id="uidnote" className={pwdFocus && pwd && !validPwd ? "feedback" : "hide"}>
                    Tu contraseña debe contener entre 3 y 24 caracteres. <br/>
                    Se admiten minus, mayus, numeros, y los caracteres '!@#$%' <br/>
                </p>
            </form>
        </Section>
    )
}

export default Registration