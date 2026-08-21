import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/Progress.css";
import { getDashboard } from "../services/dashboardService";

export default function Progress() {

    const [stats, setStats] = useState({
        notes: 0,
        totalAssignments: 0,
        completed: 0,
        pending: 0,
        completion: 0,
    });

    useEffect(() => {

        const fetchProgress = async () => {

            try {

                const data = await getDashboard();

                const completion =
                    data.total_assignments === 0
                        ? 0
                        : Math.round(
                            (data.completed_assignments /
                                data.total_assignments) * 100
                        );

                setStats({
                    notes: data.total_notes,
                    totalAssignments: data.total_assignments,
                    completed: data.completed_assignments,
                    pending: data.pending_assignments,
                    completion,
                });

            } catch (error) {

                console.error(error);

            }

        };

        fetchProgress();

    }, []);

    const cards = [
        {
            title: "📒 Notes",
            value: stats.notes
        },
        {
            title: "📝 Assignments",
            value: stats.totalAssignments
        },
        {
            title: "✅ Completed",
            value: stats.completed
        },
        {
            title: "⏳ Pending",
            value: stats.pending
        },
    ];

    return (
        <>
            <Sidebar />

            <div className="progress-page">

                <h1>📊 Progress Dashboard</h1>

                <p className="subtitle">
                    Track your learning progress.
                </p>

                <div className="progress-grid">

                    {cards.map(card => (

                        <div
                            className="progress-card"
                            key={card.title}
                        >

                            <h2>{card.title}</h2>

                            <h1>{card.value}</h1>

                        </div>

                    ))}

                </div>

                <div className="progress-section">

                    <h2>Assignment Completion</h2>

                    <div className="progress-bar">

                        <div
                            className="progress-fill"
                            style={{
                                width: `${stats.completion}%`
                            }}
                        />

                    </div>

                    <p>
                        {stats.completion}% Completed
                    </p>

                </div>

                <div className="progress-section">

                    <h2>Quick Summary</h2>

                    <ul>

                        <li>
                            Total Notes: {stats.notes}
                        </li>

                        <li>
                            Total Assignments: {stats.totalAssignments}
                        </li>

                        <li>
                            Completed: {stats.completed}
                        </li>

                        <li>
                            Pending: {stats.pending}
                        </li>

                    </ul>

                </div>

            </div>
        </>
    );
}