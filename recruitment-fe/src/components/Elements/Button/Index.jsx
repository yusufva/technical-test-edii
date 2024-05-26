const Button = (props) => {
    const {
        children,
        type = "button",
        className = "bg-black",
        onClick = () => {},
    } = props;
    return (
        <button
            className={`h-10 px-5 font-semibold rounded-md ${className} text-white`}
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
