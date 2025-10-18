import { useState } from "react";
import { toast } from 'react-hot-toast';
import { useAuthContext } from "../context/authContext";

function handleInputErrors({ username, password }) {
    if (!username || !password) {
        toast.error("Username and Password cannot be empty");
        return false;
    }
    return true;
}

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { authUser, setAuthUser } = useAuthContext();

    const login = async ({ username, password }) => {
        const isValid = handleInputErrors({ username, password });
        if (!isValid) return { success: false, error: "Invalid input" };

        setLoading(true);
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userName: username, password }),
            });

            const responseText = await res.text();

            let data;
            try {
                data = JSON.parse(responseText);
            } catch {
                toast.error("Invalid response from server");
                return { success: false, error: "Invalid server response" };
            }

            if (!res.ok) {
                const errorMessage = data.error || data.message || "Login failed";
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }

            // Successful login
            localStorage.setItem("auth-user", JSON.stringify(data));
            setAuthUser(data);
            toast.success("Login successful!");
            return { success: true, message: "Login successful" };

        } catch (error) {
            const errMsg = error.message || "Network error occurred";
            toast.error(errMsg);
            return { success: false, error: errMsg };
        } finally {
            setLoading(false);
        }
    };

    return { loading, login };
};

export default useLogin;
