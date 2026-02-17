import { createContext, useContext, useEffect, useState } from "react";

// 1. create context
const AuthContext = createContext(null);

// key สำหรับ localStorage
const STORAGE_KEY = "auth_user";

// 2. provider
export function AuthProvider({ children }) {

  //  เพิ่ม loading state
  const [isLoading, setIsLoading] = useState(true);

  //  โหลด user จาก localStorage ตอนเริ่ม
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEY);
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from storage", error);
      return null;
    }
  });

  //  sync user localStorage ทุกครั้งที่ user เปลี่ยน
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  // 🔥 บอกว่าโหลดเสร็จแล้วหลัง mount
  useEffect(() => {
    setIsLoading(false);
  }, []);

  // ===== login =====
  const login = (userData) => {
    console.log("AuthContext - login called with:", userData);
    setUser(userData);
  };

  // ===== logout =====
  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isLoading, // 🔥 เพิ่มอันนี้
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// 3. custom hook
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
