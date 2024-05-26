import Button from "../Elements/Button/Index";

const TopSection = (props) => {
    const { title, onClick = () => {}, className } = props;
    // eslint-disable-next-line no-unused-vars

    return (
        <div className="w-full flex justify-between sticky bg-sky-700 text-white h-20 max-h-20 pt-4 px-10 mb-10 -left-10">
            <h1 className="text-white text-3xl font-bold mb-10">{title}</h1>
            <Button
                className={`bg-transparent text-2xl ${className}`}
                onClick={onClick}
            >
                Logout
            </Button>
        </div>
    );
};

export default TopSection;
