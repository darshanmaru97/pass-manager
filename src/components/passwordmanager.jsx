import React, { useState, useEffect } from 'react';

const PasswordManager = () => {
    const [website, setWebsite] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwords, setPasswords] = useState([]);

    const maskPassword = (pass) => {
        let str = "";
        for (let index = 0; index < pass.length; index++) {
            str += "*";
        }
        return str;
    };

    const copyText = (txt) => {
        navigator.clipboard.writeText(txt).then(
            () => {
                alert("Copied to clipboard");
            },
            () => {
                alert("Clipboard copying failed");
            }
        );
    };

    const deletePassword = (website) => {
        let updatedPasswords = passwords.filter((pw) => pw.website !== website);
        setPasswords(updatedPasswords);
        localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
    };

    useEffect(() => {
        const storedPasswords = JSON.parse(localStorage.getItem("passwords")) || [];
        setPasswords(storedPasswords);
    }, []);

    const handleSavePassword = (e) => {
        e.preventDefault();
        const newEntry = { website: website, username: username, password: password };
        const updatedPasswords = [...passwords, newEntry];
        setPasswords(updatedPasswords);
        localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
        setWebsite("");
        setUsername("");
        setPassword("");
    };

    return (
        <div>
            <form>
                <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="Website" />
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <button className="btn" onClick={handleSavePassword}>Save Password</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Website</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {passwords.map((pw, index) => (
                        <tr key={index}>
                            <td>{pw.website} <button onClick={() => copyText(pw.website)}>Copy</button></td>
                            <td>{pw.username} <button onClick={() => copyText(pw.username)}>Copy</button></td>
                            <td>{maskPassword(pw.password)} <button onClick={() => copyText(pw.password)}>Copy</button></td>
                            <td><button onClick={() => deletePassword(pw.website)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PasswordManager;
