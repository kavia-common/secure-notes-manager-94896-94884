"use client";

import React, { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

// Import Figma-extracted CSS into this page only.
// In a real app, consider scoping or moving to global if used across pages.
import "./common.css";
import "./sign-in-11-235.css";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  // Controlled inputs, mapped to the Figma structure's fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(
    () => Boolean(email.trim()) && Boolean(password.trim()) && !submitting,
    [email, password, submitting]
  );

  // PUBLIC_INTERFACE
  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      /** Handles Figma CTA button click or form submit, calls AuthContext.login and navigates to home on success. */
      if (e) e.preventDefault();
      if (!canSubmit) return;
      setSubmitting(true);
      setError(null);
      try {
        await login(email, password);
        router.push("/");
      } catch (err: unknown) {
        const msg =
          typeof err === "object" && err && "message" in err
            ? String((err as { message?: string }).message || "Login failed")
            : "Login failed";
        setError(msg);
      } finally {
        setSubmitting(false);
      }
    },
    [canSubmit, email, password, login, router]
  );

  return (
    <main className="screen-frame sign-in" role="main" aria-label="Sign In Screen">
      {/* Decorative status bar time */}
      <div className="status-bar" aria-hidden="true">
        <div className="time">19:27</div>
      </div>

      {/* Header Title Group */}
      <header className="sign-in-header">
        <h1 className="hello">Hello,</h1>
        <p className="welcome">Welcome Back!</p>
      </header>

      {/* Error banner if present */}
      {error && (
        <div
          role="alert"
          style={{
            position: "absolute",
            left: 30,
            top: 190,
            width: 315,
            background: "#fee2e2",
            color: "#991b1b",
            borderRadius: 10,
            padding: "8px 12px",
            fontSize: 12,
          }}
        >
          {error}
        </div>
      )}

      {/* Email Input */}
      <div className="input-group email">
        <label htmlFor="email" className="input-label">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="input-field"
          placeholder="Enter Email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          required
        />
      </div>

      {/* Password Input */}
      <div className="input-group password">
        <label htmlFor="password" className="input-label">
          Enter Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="input-field"
          placeholder="Enter Password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          required
        />
      </div>

      {/* Forgot Password - placeholder link */}
      <Link href="#" className="forgot-password" onClick={(e) => e.preventDefault()}>
        Forgot Password?
      </Link>

      {/* Primary CTA */}
      <button
        type="button"
        className="btn-primary sign-in-button"
        id="cta-sign-in"
        aria-label="Sign In"
        onClick={handleSubmit}
        disabled={!canSubmit}
        style={{
          opacity: canSubmit ? 1 : 0.6,
          cursor: canSubmit ? "pointer" : "not-allowed",
        }}
      >
        <span>{submitting ? "Signing in..." : "Sign In"}</span>
        <span aria-hidden="true" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 20, height: 20 }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" role="img" aria-label="arrow right">
            <path d="M3 10h12" stroke="#000" strokeWidth="1.3" />
            <path d="M10 5l5 5-5 5" stroke="#000" strokeWidth="1.3" fill="none" />
          </svg>
        </span>
      </button>

      {/* Divider */}
      <div className="alt-divider" aria-hidden="true">
        <div className="line"></div>
        <div className="text">Or Sign in With</div>
        <div className="line"></div>
      </div>

      {/* Social Sign-in (no-op buttons, accessible, no alerts) */}
      <div className="social-row">
        <button
          type="button"
          className="btn-social"
          aria-label="Sign in with Google"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <span className="icon-google" aria-hidden="true">
            <span className="g-yellow"></span>
            <span className="g-red"></span>
            <span className="g-green"></span>
            <span className="g-blue"></span>
          </span>
        </button>
        <button
          type="button"
          className="btn-social"
          aria-label="Sign in with Facebook"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <span className="icon-facebook" aria-hidden="true">
            <span className="bg"></span>
            <span className="f"></span>
          </span>
        </button>
      </div>

      {/* Signup text */}
      <p className="signup-text">
        Don’t have an account?
        <Link href="/register" className="link">
          Sign up
        </Link>
      </p>

      {/* Home Indicator (decorative) */}
      <div className="home-indicator" aria-hidden="true">
        <div className="pill"></div>
      </div>
    </main>
  );
}
