import React from "react";

export default function About() {
    return (
        <div className="container my-5">
            <div className="row align-items-center">
                <div className="col-md-6 mb-4">
                    <img
                        src="https://www.iasgyan.in/ig-uploads/images/image01172.png"
                        alt="MGNREGA workers"
                        className="img-fluid rounded shadow"
                    />
                </div>
                <div className="col-md-6">
                    <h2 className="fw-bold text-success mb-3">About the Project</h2>
                    <p className="lead">
                        The <strong>“Our Voice, Our Rights”</strong> platform simplifies complex
                        MGNREGA data so every citizen — regardless of digital literacy — can
                        understand how their district is performing.
                    </p>
                    <p>
                        It uses open data from{" "}
                        <a
                            href="https://data.gov.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-success fw-semibold"
                        >
                            data.gov.in
                        </a>{" "}
                        and automatically detects your district using location services.
                    </p>
                    <p>
                        Citizens can upload their voice feedback or reports, and future
                        updates will visualize performance and progress of MGNREGA in every
                        district.
                    </p>
                </div>
            </div>
        </div>
    );
}

