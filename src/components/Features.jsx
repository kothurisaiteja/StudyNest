  import "../styles/Features.css";


function Features(){
    return(
        <section className="features">
            <h2>Why Choose StudyNest?</h2>
            <div className="feature-container">
                 <div className="feature-card">
                    <h3>AI Notes</h3>
                    <p>Create smart notes.</p>
                 </div>
     
                 <div className="feature-card">
                    <h3>Assignments</h3>
                    <p>Track assignments.</p>
                 </div>

                 <div className="feature-card">
                    <h3>Attendance</h3>
                    <p>Monitor attendance.</p>
                 </div>
            </div>
        </section>
    );
}


export default Features;