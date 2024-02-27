import {Pie} from "react-chartjs-2";
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from "chart.js";
import {useCrypto} from "../context/crypto-context.jsx";

ChartJS.register(ArcElement, Tooltip, Legend);

export const PortfolioChart = () => {
    const {assets} = useCrypto()

    const data = {
        labels: assets.map(a => a.name),
        datasets: [
            {
                label: '$',
                data: assets.map(a => a.totalAmount),
                backgroundColor: [
                    'rgba(255, 99, 132)',
                    'rgba(54, 162, 235)',
                    'rgba(255, 206, 86)',
                    'rgba(75, 192, 192)',
                    'rgba(153, 102, 255)',
                    'rgba(255, 159, 64)',
                ],
            },
        ],
    };

    return (
        <div style={{display: "flex", justifyContent: "center", height: '60%'}}>
            <Pie data={data}/>
        </div>
    );
};

