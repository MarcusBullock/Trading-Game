import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

function Chart({ data }: any) {
    // TODO change type above
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="created_at" />
                <YAxis />
                <Tooltip />
                <Legend />

                {/* One line for each company */}
                <Line
                    type="monotone"
                    dataKey="CompanyA"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="CompanyB" stroke="#82ca9d" />
                <Line type="monotone" dataKey="CompanyC" stroke="#ffc658" />
                <Line type="monotone" dataKey="CompanyD" stroke="#d88484" />
                <Line type="monotone" dataKey="CompanyE" stroke="#84d8d8" />
                <Line type="monotone" dataKey="CompanyF" stroke="#d8d884" />
                <Line type="monotone" dataKey="CompanyG" stroke="#d884d8" />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default Chart;
