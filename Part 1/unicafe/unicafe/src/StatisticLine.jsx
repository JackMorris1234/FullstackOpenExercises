
const StatisticLine=(props)=>{
    const {text, value, end}=props

    return(
        <p>{text} {value} {end}</p>
    )
}

export default StatisticLine