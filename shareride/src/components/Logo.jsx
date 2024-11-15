import { useNavigate } from "react-router-dom";


function Logo() {
  const src = "/Share-Ride-logo.png";

  const navigate = useNavigate();

  function handleLogoClick(){
      navigate("/")
  }

  return (
    <div className="text-center cursor-pointer" onClick={handleLogoClick}>
      <img src={src} alt="Logo" className="h-24 w-auto" />
    </div>
  );
}

export default Logo;
