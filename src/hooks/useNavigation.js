import { useNavigate } from "react-router-dom";

/*Custom Hook สำหรับ navigation * ใช้เพื่อย้ายหน้าแบบ reusable */
function useNavigation() {
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
  };

  return { goTo };
}

export default useNavigation;
