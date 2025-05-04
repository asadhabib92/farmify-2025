import axios from "axios";
import { createContext, useState, ReactNode, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";


interface StoreContextType {
    token: string;
    setToken: (token: string) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    userName: string,
    setUserName: (userName: string) => void;
    cart: { [productId: number]: number }; // ✅ define cart type
    setCart: React.Dispatch<React.SetStateAction<{ [productId: number]: number }>>; // ✅ setCart type
    addToCart: (productId: number) => void; // ✅ addToCart function type
    removeFromCart: (productId: number) => void;
    food_list: any[];
    getTotalCartAmount: () => number
    farmName: string;
    setFarmName: (farmName: string) => void;
    // setFoodList: React.Dispatch<React.SetStateAction<any[]>>;
}

interface MyJwtPayload {
    id: string;      // or number, depending on backend
    email: string;
    name: string;
    // Add more fields if your JWT has more
}

// Create context with proper type, initially `null`
export const StoreContext = createContext<StoreContextType | null>(null);

interface StoreContextProviderProps {
    children: ReactNode;
}

const StoreContextProvider = ({ children }: StoreContextProviderProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [token, setToken] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [cart, setCart] = useState({});
    const [food_list, setFoodList] = useState([]);
    const [farmName, setFarmName] = useState("");

    const addToCart = async (productId: number) => {
        if (!cart[productId]) {
            setCart((prev) => ({ ...prev, [productId]: 1 }))
        }
        else {
            setCart((prev) => ({ ...prev, [productId]: prev[productId] + 1 }))
        }
        const token = localStorage.getItem('token');
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        if (token) {
            const decoded = jwtDecode<MyJwtPayload>(token);
            const userId = decoded.id;
            const response = await axios.post(backendUrl + '/api/cart/add', { productId, userId }, { headers: { token } });
            console.log(response.data)
            toast.success(response.data.message);
            console.log(decoded)
        }
    };

    const removeFromCart = async (productId: number) => {
        setCart((prev) => ({ ...prev, [productId]: prev[productId] - 1 }));
        const token = localStorage.getItem('token');
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        if (token) {
            const decoded = jwtDecode<MyJwtPayload>(token);
            const userId = decoded.id;
            await axios.post(backendUrl + '/api/cart/remove', { productId, userId }, { headers: { token } })
        }
    };

    const loadCartData = async (token: any) => {
        if (localStorage.getItem('token')) {
            const decoded = jwtDecode<MyJwtPayload>(token);
            const userId = decoded.id;
            const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/cart/get", { userId }, { headers: { token } })
            console.log(response.data);
            setCart(response.data.cartData);
            toast.success(response.data.message);
            console.log(cart)
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cart) {
            const product = food_list[itemId];
            if (product) {
                totalAmount += product.price * cart[itemId];
            } else {
                console.warn(`Product with id ${itemId} not found.`);
            }
        }
        return totalAmount;
    };

    const fetchFoodList = async () => {
        setLoading(true);
        const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/food/list");
        setFoodList(response.data.data);
        setLoading(false);
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem('token')) {
                await loadCartData(localStorage.getItem('token'))
            }
        }
        loadData();

    }, [])

    const contextValue: StoreContextType = {
        token,
        setToken,
        loading,
        setLoading,
        userName,
        setUserName,
        cart,
        setCart,
        addToCart,
        removeFromCart,
        food_list,
        getTotalCartAmount,
        farmName,
        setFarmName
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
