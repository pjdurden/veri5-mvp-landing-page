"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ShieldCheck, Zap } from "lucide-react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import Link from "next/link";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAimbVcrMCFTdJ1J0UwExaI3AgqYCDJmro",
    authDomain: "veri5-a3615.firebaseapp.com",
    projectId: "veri5-a3615",
    storageBucket: "veri5-a3615.firebasestorage.app",
    messagingSenderId: "190630579906",
    appId: "1:190630579906:web:2db953525a80406cdeb55b",
    measurementId: "G-JBLX4ZX7ND"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "waitlist"), { email });
      setSubmitted(true);
      setEmail("");
    } catch (err) {
      console.error("Error adding email to waitlist", err);
    }
  };

  return (
    
    <div className="min-h-screen bg-white text-blue-900 font-sans">

    <header className="bg-white text-blue-900 py-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6">
        {/* Brand Name and Motto */}
        <div>
          <h1 className="text-3xl font-semibold">Veri5</h1>
          <p className="text-sm text-gray-600 mt-2">The Trust Layer for Digital Payments</p>
        </div>

        {/* Waitlist Button */}
        <div>
          <Button
            onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-blue-600 text-white px-6 py-2 rounded-md"
          >
            Join Waitlist
          </Button>
        </div>
      </div>
    </header>

      {/* Hero */}
      <section className="text-center px-6 py-24">
        <h1 className="text-5xl md:text-6xl font-semibold mb-4">Instant Real-Time Identity & Payment Verification</h1>
        <p className="text-lg text-blue-800 max-w-2xl mx-auto mb-8">
          Secure your transactions with fast, accurate, and reliable identity and account holder name verification.
        </p>
        <div className="flex justify-center gap-4">
          <Button className="bg-blue-600 text-white px-5 py-2 rounded-md" onClick={() => setShowModal(true)}>Get Early Access</Button>
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Your Sandbox Access Credentials</h2>
                <p className="text-sm text-blue-900 mb-4">
                  You can now access the <strong>sandbox environment</strong> using the credentials below:
                </p>
                <p className="mb-2">
                  <strong>API Key:</strong>{" "}
                  <code className="bg-gray-100 px-2 py-1 rounded">123456-my-api-key</code>
                </p>
                <p className="mb-4">
                  <strong>Customer ID:</strong>{" "}
                  <code className="bg-gray-100 px-2 py-1 rounded">cust-001</code>
                </p>
                <p className="text-sm text-blue-800 mb-4">
                  Use these keys to test and integrate with our real-time identity and payment verification APIs.
                </p>
                <p className="text-sm text-blue-800 mb-6">
                  To explore the full list of available endpoints and try them out interactively, visit the{" "}
                  <a href="/openapi-docs" className="text-blue-600 underline font-medium">
                    API Docs
                  </a>.
                </p>
                <Button className="bg-blue-600 text-white w-full" onClick={() => setShowModal(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}

      <Link href="/openapi-docs">
        <Button variant="outline" className="border-blue-600 text-blue-600 px-5 py-2 rounded-md">
          View API Docs
        </Button>
      </Link>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-6 py-16 max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
        {[{
          icon: ShieldCheck,
          title: "Fraud Prevention",
          text: "Verify account holder names against IBAN and other financial data to stop fraud before it happens.",
        }, {
          icon: Zap,
          title: "Lightning Fast",
          text: "Sub-second response times to enable seamless and secure payment flows.",
        }, {
          icon: CheckCircle,
          title: "Easy Integration",
          text: "RESTful APIs, comprehensive documentation, and sandbox access for smooth integration into your platform.",
        }].map((item, index) => (
          <Card key={index} className="border border-blue-100">
            <CardContent className="p-6 text-center">
              <item.icon className="mx-auto mb-4 h-8 w-8 text-blue-600" />
              <h3 className="text-lg font-medium mb-2">{item.title}</h3>
              <p className="text-sm text-blue-800">{item.text}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* How It Works */}
      <section className="px-6 py-20 max-w-3xl mx-auto">
        <h2 className="text-3xl font-medium text-center mb-8">How It Works</h2>
        <ol className="list-decimal list-inside space-y-4 text-blue-800 text-base">
          <li>Send an IBAN or account details for verification.</li>
          <li>We verify the account holder’s name and other financial details using our real-time APIs.</li>
          <li>Receive a match score and detailed verification results for fraud detection and compliance.</li>
          <li>Integrate the verification response into your payment flows or customer onboarding process.</li>
        </ol>
      </section>

      {/* Use Cases */}
      <section className="px-6 py-20 max-w-5xl mx-auto">
        <h2 className="text-3xl font-medium text-center mb-10">Use Cases</h2>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          {[
            ["Cross-Border Payments", "Enable fast, secure international B2B and P2P payments."],
            ["Payment Service Providers", "Meet regulatory compliance requirements like VOP & PSD2."],
            ["Banks & Neobanks", "Prevent payment errors and fraud through accurate account verification."],
          ].map(([title, desc], idx) => (
            <Card key={idx} className="border border-blue-100">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-2">{title}</h3>
                <p className="text-sm text-blue-800">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="px-6 py-24 bg-blue-50 text-center">
        <h2 className="text-3xl font-medium mb-4">Join the Early Access List</h2>
        <p className="text-base text-blue-800 mb-6">Be the first to use our cutting-edge verification API for your platform.</p>
        {submitted ? (
          <p className="text-lg font-medium text-blue-700">✅ You're on the list!</p>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="px-4 py-2 rounded-md text-sm w-full border border-blue-200"
            />
            <Button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
              Join Waitlist
            </Button>
          </form>
        )}
      </section>

      {/* Footer */}
      <footer className="px-6 py-6 text-center text-sm text-blue-600 bg-white border-t border-blue-100">
        &copy; {new Date().getFullYear()} Veri5. Empowering financial transactions with trusted verification.
      </footer>
    </div>
  );
}
