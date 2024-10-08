import { Link } from "react-router-dom";

interface IBtn {
  text: string;
  color: string;
  link: string;
}

const Button = ({ text, color, link }: IBtn) => {
  return (
    <Link to={link}>
      <div
        style={{ backgroundColor: color }}
        className="py-2 rounded-md px-5 cursor-pointer text-white"
      >
        {text}
      </div>
    </Link>
  );
};

export default Button;
