"use client";
import React, { useState, useEffect, useRef } from "react";
import Lottie from "lottie-react";
import CTAButton from "@/components/CTAButton";

const DemoForm = () => {
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
    "Ciao! Sono la tua nuova Assistente Vocale AI. Posso gestire chiamate in entrata e uscita 24/7 con qualsiasi voce tu scelga.";

  const animationRef = useRef(null);

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      if (index <= fullPrompt.length) {
        setAnimatedPrompt(fullPrompt.slice(0, index));
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 50);

    return () => clearInterval(intervalId);
  }, []);

  const validateField = (name, value) => {
    let error = "";
    if (name === "Name" && !value) {
      error = "Il nome è obbligatorio.";
    } else if (name === "Email") {
      if (value && !/\S+@\S+\.\S+/.test(value)) {
        error = "Indirizzo email non valido.";
      }
    } else if (name === "Phone") {
      if (!value.startsWith("+")) {
        error = "Il numero deve essere nel formato +391234567890";
      } else if (value.length > 14) {
        error = "Numero di telefono non valido.";
      } else if (value.length < 12) {
        error = "Il numero deve essere nel formato +391234567890";
      }
    }
    return error;
  };

  const clearForm = () => {
    setFormData({ Name: "", Email: "", Phone: "+" });
    setErrors({});
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
      if (newErrors[field]) shakeField(field);
    });

    if (Object.values(newErrors).some((error) => error)) return;

    clearForm();
    setSubmitStatus("loading");

    try {
      const response = await fetch(
        "https://secure.aienhance.net/webhook/automis-initiate-new-call-landing-page",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();

      if (data.Response === "error reason") {
        setSubmitStatus("error");
        setErrorMessage("Errore durante l’avvio della chiamata");
      } else {
        setSubmitStatus("success");
      }
    } catch {
      setSubmitStatus("error");
      setErrorMessage("Errore di rete");
    }
  };

  const getButtonText = () => {
    switch (submitStatus) {
      case "loading":
        return "Avvio della chiamata...";
      case "success":
        return "Stai ricevendo una chiamata!";
      case "error":
        return `Errore: ${errorMessage}`;
      default:
        return "Prova una chiamata gratuita ora";
    }
  };

  useEffect(() => {
    const preloadAnimation = async () => {
      try {
        const response = await fetch(
          "https://lottie.host/ccaf70c9-313b-4855-b90a-5a52f12d260b/8e9mRaZace.json"
        );
        const data = await response.json();
        setAnimationData(data);
      } catch {
        setError("Errore nel caricamento dell’animazione");
      } finally {
        setLoading(false);
      }
    };

    preloadAnimation();
  }, []);

  return (
    <section className="free-test-call-form">
      <div className="flex justify-center items-center">
        <div className="flex flex-col lg:flex-row gap-8 w-full">
          <div className="flex-1 bg-white/5 rounded-2xl p-8">
            {animationData && (
              <Lottie animationData={animationData} loop autoplay />
            )}

            <h2 className="sub-heading text-white text-center mt-4">
              Prova ora una chiamata di test gratuita
            </h2>

            <div className="bg-white/10 rounded-xl p-6 mt-4">
              <p className="body-text text-white text-center">
                {animatedPrompt}
              </p>
            </div>
          </div>

          <div className="flex-1 bg-white/5 rounded-2xl p-8">
            <form onSubmit={handleSubmit}>
              <label className="text-white font-semibold">Nome *</label>
              <input
                name="Name"
                value={formData.Name}
                onChange={handleInputChange}
                placeholder="Il tuo nome"
                className="w-full mb-4"
              />

              <label className="text-white font-semibold">Email</label>
              <input
                name="Email"
                value={formData.Email}
                onChange={handleInputChange}
                placeholder="email@azienda.com"
                className="w-full mb-4"
              />

              <label className="text-white font-semibold">Telefono *</label>
              <input
                name="Phone"
                value={formData.Phone}
                onChange={handleInputChange}
                placeholder="+391234567890"
                className="w-full mb-6"
              />

              <CTAButton
                type="submit"
                variant="primary"
                size="medium"
                disabled={submitStatus === "loading"}
              >
                {getButtonText()}
              </CTAButton>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoForm;
