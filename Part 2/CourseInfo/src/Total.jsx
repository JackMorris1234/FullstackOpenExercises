const Total = ({parts}) => {
    const initalValue = 0;
    const total = parts.reduce((s, p) => s + p.exercises, initalValue);


    return(
        <div>
            <p>Number of exercises {total}</p>
        </div>
    )

}





export default Total