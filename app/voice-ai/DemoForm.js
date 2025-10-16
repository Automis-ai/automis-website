"use client";
import React, { useState, useEffect, useRef } from "react";
import Lottie from "lottie-react";
import CTAButton from "@/components/CTAButton";

const FreeTestCallForm = () => {
  const [animationData, setAnimationData] = useState(null);
  const [animatedPrompt, setAnimatedPrompt] = useState("");
  const [formData, setFormData] = useState({ Name: "", Email: "", Phone: "+" });
  const [errors, setErrors] = useState({});
  const [shakingFields, setShakingFields] = useState({
    Name: false,
    Email: false,
    Phone: false,
  });
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fullPrompt =
    "Hi there! I'm your new Voice AI Assistant. I can make endless inbound and outbound calls 24/7 with any voice you choose.";
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    let index = 0;
    const animatePrompt = () => {
      const intervalId = setInterval(() => {
        if (index <= fullPrompt.length) {
          setAnimatedPrompt(fullPrompt.slice(0, index));
          index++;
        } else {
          clearInterval(intervalId);
        }
      }, 50);
      return () => clearInterval(intervalId);
    };
    const cleanup = animatePrompt();
    return () => {
      cleanup();
    };
  }, [fullPrompt]);


  const validateField = (name, value) => {
    let error = "";
    if (name === "Name" && !value) {
      error = "Name is required.";
    } else if (name === "Email") {
      if (value && !/\S+@\S+\.\S+/.test(value)) {
        error = "Email address is invalid.";
      }
    } else if (name === "Phone") {
      if (!value.startsWith("+")) {
        error = "Phone number must be in the format +11234567878";
      } else if (value.length > 14) {
        error = "Phone number is invalid.";
      } else if (value.length < 12) {
        error = "Phone number must be in the format +11234567878";
      }
    }
    return error;
  };

  const clearForm = () => {
    setFormData({ Name: "", Email: "", Phone: "+" });
    setErrors({});
    setErrorMessage("");
  };

  const resetStatus = () => {
    setSubmitStatus("idle");
    setErrorMessage("");
  };

  const shakeField = (fieldName) => {
    setShakingFields((prev) => ({ ...prev, [fieldName]: true }));
    setTimeout(() => {
      setShakingFields((prev) => ({ ...prev, [fieldName]: false }));
    }, 500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "Phone") {
      if (value === "") {
        setFormData({ ...formData, [name]: "+" });
        return;
      }
      if (!/^\+?\d*$/.test(value)) return;
      if (!value.startsWith("+")) {
        setFormData({ ...formData, [name]: "+" + value });
        return;
      }
    }

    setFormData({ ...formData, [name]: value });
    const error = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      Name: validateField("Name", formData.Name),
      Email: validateField("Email", formData.Email),
      Phone: validateField("Phone", formData.Phone),
    };

    setErrors(newErrors);

    Object.keys(newErrors).forEach((field) => {
      if (newErrors[field]) {
        shakeField(field);
      }
    });

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }
    clearForm();

    setSubmitStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch(
        "https://secure.aienhance.net/webhook/automis-initiate-new-call-landing-page",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.Response === "error reason") {
        setSubmitStatus("error");
        setErrorMessage(data.Response);
        setTimeout(resetStatus, 3000);
      } else {
        setSubmitStatus("success");
      }
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage("Network error occurred");
      setTimeout(resetStatus, 3000);
    }
  };
  const getButtonText = () => {
    switch (submitStatus) {
      case "loading":
        return "Making a call...";
      case "success":
        return "You are now receiving a call!";
      case "error":
        return `Error: ${errorMessage}`;
      default:
        return "Try a free test call now!";
    }
  };

  useEffect(() => {
    const preloadAnimation = async () => {
      try {
        const response = await fetch(
          "https://lottie.host/ccaf70c9-313b-4855-b90a-5a52f12d260b/8e9mRaZace.json"
        );
        if (!response.ok) {
          throw new Error("Failed to load animation");
        }
        const data = await response.json();
        setAnimationData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    preloadAnimation();
  }, []);

  return (
    <section className="free-test-call-form">
      <div className="flex justify-center items-center">
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8 w-full">
          <div className="flex-1 w-full lg:w-1/2 lg:max-w-lg justify-center items-center">
            <div className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-8 h-full flex flex-col justify-center">
              {loading && (
                <div className="w-full max-w-sm mx-auto">
                  <div className="animate-pulse bg-blue-darkest/20 rounded-lg w-full h-48 flex items-center justify-center">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 border-4 border-blue-middle border-t-transparent rounded-full animate-spin" />
                      <span className="text:white/90">
                        Loading animation...
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="w-full p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                  <p className="text-center text-red-600">
                    Failed to load animation. Please refresh the page.
                  </p>
                </div>
              )}

              <div
                className={`transition-opacity duration-300 ${
                  loading ? "opacity-0" : "opacity-100"
                }`}
              >
                {animationData && (
                  <div className="max-w-sm mx-auto">
                    <Lottie
                      animationData={animationData}
                      loop={true}
                      autoplay={true}
                      style={{
                        width: "100%",
                        height: "auto",
                        maxHeight: "300px",
                        display: "block",
                      }}
                      rendererSettings={{
                        preserveAspectRatio: "xMidYMid meet",
                      }}
                      onDOMLoaded={() => setLoading(false)}
                    />
                  </div>
                )}
              </div>

              <h2 className="sub-heading text-white text-center mt-4 mb-4">Try a free test call now!</h2>
              <div className="bg-white/10 backdrop-blur-lg border border-bright-blue rounded-xl p-6 mb-6">
                <p className="body-text text-white text-center min-h-[60px]">{animatedPrompt}</p>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full lg:w-1/2 lg:max-w-lg">
            <div className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-8 h-full">
              <form onSubmit={handleSubmit}>
                <div
                  className={`mb-6 ${
                    shakingFields.Name ? "animate-shake" : ""
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="Name" className="block text-base font-semibold text-white">Name *</label>
                    {errors.Name && (
                      <span className="text-sm text-red-600">{errors.Name}</span>
                    )}
                  </div>
                  <input
                    type="text"
                    name="Name"
                    id="Name"
                    placeholder="Your Name"
                    value={formData.Name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-lg placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-bright-blue focus:border-bright-blue transition-all duration-300 h-12 ${
                      errors.Name ? "border-red-500 bg-red-500/10" : "border-white/30"
                    }`}
                  />
                </div>

                <div
                  className={`mb-6 ${
                    shakingFields.Email ? "animate-shake" : ""
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="Email" className="block text-base font-semibold text-white">Email (Optional)</label>
                    {errors.Email && (
                      <span className="text-sm text-red-600">{errors.Email}</span>
                    )}
                  </div>
                  <input
                    type="email"
                    name="Email"
                    id="Email"
                    placeholder="Your Email"
                    value={formData.Email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-lg placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-bright-blue focus:border-bright-blue transition-all duration-300 h-12 ${
                      errors.Email ? "border-red-500 bg-red-500/10" : "border-white/30"
                    }`}
                  />
                </div>

                <div
                  className={`mb-6 ${
                    shakingFields.Phone ? "animate-shake" : ""
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="Phone" className="block text-base font-semibold text-white">Phone Number *</label>
                    {errors.Phone && (
                      <span className="text-sm text-red-600">{errors.Phone}</span>
                    )}
                  </div>
                  <input
                    type="tel"
                    name="Phone"
                    id="Phone"
                    placeholder="+1234567890"
                    value={formData.Phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-lg placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-bright-blue focus:border-bright-blue transition-all duration-300 h-12 ${
                      errors.Phone ? "border-red-500 bg-red-500/10" : "border-white/30"
                    }`}
                  />
                </div>

                <CTAButton
                  type="submit"
                  variant={submitStatus === "error" ? "ghost" : "primary"}
                  size="medium"
                  className={`w-full text-sm py-5 px-3${
                    submitStatus === "loading"
                      ? "opacity-60 cursor-not-allowed"
                      : submitStatus === "success"
                      ? "!bg-green-500 !border-green-500 cursor-not-allowed"
                      : submitStatus === "error"
                      ? "!bg-red-500 !border-red-500"
                      : ""
                  }`}
                  disabled={
                    submitStatus === "loading" || submitStatus === "success"
                  }
                >
                  {getButtonText()}
                </CTAButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreeTestCallForm;
