import { Mail } from "lucide-react";
import "../styles/Contact.css";

function Contact() {
    return (
        <section className="contact-section" id="contact">

            <div className="contact-content">

                <span className="section-label">
                    GET IN TOUCH
                </span>

                <h2>
                    Have a question?
                </h2>

                <p>
                    We'd love to hear your feedback, suggestions,
                    or ideas for improving StudyNest.
                </p>

                <a
                    href="mailto:studynest.contact@gmail.com"
                    className="contact-link"
                >
                    <Mail size={15} />
                    Contact StudyNest
                </a>

            </div>

        </section>
    );
}

export default Contact;