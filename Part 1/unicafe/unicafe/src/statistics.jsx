import StatisticLine from './StatisticLine'

const Statistics = (props) => {
    const { good, neutral, bad, all, average, positive } = props;

    if (all === 0) {
        return (
            <div>
                <h1>statistics</h1>
                <p>No feedback given</p>
            </div>
        )
    }

    return(
        <div>
            <h1>statistics</h1>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={all} />
            <StatisticLine text="average" value={average} />
            <StatisticLine text="positive" value={positive} end="%"/>
        </div>
    )
}

export default Statistics