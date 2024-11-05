import React from "react";
import Chatbox from "./Chatbox"; // Import Chatbox or any other components you want to include

const About = () => {
  return (
    <div className="h-full w-full bg-[#E2E3E5] p-6">
      <h1 className="text-3xl font-bold mb-4">
        About Our Society Management System
      </h1>
      <section className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h2 className="text-2xl font-semibold mb-2">Overview</h2>
        <p>
          Our Society Management System is designed to streamline the management
          of residential societies. It provides an efficient platform for
          managing various aspects such as billing, maintenance, communication,
          and much more. With user-friendly interfaces and robust features, we
          aim to enhance the living experience within communities.
        </p>
      </section>
      <section className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h2 className="text-2xl font-semibold mb-2">Features</h2>
        <ul className="list-disc list-inside">
          <li>
            Easy management of bills (Parking, Electricity, Maintenance, etc.)
          </li>
          <li>Real-time communication with residents through chat features</li>
          <li>Updates and announcements from society management</li>
          <li>User account management for residents</li>
          <li>Payment processing for bills and services</li>
        </ul>
      </section>
      <section className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h2 className="text-2xl font-semibold mb-2">Our Team</h2>
        <p>
          Our team consists of dedicated professionals who are passionate about
          enhancing community living through technology. We work hard to ensure
          that our system meets the needs of residents and society managers
          alike.
        </p>
        <ul className="list-disc list-inside">
          <li>Manoah Bhavikatti - Project Manager</li>
          <li>Glavin Lobo - Lead Developer</li>
          <li>Rajesh Mishra - UI/UX Designer</li>
          <li>Nelson Alvares - QA Engineer</li>
        </ul>
      </section>
      <section className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h2 className="text-2xl font-semibold mb-2">Get in Touch</h2>
        <p>
          For any inquiries or feedback, please reach out to us at:
          <a
            href="mailto:support@societymanagement.com"
            className="text-blue-600 hover:underline"
          >
            support@societymanagement.com
          </a>
        </p>
      </section>
      <Chatbox /> {/* Include Chatbox component for interaction */}
    </div>
  );
};

export default About;
