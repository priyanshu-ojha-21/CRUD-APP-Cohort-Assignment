import { useContext, useState, createContext, useEffect } from "react";
import axiosInstance from "../../../shared/api/AxiosInstance"; // 👈 apna path daal

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const bootstrapAuth = async () => {
            try {
                // Step 1: cookie se naya access token lo
                const { data: refreshData } = await axiosInstance.post("/auth/refresh-token");
                const newToken = refreshData.data.accessToken;
                setAccessToken(newToken);

                // Step 2: usi token se apna profile fetch karo
                const { data: meData } = await axiosInstance.get("/auth/me", {
                    headers: { Authorization: `Bearer ${newToken}` }
                });
                setUser(meData.data.user);
            } catch (err) {
                // refresh token bhi invalid/expired hai — matlab genuinely logged out hai
                setUser(null);
                setAccessToken(null);
            } finally {
                setLoading(false);
            }
        };

        bootstrapAuth();
    }, []); // 👈 sirf ek baar, app mount hote hi

    const value = { user, accessToken, loading, isAuthenticated: !!user, setUser, setAccessToken, setLoading };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};

export default AuthContext;