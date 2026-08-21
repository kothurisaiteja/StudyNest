import { FileText, ClipboardCheck, PieChart } from "lucide-react";
import "../styles/Features.css";

function Features() {
    const features = [
        {
            icon: FileText,
            title: "AI Notes",
            description:
                "Create smart, organized notes and keep your study material in one place."
        },
        {
            icon: ClipboardCheck,
            title: "Assignments",
            description:
                "Track your assignments, deadlines and completed work effortlessly."
        },
        {
            icon: PieChart,
            title: "Attendance",
            description:
                "Monitor your attendance and stay aware of your academic progress."
        }
    ];

    return (
        <section className="features" id="features">

            <div className="features-heading">
                <span>STUDY SMARTER</span>

                <h2>
                    Everything you need to stay organized.
                </h2>

                <p>
                    One simple workspace for managing your academic life.
                </p>
            </div>

            <div className="feature-container">

                {features.map((feature) => {
                    const Icon = feature.icon;

                    return (
                        <div className="feature-card" key={feature.title}>

                            <div className="feature-icon">
                                <Icon size={20} strokeWidth={1.7} />
                            </div>

                            <h3>{feature.title}</h3>

                            <p>{feature.description}</p>

                        </div>
                    );
                })}

            </div>

        </section>
    );
}

export default Features;