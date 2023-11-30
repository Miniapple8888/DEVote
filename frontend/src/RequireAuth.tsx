import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        async function checkConnected() {
            if (typeof window.ethereum == 'undefined') {
                console.log("Metamask not installed");
                navigate("/");
            }
            const accounts: Array<string> = await window.ethereum.request({ method: 'eth_accounts' });
            if (accounts.length === 0) {
                navigate("/");
            }
        }
        checkConnected()
    }, []);

    return children;
};

export default RequireAuth;