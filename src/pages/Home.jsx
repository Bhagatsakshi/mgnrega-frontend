import React from "react";

export default function Home() {
  return (
    <div className="container text-center my-5">
      <div className="p-4 bg-light rounded shadow-sm">
        <h1 className="fw-bold text-success mb-3">
          Empowering Rural Voices through Technology
        </h1>
        <p className="lead">
          “Our Voice, Our Rights” connects citizens with transparent insights into
          the Mahatma Gandhi National Rural Employment Guarantee Scheme (MGNREGA).
          It helps people understand how their district is performing — easily and
          visually, even for first-time internet users.
        </p>
        <img
          src="https://i.pinimg.com/originals/3a/a7/dd/3aa7dd6250bd44751a0e9023922acc53.jpg"
          alt="Rural community using technology"
          className="img-fluid rounded my-4 shadow"
          style={{ maxHeight: "380px" }}
        />
        <p>
          Choose your district or allow automatic detection to view MGNREGA data
          in an easy-to-understand way. Our platform aims to make government data
          accessible to everyone — in local languages and simple visuals.
        </p>
        <a href="/upload" className="btn btn-success btn-lg mt-3">
          Get Started
        </a>
      </div>
    </div>
  );
}

