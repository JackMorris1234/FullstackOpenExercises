
const StatisticLine=(props)=>{
    const {text, value, end}=props

    return(
        <tr>
            <td>{text}</td>
            <td>{value}{end}</td>
        </tr>
    )
}

export default StatisticLine